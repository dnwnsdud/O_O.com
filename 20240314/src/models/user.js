import mongoose from 'mongoose';
export default mongoose.Schema({
    "name": {
        "type": String,
        "required": true,
        "maxlength": 150,
    },
    "email": {
        "type": String,
        "required": true,
        "unique": true
    },
    "nickname": {
        "type": String,
        "required": true,
        "unique": true
    },
    "role": {
        "type": String,
        "default": "user"
    },
    "team": {
        "type": String,
        "default": "응원팀"
    },
    "images": {
        "type": String,
        "default": "기본경로"
    },
    "point": {
        "type": Number,
        "default": 0
    }
});