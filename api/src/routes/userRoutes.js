import express from 'express'
import {createUser, handleMeRoute, updateUser} from "../controller/userController.js"
import { signup, login, logout, protect } from '../controller/authController.js'

const userRouter = express.Router()

//Signup route
userRouter.route("/signup").post(signup)
// Login route
userRouter.route("/login").post(login)

//Logout rout
userRouter.route("/logout").post(logout)

userRouter.route("/me").get(protect, handleMeRoute)

userRouter.route("/").post(createUser).patch(protect, updateUser)

export default userRouter;