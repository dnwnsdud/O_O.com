import { default as dotenv } from "dotenv";
dotenv.config({ path: "./.env" });
export default async (req, res, next) => {
  try {
    let obj = await req.body;
    obj = JSON.parse(obj)
    const userEmail = req.session.user.email;
    const post = await req.mongo.board.findById(obj.id);
    const a = obj.title
    const b = obj.content
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "게시글을 찾을 수 없습니다." });
    }
    // 게시글 작성자와 로그인한 사용자가 일치하는지 확인
    if (post.email !== userEmail) {
      // 권한 없음 오류 반환
      return res
        .status(403)
        .json({ success: false, message: "수정 권한이 없습니다." });
    }
    const updatedPost = await req.mongo.board.findOneAndUpdate(
      { _id: obj.id },
      { $set: obj },
      { new: true }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
