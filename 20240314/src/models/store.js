import mongoose from 'mongoose';
export default mongoose.Schema({
    "title": {
        "type": String,
        // "required": true,
    },
    "price": {
        "type": Number,
        // "required": true,
        "default": 0,
    },
    "images": {
        "type": String,
    }
});