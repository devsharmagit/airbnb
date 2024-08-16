import { UserModel } from "../model/UserModel.js";
import { deleteCloudnaryImage } from "./imageController.js";
import { Request, RequestHandler, Response } from "express";
import { RequestWithUser } from "../model/UserModel.js";

export const createUser = async (req: Request, res: Response) => {
  const user = await UserModel.create(req.body);

  res.status(200).json({
    status: "success",
    user,
  });
};

export const handleMeRoute: RequestHandler = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) throw Error;
    const user = await UserModel.findById(req.user._id).select("-__v");

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

export const updateUser = async (req: RequestWithUser, res: Response) => {
  try {
    if (req.body.profilePhoto && req.user) {
      const user = await UserModel.findById(req.user._id);
      if (user?.profilePhoto) {
        deleteCloudnaryImage(user.profilePhoto.publicId);
      }
    }
    if (!req.user) throw Error;
    const user = await UserModel.findByIdAndUpdate(req.user._id, { ...req.body }, { new: true });

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
