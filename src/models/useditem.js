import mongoose from "mongoose";
export default mongoose.Schema(
    {
        "email": {
            "type": String,
        },
        "title": {
            "type": String,
        },
        "price": {
            "type": Number,
        },
        "images": {
            "type": String,
        },
        "usetime": {
            "type": Date,
            "default": Date.now,
        }
    });