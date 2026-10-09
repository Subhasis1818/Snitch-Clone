import mongoose from "mongoose";
import config from "./config.js";
const connectDb=async ()=>{
    try{
        await mongoose.connect(config.MONGO_URI);
        console.log("Database connected")
    }
    catch(err){
        console.log(err);
    }
}
export default connectDb;