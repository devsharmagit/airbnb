import { UserModel } from "../model/User.js";
import { deleteCloudnaryImage } from "./imageController.js";

export const createUser = async (req, res) => {

  const user = await UserModel.create(req.body);

  res.status(200).json({
    status: "success",
    user,
  });
};

export const handleMeRoute = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id)

    res.status(200).json({
      status: "success",
      user
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};


export const updateUser = async (req, res)=>{
  try {
    if(req.body.profilePhoto){
     const user = await UserModel.findById(req.user._id)
     if(user.profilePhoto){
       deleteCloudnaryImage(user.profilePhoto.publicId)
     }
    }
    const user =  await UserModel.findByIdAndUpdate(req.user._id,{...req.body}, {new: true})

    res.status(200).json({
      status: "success",
      user
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
}