import mongoose from "mongoose";
const { Schema, model } = mongoose; 

const otpSchema =new mongoose.Schema({
    userId: String,  
    otp: String,
    createdAt: { type: Date, default: Date.now },
    expires: { type: Date, default: Date.now, expires: 1500 },
  })
const Otp = mongoose.model('Otp', otpSchema);

export default model("otp",otpSchema)