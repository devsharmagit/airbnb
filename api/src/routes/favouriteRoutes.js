import express from "express"
import { protect } from "../controller/authController.js"
import { addToFavourite, deleteAfav } from "../controller/favourtieController.js"

const favouriteRouter = express.Router()

favouriteRouter.route("/").post(protect, addToFavourite)
favouriteRouter.route("/remove").post(protect, deleteAfav)



export default favouriteRouter