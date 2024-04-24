import express from "express";
import userRouter from "./routes/userRoutes.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import placeRouter from "./routes/placeRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import favouriteRouter from "./routes/favouriteRoutes.js";

const app = express()
app.use("/images",express.static("./images"))

const whitelist = ['http://localhost:5173', 'http://127.0.0.1:5173', "http://localhost:3500"]

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

app.use("/api/user", userRouter)
app.use("/api/place", placeRouter)
app.use("/api/booking", bookingRouter)
app.use("/api/upload", imageRouter)
app.use("/api/fav", favouriteRouter)

export default app;