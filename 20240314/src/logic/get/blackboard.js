import { default as dotenv } from "dotenv";
dotenv.config({ path: "./.env" });
export default async (req, res, next) => {
  try {
    const data = await req.mongo.blacklist.find();
    console.log(data, "확인점");
    const totalCount = await req.mongo.blacklist.countDocuments({});
    res.status(200).json({ data, totalCount });
  } catch (err) {
    console.log("망했어 실패야");
    res.status(500).json({ message: "fail" });
  }
};
