import mongoose from "mongoose";
export default mongoose.Schema({
  email: {
    type: String,
  },
  type: {
    type: String,
  },
});
