import mongoose from "mongoose";
export default mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 150,
    },
    content: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
    },
    count: {
      type: Number,
      default: 0,
    },
    like: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
