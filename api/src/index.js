import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";
import express from "express";
import userRouter from "./routes/userRoutes.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import placeRouter from "./routes/placeRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import favouriteRouter from "./routes/favouriteRoutes.js";

const app = express()

const port = process.env.PORT || 3500

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DATABASE connected successfully!")
})

app.use("/images",express.static("./images"))

const whitelist = [ 'https://dev-sharma-booking.netlify.app','http://localhost:3000', 'http://127.0.0.1:3000','http://localhost:4173', 'http://127.0.0.1:4173', 'http://localhost:5173', 'http://127.0.0.1:5173', "http://localhost:3500", "https://air-bnb-frontend.vercel.app", "https://bookers.devsharmacode.com"]

app.use(cors({
    credentials: true,
    origin: function(url, callback){
        if(whitelist.indexOf(url) !== -1 || !url){
            callback(null, true)
        }else{
            callback(new Error("not allowed by cors"))
        }
    }
}))

app.use(express.json({limit: '10kb'}))
app.use(cookieParser())

app.get("/", (req,res)=>{
    res.status(200).json({
        message: "this is vercel deploy message"
    })
})

app.use("/api/user", userRouter)
app.use("/api/place", placeRouter)
app.use("/api/booking", bookingRouter)
app.use("/api/upload", imageRouter)
app.use("/api/fav", favouriteRouter)






process.on("uncaughtException", (error)=>{
    console.log("UNHANDLED EXCEPTION")
    console.log(error)
})




const server = app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
})


process.on("unhandledRejection", (reason, promise)=>{
    console.log({reason,promise})
})

export default app