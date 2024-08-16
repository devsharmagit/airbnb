import { BookingModel } from "../model/BookingModel.js";
import { PlaceModel } from "../model/PlaceModel.js";
import { isDateRangeOverlapping, isDatePast } from "../utils/dateFunctions.js";
import { format } from "date-fns";
import { Request, Response } from "express";
import { RequestWithUser } from "../model/UserModel.js";

export const createBooking = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) throw Error;
    const place = await PlaceModel.findById(req.body.place);
    const today = new Date();
    const formattdDate = format(today, "yyyy-MM-dd");
    const bookings = await BookingModel.find({
      place: req.body.place,
      active: true,
      checkOut: { $gte: formattdDate },
    });
    if (place?.owner.toString() === req.user._id) {
      throw new Error("owner cant book its own place");
    }
    const isOverlapping = isDateRangeOverlapping(req.body.checkIn, req.body.checkOut, bookings);

    if (isOverlapping) throw new Error("dates are overlapping");

    const bookedDoc = await BookingModel.create({
      user: req.user._id,
      ...req.body,
    });

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
    const allBookings = await BookingModel.find();

    res.status(200).json({
      status: "success",
      booking: allBookings,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

export const getUserBooking = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) throw Error;
    const userId = req.user._id;

    let query = BookingModel.find({ user: userId })
      .populate({
        path: "place",
        select: "-owner",
      })
      .sort("-createdAt");

    if (req.query.allBookings === "false") {
      const formatedToday = format(new Date(), "yyyy-MM-dd");
      query = query.find({ active: true, checkOut: { $gte: formatedToday } });
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

    res.status(200).json({
      status: "success",
      bookingDoc: newBookingDoc,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

export const getABooking = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) throw Error;
    const bookingDoc = await BookingModel.findById(req.params.bookingId).populate({
      path: "place",
    });

    if (req.user._id !== bookingDoc?.user.toString())
      throw Error("user can only see his own bookings not others' bookings");

    res.status(200).json({
      status: "successfull",
      bookingDoc,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

export const cancelbooking = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) throw Error;
    const bookingDoc = await BookingModel.findById(req.params.bookingId);

    if (req.user._id !== bookingDoc?.user.toString())
      throw Error("user can only cancel its own bookings not others' bookings");
    if (bookingDoc) bookingDoc.active = false;
    bookingDoc?.save();

    res.status(200).json({
      status: "successfull",
      bookingDoc,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};
