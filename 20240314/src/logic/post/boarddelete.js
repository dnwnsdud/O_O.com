(await import("dotenv")).default.config({ path: "./.env" });
import { ObjectId } from "mongodb";

export default async (req, res, next) => {
  try {
    const { id, email } = req.body;
    console.log("게시글 ID:", id, "요청자 Email:", email);

    const post = await req.mongo.board.findOne({
      _id: new ObjectId(id),
      email: email,
    });
    if (!post) {
      return res
        .status(404)
        .json({ message: "게시글을 찾을 수 없거나, 삭제 권한이 없습니다." });
    }

    const result = await req.mongo.board.deleteOne({ _id: new ObjectId(id) });
    console.log("삭제");
    res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("게시글을 삭제하는 동안 오류 발생:", err);
    res.status(500).json({ error: err.message });
  }
};
