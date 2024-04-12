(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
    try {
        const posts = await req.mongo.board.aggregate([
            {
                $addFields: {
                    totalScore: { $add: [{ $multiply: ["$like", 2] }, "$count"] }
                }
            },
            {
                $sort: { totalScore: -1 }
            },
            {
                $limit: 10
            }
        ]);
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류 발생" });
    }
};
