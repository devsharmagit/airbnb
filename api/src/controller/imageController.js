import imageDownloader from "image-downloader";
import path from "path";
import { deleteImage } from "../utils/filesFunctions.js";
import cloudinary from "../config/cloudnary.js";

const imageDir = path.join(process.cwd(), "images");

const cloudnaryUploader = async (files, options) => {
  try {
    const images = [];
    for (const file of files) {
      const { filename } = file;
      const result = await cloudinary.uploader.upload(
        `${imageDir}/${filename}`,
        { ...options }
      );

      images.push({
        url: result.secure_url,
        publicId: result.public_id,
      });
      deleteImage(filename);
    }
    return images;
  } catch (error) {
    console.log(error);
  }
};

export const userImageUpload = async (req, res) => {
  try {
    const files = req.files;
    const config = { folder: "user", width: 300, height: 300, crop: "fill" };
    const uploadedImages = await cloudnaryUploader(files, config);

    res.json({ uploadedImages });
  } catch (error) {
    console.log(error);
  }
};
export const placeImageUpload = async (req, res) => {
  try {
    const files = req.files;
    const config = { folder: "place", width: 600 };
    const uploadedImages = await cloudnaryUploader(files, config);

    res.json({ uploadedImages });
  } catch (error) {
   res.status(500).json({
    status: "failed",
    error: error.message
   })
  }
};

export const deleteCloudnaryImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error);
  }
};
