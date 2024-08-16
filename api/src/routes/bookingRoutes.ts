import express from "express";
import {
  cancelbooking,
  createBooking,
  getABooking,
  getUserBooking,
} from "../controller/bookingController.js";
import { protect } from "../controller/authController.js";

const bookingRouter = express.Router();

// route to get a booking
bookingRouter.route("/:bookingId").get(protect, getABooking);

// route to cancel a booking
bookingRouter.route("/cancel/:bookingId").get(protect, cancelbooking);

// resource route for Create and Read of booking
bookingRouter.route("/").post(protect, createBooking).get(protect, getUserBooking);

export default bookingRouter;
