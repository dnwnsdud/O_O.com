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
    },
    team: {
      type: String,
    },
    images: {
      type: String,
      default: "기본경로",
    },
    videos: {
      type: String,
      default: "기본경로",
    },
    tap: {
      type: String,
    },
    comment: [
      {
        nickname: {
          type: String,
        },
        content: {
          type: String,
        },
        images: {
          type: String,
          default: "기본경로",
        },
        email: {
          type: String,
        },
      },
      {
        timestamps: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);
