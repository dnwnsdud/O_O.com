(await import("dotenv")).default.config({ path: "./.env" });
export default async (req, res, next) => {
  try {
    const post = await req.mongo.board.findOne();
    console.log(post);
    res.json({ post });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "서버에서 문제가 발생했습니다." });
  }
};
