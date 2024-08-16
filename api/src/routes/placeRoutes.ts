import express from "express";
import {
  addAPlace,
  getAllMap,
  getAllPlaces,
  getOnePlace,
  getAllUserPlaces,
  getFavouritePlaces,
  updateAPlace,
  deleteAPlace,
} from "../controller/placeController.js";
import { protect } from "../controller/authController.js";

const placeRouter = express.Router();

// route to get all user created places
placeRouter.route("/getAllUserPlaces").get(protect, getAllUserPlaces);

// route to get map related places
placeRouter.route("/map").get(getAllMap);

//  route to get saved places of a user
placeRouter.route("/fav").get(protect, getFavouritePlaces);

// resource route for CRUD operation of a specific place
placeRouter
  .route("/:id")
  .get(getOnePlace)
  .patch(protect, updateAPlace)
  .delete(protect, deleteAPlace);

// resource route to get all place and add a place
placeRouter.route("/").get(getAllPlaces).post(protect, addAPlace);

export default placeRouter;
