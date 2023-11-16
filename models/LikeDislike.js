import mongoose from "mongoose";
const { Schema, model } = mongoose;

const likeDislikeSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },

  post: {
    type: mongoose.Types.ObjectId,
    ref: "post",
    required: true,
  },

  type: {
    type: String,
    enum: ["like", "dislike"],
    required: true,
  },

  date: { type: Date, default: Date.now },
});

export default model("LikeDislike", likeDislikeSchema);