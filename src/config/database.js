import mongoose from "mongoose";

export const connect = async () => {
    await mongoose.connect("mongodb://localhost:27017/Twitter"); 
}