
export default async (req, res, next) => {

    try {
        const selectwrite = JSON.parse(req.body);
        const result = await req.mongo.board.deleteOne({ _id:selectwrite.id }); // 또는 deleteMany() 사용 가능
        console.log("삭제 할거다");
        const reload = await req.mongo.board.find({});
        res.status(200).json(reload);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
