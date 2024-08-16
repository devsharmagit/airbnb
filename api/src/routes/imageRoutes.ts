import express from "express";
import { placeImageUpload, userImageUpload } from "../controller/imageController.js";
import multer from "multer";
import { imageNameConstructor } from "../utils/filesFunctions.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, `${imageNameConstructor(file.originalname)}`);
  },
});
const upload = multer({ storage: storage });

const imageRouter = express.Router();

// route to upload user image
imageRouter.route("/user-image").post(upload.array("photos", 1), userImageUpload);

// route to upload place images
imageRouter.route("/place-image").post(upload.array("photos", 10), placeImageUpload);

export default imageRouter;
