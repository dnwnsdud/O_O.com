import { default as dotenv } from "dotenv";
dotenv.config({ path: "./.env" });
export default async (req, res, next) => {
  try {
    const nickname = req.query.nickname;
    const data = await req.mongo.user.find({ nickname: nickname });
    const totalCount = await req.mongo.user.countDocuments({
      nickname: nickname,
    });
    res.status(200).json({ data, totalCount });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
