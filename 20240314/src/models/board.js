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
      required: true,
    },
    comment:[{
      nickname:{
        type:String,
      },
      content:{
        type:String,

      }
    }]
  },
  {
    timestamps: true,
  }
);
