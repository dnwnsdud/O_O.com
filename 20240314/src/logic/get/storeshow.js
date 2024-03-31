(await import("dotenv")).default.config({ path: './.env' });
export default async (req, res, next) => {
    try {
        const storeData = await req.mongo.store.find({}); 
        console.log('dddd');
        res.status(200).json(storeData);
    } catch (err) {
        console.error('상품을 가져오는 동안 오류 발생:', err); 
        res.status(500).json({ error: err.message });
    }
};