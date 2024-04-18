import mongoose from "mongoose";
export default mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 5,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
    maxlength: 7,
  },
  role: {
    type: String,
    default: "user",
  },
  team: {
    type: String,
    default: "응원팀",
  },
  images: {
    type: String,
    default:
      "static\\images\\2024\\4\\9\\6riw67O47J2066+47KeALnBuZ3dlamlmamszODI5MkBAZ2plaS.png",
  },
  point: {
    type: Number,
    default: 0,
  },
  penalty: {
    type: Number,
    default: 0,
  },
  rating: {
    win: {
      type: Number,
      default: 0,
    },
    lose: {
      type: Number,
      default: 0,
    },
  },
});
