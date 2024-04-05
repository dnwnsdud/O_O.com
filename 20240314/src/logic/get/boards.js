(await import("dotenv")).default.config({ path: "./.env" });
export default async (req, res, next) => {
  try {
    const posts = await req.mongo.board.find({});
    const totalCount = await req.mongo.board.countDocuments();
    res.json({ posts, totalCount });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "서버에서 문제가 발생했습니다." });
  }
};
