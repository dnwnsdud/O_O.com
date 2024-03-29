import mongoose from 'mongoose';
export default mongoose.Schema({
    "name":{
        "type":String,
        "required":true,
        "maxlength": 150,
    },
    "email":{
        "type":String,
        "required":true,
        "unique":true
    },
    "nickname":{
        "type":String,
        "required":true,
        "unique":true
    },
    "role":{
        "type":String,
        "default":"user",
    }
});