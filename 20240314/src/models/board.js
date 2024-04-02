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
  },
  {
    timestamps: true,
  }
);
