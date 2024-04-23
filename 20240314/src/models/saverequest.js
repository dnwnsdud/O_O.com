import mongoose from "mongoose";
export default mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        user: {
            type: String,
        },
        email:{
            type: String,
        },
        state:{
            type: String,
            default:"승인대기"
        },
        requestId:{
            type: String,
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
            color: {
                type: String,
                // required: true,
            },
            participants:
                [
                    {
                        type: String
                    }
                ]
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
            color: {
                type: String,
                // required: true,
            },
            participants:
                [
                    {
                        type: String
                    }
                ]

        },
        date: {
            type: Date,
            default: Date.now,
        }
    }
)