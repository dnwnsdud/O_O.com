import { default as dotenv } from "dotenv";
dotenv.config({ path: "./.env" });
export default async (req, res, next) => {
  try {
    const data = await req.mongo.blacklist.find();
    const totalCount = await req.mongo.blacklist.countDocuments({});
    res.status(200).json({ data, totalCount });
  } catch (err) {
    res.status(500).json({ message: "fail" });
  }
};