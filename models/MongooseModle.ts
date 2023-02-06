import mongoose from "mongoose";


const Schema= new mongoose.Schema({
    userId:Number,
    userName:String,
    isAdmin:Boolean,
    password:String
});

export const User = mongoose.model('user', Schema);
