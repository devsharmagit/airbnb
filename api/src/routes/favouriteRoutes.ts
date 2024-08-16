import express from "express";
import { protect } from "../controller/authController.js";
import { addToFavourite, deleteAfav } from "../controller/favourtieController.js";

const favouriteRouter = express.Router();

// route to save a image in your fav
favouriteRouter.route("/").post(protect, addToFavourite);

// route to remove for the same
favouriteRouter.route("/remove").post(protect, deleteAfav);

export default favouriteRouter;
