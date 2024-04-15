import mongoose from "mongoose";
export default mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: 150,
    },
    content: {
      type: String,
    },
    count: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
