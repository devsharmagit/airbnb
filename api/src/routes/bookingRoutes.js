import express from "express"
import { cancelbooking, createBooking, getABooking, getUserBooking } from "../controller/bookingController.js"
import { protect } from "../controller/authController.js"

const bookingRouter = express.Router()

bookingRouter.route("/:bookingId").get(protect, getABooking)

bookingRouter.route("/cancel/:bookingId").get(protect, cancelbooking)

bookingRouter.route("/").post(protect ,createBooking).get(protect, getUserBooking)

export default bookingRouter