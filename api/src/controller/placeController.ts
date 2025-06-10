import { BookingModel } from "../model/BookingModel.js";
import { PhotoType, PlaceModel } from "../model/PlaceModel.js";
import { getBlockedDates } from "../utils/dateFunctions.js";
import { format } from "date-fns";
import { deleteCloudnaryImage } from "./imageController.js";
import { Request, Response } from "express";
import { RequestWithUser } from "../model/UserModel.js";
import redisClient from "../redis/redis.js";

type ReqWithQuery = Request & {
  query: {
    longitude: string;
    latitude: string;
    sort: string;
    limit: number;
    page: number;
    fields: string;
    priceRange: string;
  };
};

// Cache invalidation helper function
const invalidatePlaceCache = async (userId?: string, placeId?: string) => {
  try {
    const patterns = [
      "place:*", // All place list caches
      "place:map", // Map cache
      "place:byfav", // By favourite cache
    ];

    if (userId) {
      patterns.push(`user:place:${userId}`); // User's places cache
      patterns.push(`favUser:place:${userId}`); // User's favourite places cache
    }

    if (placeId) {
      patterns.push(`one:place:${placeId}`); // Individual place cache
    }

    // Delete cache keys matching patterns
    for (const pattern of patterns) {
      if (pattern.includes("*")) {
        // For wildcard patterns, we need to scan and delete
        const keys = await redisClient.keys(pattern);
        if (keys.length > 0) {
          await redisClient.del(keys);
        }
      } else {
        // For exact keys, delete directly
        await redisClient.del(pattern);
      }
    }
  } catch (error) {
    console.error("Cache invalidation error:", error);
  }
};

export const getAllPlaces = async (req: ReqWithQuery, res: Response) => {
  try {
    const cacheKey = "place:" + req.url;
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }
    const excludedFields = [
      "sort",
      "limit",
      "page",
      "fields",
      "latitude",
      "longitude",
      "searchString",
      "priceRange",
    ];
    const queryObj = { ...req.query };

    excludedFields.forEach((value) => {
      delete queryObj[value];
    });

    let queryStr: any = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|in|all)\b/g, (match: string) => `$${match}`);

    queryStr = JSON.parse(queryStr);

    if (queryStr.perks) {
      const allPerks = queryStr.perks["$all"].split(",");
      queryStr.perks["$all"] = allPerks;
    }

    let query = PlaceModel.find(queryStr);

    if (req.query.searchString) {
      query = query.find({ title: { $regex: req.query.searchString, $options: "i" } });
    }

    if (req.query.priceRange) {
      query = query.find({
        price: {
          $gte: req.query.priceRange === "budget" ? 0 : req.query.priceRange === "mid" ? 500 : 1000,
          $lte:
            req.query.priceRange === "budget"
              ? 500
              : req.query.priceRange === "mid"
                ? 1000
                : 1000000000,
        },
      });
    }

    const totalPlaces = await PlaceModel.countDocuments(query);

    if (req.query.sort === "far") {
      query = query
        .find({
          location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [parseFloat(req.query.longitude), parseFloat(req.query.latitude)],
              },
              $maxDistance: 1000000000,
            },
          },
        })
        .sort({
          location: 1,
        });
    }
    if (req.query.sort === "near") {
      query = query
        .find({
          location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [parseFloat(req.query.longitude), parseFloat(req.query.latitude)],
              },
              $maxDistance: 1000000000,
            },
          },
        })
        .sort({
          location: -1,
        });
    }

    if (req.query.sort !== "far" && req.query.sort !== "near") {
      query = query.sort(req.query.sort);
    }

    if (req.query.fields) {
      const fieldParameters = req.query.fields.split(",").join(" ");
      query = query.select(fieldParameters);
    } else {
      query = query.select("-__v");
    }

    if (req.query.limit) {
      query = query.limit(req.query.limit);
    } else {
      query = query.limit(10);
    }
    if (req.query.page) {
      const limit = req.query.limit * 1 || 10;
      const skip = (req.query.page - 1) * limit;
      query = query.skip(skip).limit(limit);
    }

    const places = await query.sort("-createdAt");
    const responseData = {
      status: "success",
      length: places.length,
      totalPlaces,
      places,
    };
    res.status(200).json(responseData);

    await redisClient.set(cacheKey, JSON.stringify(responseData), {
      EX: 60,
    });

    return;
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getAllMap = async (req: Request, res: Response) => {
  try {
    const cacheKey = "place:map";
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }
    const places = await PlaceModel.find()
      .select("title price mainImage location")
      .sort("-createdAt");
    const responesData = {
      places,
      length: places.length,
    };
    res.status(200).json(responesData);
    await redisClient.set(cacheKey, JSON.stringify(responesData), {
      EX: 60,
    });
    return;
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const addAPlace = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) throw new Error("User not authenticated");

    const place = await PlaceModel.create({
      ...req.body,
      owner: req.user._id,
    });

    // Invalidate relevant caches after successful creation
    await invalidatePlaceCache(req.user._id.toString());

    res.status(201).json({
      status: "success",
      place,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getOnePlace = async (req: Request, res: Response) => {
  try {
    const placeId = req.params.id;
    const cacheKey = "one:place:" + placeId;
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }
    const place = await PlaceModel.findById(placeId).populate({
      path: "owner",
      select: "-__v",
    });
    if (!place) throw new Error("no such place found");

    const today = Date.now();
    const formattedDate = format(today, "yyyy-MM-dd");
    const bookings = await BookingModel.find({
      place: place._id,
      active: true,
      checkOut: { $gte: formattedDate },
    });

    const blockedDates = getBlockedDates(bookings);
    const responseData = {
      status: "success",
      place,
      blockedDates,
    };
    await redisClient.set(cacheKey, JSON.stringify(responseData), {
      EX: 60,
    });
    return res.status(200).json(responseData);
  } catch (error: any) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getAllUserPlaces = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) throw new Error("User not authenticated");
    const cacheKey = "user:place:" + req.user._id;
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }
    const places = await PlaceModel.find({ owner: req.user._id })
      .sort("-updatedAt")
      .select("mainImage title price description favourites");

    const responesData = {
      status: "success",
      length: places.length,
      places,
    };
    await redisClient.set(cacheKey, JSON.stringify(responesData), {
      EX: 60,
    });
    res.status(200).json(responesData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};

