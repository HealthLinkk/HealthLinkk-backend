import mongoose from "mongoose";
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },

  post: {
    type: mongoose.Types.ObjectId,
    ref: "post",
    required: true,
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },

  date: { type: Date, default: Date.now },
});

export default model("Comment", commentSchema);