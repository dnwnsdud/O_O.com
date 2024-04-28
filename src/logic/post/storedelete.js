(await import("dotenv")).default.config({ path: "./.env" });
import { ObjectId } from "mongodb";

export default async (req, res, next) => {
  try {
    const { _id } = req.body;
    const myId = new ObjectId(_id);
    const result = await req.mongo.store.deleteOne({ _id: myId });
    res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("상품을 삭제하는 동안 오류 발생:", err);
    res.status(500).json({ error: err.message });
  }
};
