import { default as dotenv } from "dotenv";
dotenv.config({ path: "./.env" });
export default async (req, res, next) => {
  try {
    const data = await req.mongo.notice.findOne({ _id: req.body.id });
    console.log(data, "확인확인");
    res.status(200).json(data);
  } catch (err) {
    console.log("망했어 실패야");
    res.status(500).json({ message: "fail" });
  }
};
