import dotenv from "dotenv"
dotenv.config()
import app from "./app.js";
import mongoose from "mongoose";

process.on("uncaughtException", (error)=>{
    console.log("UNHANDLED EXCEPTION")
    console.log(error)
})


const port = process.env.PORT || 3500

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DATABASE connected successfully!")
})

const server = app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
})


process.on("unhandledRejection", (reason, promise)=>{
    console.log({reason,promise})
    server.close()
    process.exit(1)
})