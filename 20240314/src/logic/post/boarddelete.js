(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  try {
    const { id, email } = req.body;
    const session = req.session.user.email;
    const role = req.session.user.role;
    if (role == "admin") {
      const post = await req.mongo.board.findOne({
        _id: req.body.postid,
      });
      if (!post) {
        return res
          .status(404)
          .json({ message: "게시글을 찾을 수 없거나, 삭제 권한이 없습니다." });
      }

      const result = await req.mongo.board.deleteOne({ _id: req.body.postid });
      res.status(200).json({ success: true, result });
    } else {
      if (email !== session) {
        return res.status(401).json({ message: "사용자 인증이 필요합니다." });
      }

      const post = await req.mongo.board.findOne({
        _id: req.body.postid,
      });
      if (!post) {
        return res
          .status(404)
          .json({ message: "게시글을 찾을 수 없거나, 삭제 권한이 없습니다." });
      }

      const result = await req.mongo.board.deleteOne({ _id: req.body.postid });
      res.status(200).json({ success: true, result });
    }
  } catch (err) {
    console.error("게시글을 삭제하는 동안 오류 발생:", err);
    res.status(500).json({ error: err.message });
  }
};
