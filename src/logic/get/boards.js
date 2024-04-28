(await import("dotenv")).default.config({ path: "./.env" });
export default async (req, res, next) => {
  try {
    const tap = req.query.tap;
    const team = req.query.team;
    let query = {};

    if (team == "전체") {
      if (tap && tap !== "전체") {
        query.tap = tap;
      }
    } else {
      if (tap && tap !== "전체") {
        query.tap = tap;
        query.team = team;
      }
    }
    const posts = await req.mongo.board.find(query);
    const totalCount = await req.mongo.board.countDocuments(query);
    res.json({ posts, totalCount });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "서버에서 문제가 발생했습니다." });
  }
};