export const byFavourite = async (req: Request, res: Response) => {
  const cacheKey = "place:byfav";
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  }
  const places = await PlaceModel.find().sort({ "favourites.length": -1 });
  await redisClient.set(cacheKey, JSON.stringify({ places }), {
    EX: 60,
  });
  return res.json({ places });
};

export const updateAPlace = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) throw new Error("User not authenticated");

    const userId = req.user._id.toString();
    const placeId = req.params.id;
    const place = await PlaceModel.findById(placeId);

    if (!place) throw new Error("Cannot find place with this id");
    if (place.owner.toString() !== userId) throw new Error("Only owner can update its own place");
    if (req.body.owner) throw new Error("Owner cannot be updated");

    const oldPhotos = place?.photos;
    const newPhotos = req.body.photos;

    // Handle photo deletions
    if (oldPhotos && newPhotos) {
      oldPhotos.forEach((value) => {
        if (!newPhotos.find((photo: PhotoType) => photo.publicId === value.publicId)) {
          deleteCloudnaryImage(value.publicId);
        }
      });
    }

    if (newPhotos && newPhotos.length > 0) {
      req.body.mainImage = newPhotos[0];
    }

    const newPlace = await PlaceModel.findByIdAndUpdate(
      placeId,
      { ...req.body },
      { new: true, runValidators: true }
    );

    // Invalidate relevant caches after successful update
    await invalidatePlaceCache(userId, placeId);

    res.status(200).json({
      status: "updated",
      updatedPlace: newPlace,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteAPlace = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) throw new Error("User not authenticated");

    const userId = req.user._id.toString();
    const placeId = req.params.id;
    const place = await PlaceModel.findById(placeId);

    if (!place) throw new Error("Cannot find place with this id");
    if (place.owner.toString() !== userId) throw new Error("Only owner can delete its own place");

    const photos = place.photos;

    // Delete all photos from cloud storage
    if (photos && photos.length > 0) {
      photos.forEach(({ publicId }) => {
        deleteCloudnaryImage(publicId);
      });
    }

    // Delete related bookings and the place
    await BookingModel.deleteMany({ place: placeId });
    await PlaceModel.findByIdAndDelete(placeId);

    // Invalidate relevant caches after successful deletion
    await invalidatePlaceCache(userId, placeId);

    res.status(204).json({
      status: "deleted",
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getFavouritePlaces = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) throw new Error("User not authenticated");
    const cacheKey = "favUser:place:" + req.user._id;
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    const places = await PlaceModel.find({ favourites: req.user._id })
      .sort("-createdAt")
      .select("title description price mainImage favourites");

    await redisClient.set(cacheKey, JSON.stringify({ places }), {
      EX: 60,
    });
    return res.json({
      places,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
