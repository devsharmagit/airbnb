import express from "express";
import { addAPlace,getAllMap, getAllPlaces, getOnePlace , getAllUserPlaces, getFavouritePlaces, updateAPlace, deleteAPlace} from "../controller/placeController.js";
import { protect } from "../controller/authController.js";


const placeRouter = express.Router()

// this is get all user's places
placeRouter.route("/getAllUserPlaces").get(protect, getAllUserPlaces)

placeRouter.route('/map').get(getAllMap)

placeRouter.route("/fav").get(protect, getFavouritePlaces)

placeRouter.route("/:id").get(getOnePlace).patch(protect, updateAPlace).delete(protect, deleteAPlace)

placeRouter.route("/").get(getAllPlaces).post(protect, addAPlace)


export default placeRouter;