import mongoose from "mongoose";
import { ENV } from "./env.js";
export const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(ENV.MONGO_URI)
        console.log("MongoDb Connected :", conn.connection.host)
    }catch(error){
        console.error("Error Connecting to mongodb : ",error)
        process.exit(1);//status code means connected esle 0 means not connected
    }
};