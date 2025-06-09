// always remember to put .js in the end of the file path
import { PlaceModel } from "../model/PlaceModel.js";
import { RequestHandler, Response } from "express";
import { RequestWithUser } from "../model/UserModel.js";
import redisClient from "../redis/redis.js";

export const addToFavourite = async (req: RequestWithUser, res: Response) => {
  try {
    const placeId = req.body.place;
    let userId;
    if (req.user) {
      userId = req.user._id;
    }
    const place = await PlaceModel.findById(placeId);

    if (place?.favourites.includes(userId)) throw Error("user can't be added more than once");

    if (place) {
      place.favourites = [...place.favourites, userId];
      place.favCount = place.favCount + 1;
    }

    const savedDoc = await place?.save();

    // Invalidating the cache
    await redisClient.del("place:byfav");

    return res.status(201).json({
      status: "success",
      favourites: savedDoc?.favourites,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

export const deleteAfav: RequestHandler = async (req: RequestWithUser, res: Response) => {
  try {
    const placeId = req.body.place;
    let userId: any;
    if (req.user) {
      userId = req.user._id;
    }
    const place = await PlaceModel.findById(placeId);
    if (!place?.favourites.includes(userId))
      throw Error("user is already not added so cant remove");
    place.favourites = place.favourites.filter((value) => {
      return value.toString() !== userId;
    });
    place.favCount = place.favCount - 1;
    const savedDoc = await place.save();
    await redisClient.del("place:byfav");
    return res.status(200).json({
      status: "success",
      favourites: savedDoc.favourites,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};
