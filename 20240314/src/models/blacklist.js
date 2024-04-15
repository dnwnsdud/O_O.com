import mongoose from "mongoose";
export default mongoose.Schema({
  email: {
    type: String,
  },
  blacktype: {
    type: String,
  },
  blackdetail: {
    type: String,
  },
  blackid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }
});
