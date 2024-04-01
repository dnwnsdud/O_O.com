(await import("dotenv")).default.config({ path: './.env' });
import express from 'express';
const app = express();


export default async (req, res, next) => {
    try {
        const stores = await req.mongo.store.find({});
        console.log("들오아따ㅏㅏ");
        res.status(200).json(stores);
    } catch (err) {
        console.error('상품을 가져오는 동안 오류 발생:', err);
        res.status(500).json({ error: err.message });
    }
};

