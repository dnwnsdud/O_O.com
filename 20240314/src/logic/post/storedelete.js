(await import("dotenv")).default.config({ path: './.env' });

export default async (req, res, next) => {

    const { _id } = await req.json();
    console.log(_id);
    try {
        const result = await req.mongo.store.deleteOne({ _id: new ObjectId(_id) }); // 또는 deleteMany() 사용 가능
        console.log("삭제 할거다");
        res.status(200).json(result);
    } catch (err) {
        console.error('상품을 삭제하는 동안 오류 발생:', err);
        res.status(500).json({ error: err.message });
    }
};
