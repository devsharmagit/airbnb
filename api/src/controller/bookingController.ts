import { BookingModel } from "../model/BookingModel.js";
import { PlaceModel } from "../model/PlaceModel.js";
import { isDateRangeOverlapping, isDatePast } from "../utils/dateFunctions.js";
import { format } from "date-fns";
import { Request, Response } from "express";
import { RequestWithUser } from "../model/UserModel.js";
import redisClient from "../redis/redis.js";

// Cache key generators
const getCacheKeys = {
  allBookings: () => "bookings:all",
  userBookings: (userId: string, url: string) => `bookings:user:${userId}:url:${url}`,
  userBookingsPattern: (userId: string) => `bookings:user:${userId}:*`,
  allBookingsPattern: () => "bookings:*"
};

// Cache invalidation helper
const invalidateCache = async (patterns: string[]) => {
  try {
    for (const pattern of patterns) {
      const keys = await redisClient.keys(pattern);
      if (keys.length > 0) {
        await redisClient.del(keys);
      }
    }
  } catch (error) {
    console.error("Cache invalidation error:", error);
    // Don't throw error - cache invalidation failure shouldn't break the API
  }
};

export const createBooking = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) throw Error("User not authenticated");
    
    const place = await PlaceModel.findById(req.body.place);
    if (!place) throw new Error("Place not found");
    
    const today = new Date();
    const formattedDate = format(today, "yyyy-MM-dd");
    
    const bookings = await BookingModel.find({
      place: req.body.place,
      active: true,
      checkOut: { $gte: formattedDate },
    });
    
    if (place?.owner.toString() === req.user._id) {
      throw new Error("Owner can't book its own place");
    }
    
    const isOverlapping = isDateRangeOverlapping(req.body.checkIn, req.body.checkOut, bookings);
    if (isOverlapping) throw new Error("Dates are overlapping");

    const bookedDoc = await BookingModel.create({
      user: req.user._id,
      ...req.body,
    });

    // Invalidate relevant caches after successful booking creation
    await invalidateCache([
      getCacheKeys.allBookingsPattern(),
      getCacheKeys.userBookingsPattern(req.user._id)
    ]);

    res.status(201).json({
      status: "success",
      booking: bookedDoc,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const cacheKey = getCacheKeys.allBookings();
    
    // Try to get from cache first
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    // If not in cache, fetch from database
    const allBookings = await BookingModel.find();

    const responseData = {
      status: "success",
      booking: allBookings,
    };
    
    // Cache the result for 5 minutes (300 seconds)
    await redisClient.set(cacheKey, JSON.stringify(responseData), { EX: 300 });

    return res.status(200).json(responseData);
  } catch (error: any) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

export const getUserBooking = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) throw Error("User not authenticated");
    
    const userId = req.user._id;
    const cacheKey = getCacheKeys.userBookings(userId, req.url);
    
    // Try to get from cache first
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    // If not in cache, fetch from database
    let query = BookingModel.find({ user: userId })
      .populate({
        path: "place",
        select: "-owner",
      })
      .sort("-createdAt");

    if (req.query.allBookings === "false") {
      const formattedToday = format(new Date(), "yyyy-MM-dd");
      query = query.find({ active: true, checkOut: { $gte: formattedToday } });
    }

    const bookingDoc = await query;

    let newBookingDoc = [...bookingDoc];

    newBookingDoc = newBookingDoc.map((val) => {
      // @ts-expect-error "._doc" seems to be not exist on val
      const newVal = { ...val._doc };
      if (newVal.active) {
        newVal.active = !isDatePast(val.checkOut);
      }
      return newVal;
    });
    
    const responseData = {
      status: "success",
      bookingDoc: newBookingDoc,
    };
    
    // Cache the result for 2 minutes (120 seconds) - shorter time for user-specific data
    await redisClient.set(cacheKey, JSON.stringify(responseData), { EX: 120 });

    res.status(200).json(responseData);
  } catch (error: any) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

export const getABooking = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) throw Error("User not authenticated");
    
    const bookingId = req.params.bookingId;
    const cacheKey = `booking:${bookingId}:user:${req.user._id}`;
    
    // Try to get from cache first
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    // If not in cache, fetch from database
    const bookingDoc = await BookingModel.findById(bookingId).populate({
      path: "place",
    });

    if (!bookingDoc) {
      throw new Error("Booking not found");
    }

    if (req.user._id !== bookingDoc?.user.toString()) {
      throw Error("User can only see their own bookings");
    }

    const responseData = {
      status: "successful",
      bookingDoc,
    };
    
    // Cache individual booking for 5 minutes
    await redisClient.set(cacheKey, JSON.stringify(responseData), { EX: 300 });

    res.status(200).json(responseData);
  } catch (error: any) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

export const cancelbooking = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) throw Error("User not authenticated");
    
    const bookingId = req.params.bookingId;
    const bookingDoc = await BookingModel.findById(bookingId);

    if (!bookingDoc) {
      throw new Error("Booking not found");
    }

    if (req.user._id !== bookingDoc?.user.toString()) {
      throw Error("User can only cancel their own bookings");
    }
    
    // Update the booking
    bookingDoc.active = false;
    await bookingDoc.save();

    // Invalidate relevant caches after successful cancellation
    await invalidateCache([
      getCacheKeys.allBookingsPattern(),
      getCacheKeys.userBookingsPattern(req.user._id),
      `booking:${bookingId}:user:${req.user._id}` // Individual booking cache
    ]);

    res.status(200).json({
      status: "successful",
      bookingDoc,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

// Optional: Add a manual cache clear endpoint for admin use
export const clearBookingCache = async (req: Request, res: Response) => {
  try {
    await invalidateCache([getCacheKeys.allBookingsPattern()]);
    
    res.status(200).json({
      status: "success",
      message: "Booking cache cleared successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};