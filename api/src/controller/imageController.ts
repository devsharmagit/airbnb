import path from "path";
import { deleteImage } from "../utils/filesFunctions.js";
import cloudinary from "../config/cloudnary.js";
import { Request, Response } from "express";

const imageDir = path.join(process.cwd(), "images");

interface CloudinaryOptions {
  folder: string;
  width?: number;
  height?: number;
  crop?: string;
}

type MulterFiles =
  | Express.Multer.File[]
  | { [fieldname: string]: Express.Multer.File[] }
  | undefined;

const cloudnaryUploader = async (files: MulterFiles, options: CloudinaryOptions) => {
  try {
    const images = [];
    if (!files) return;

    if (Array.isArray(files)) {
      for (const file of files) {
        const { filename } = file;
        const result = await cloudinary.uploader.upload(`${imageDir}/${filename}`, { ...options });

        images.push({
          url: result.secure_url,
          publicId: result.public_id,
        });
        deleteImage(filename);
      }
    } else {
      for (const fieldname in files) {
        for (const file of files[fieldname]) {
          const { filename } = file;
          const result = await cloudinary.uploader.upload(`${imageDir}/${filename}`, {
            ...options,
          });

          images.push({
            url: result.secure_url,
            publicId: result.public_id,
          });
          deleteImage(filename);
        }
      }
    }

    return images;
  } catch (error) {
    console.log(error);
  }
};

export const userImageUpload = async (req: Request, res: Response) => {
  try {
    const files = req.files as MulterFiles;
    const config = { folder: "user", width: 300, height: 300, crop: "fill" };
    let uploadedImages;
    if (files) {
      uploadedImages = await cloudnaryUploader(files, config);
    }

    res.json({ uploadedImages });
  } catch (error) {
    console.log(error);
  }
};

export const placeImageUpload = async (req: Request, res: Response) => {
  try {
    const files = req.files as MulterFiles;
    const config = { folder: "place", width: 600 };
    let uploadedImages;
    if (files) {
      uploadedImages = await cloudnaryUploader(files, config);
    }

    res.json({ uploadedImages });
  } catch (error: any) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};

export const deleteCloudnaryImage = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error);
  }
};
