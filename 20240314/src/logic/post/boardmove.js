import { default as dotenv } from "dotenv";
dotenv.config({ path: "./.env" });
export default async (req, res, next) => {
  try {
    let obj = JSON.parse(req.body);
    console.log(obj);
    const userEmail = req.session.user.email;
    const post = await req.mongo.board.findOne({ _id: obj.id });
    console.log(post.email);

    // 게시글 작성자와 로그인한 사용자가 일치하는지 확인
    if (post.email !== userEmail) {
      // 권한 없음 오류 반환
      return res
        .status(403)
        .json({ success: false, message: "수정 권한이 없습니다." });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
