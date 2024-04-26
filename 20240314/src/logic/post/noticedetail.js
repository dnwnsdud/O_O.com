import { default as dotenv } from "dotenv";
dotenv.config({ path: "./.env" });
export default async (req, res, next) => {
  try {
    const data = await req.mongo.notice.findOne({ _id: req.body.id });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "fail" });
  }
};
