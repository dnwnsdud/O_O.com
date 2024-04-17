import mongoose from "mongoose";
export default mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  leftSide: {
    images: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // color:{
    //     type: String,
    //     required: true,
    // },
    participants: [
      {
        type: String,
      },
    ],
  },
  rightSide: {
    images: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // color: {
    //   type: String,
    //   required: true,
    // },
    participants: [
      {
        type: String,
      },
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
