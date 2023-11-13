import mongoose from "mongoose";
const { Schema, model } = mongoose; 

const otpSchema =new mongoose.Schema({
    userId: String,  // You can use the user's ID as the reference
    otp: String,
    createdAt: { type: Date, default: Date.now },
  })
const Otp = mongoose.model('Otp', otpSchema);

export default model("otp",otpSchema)