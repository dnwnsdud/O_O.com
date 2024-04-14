(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  const obj = await JSON.parse(req.body);
  const session = req.session.user;
  const _id = obj.id;
  const email = obj.email;
  const post = await req.mongo.board.findOne({ _id: _id });

  try {
    if (obj.like == "like") {
      if (post.likeuser.includes(email)) {
        return res.status(400).json({ message: "이미 추천한 게시글입니다!" });
      }
      const updatedDocument = await req.mongo.board.findOneAndUpdate(
        { _id },
        {
          $inc: { like: 1 },
          $push: { likeuser: email },
        },
        { new: true }
      );
      if (!updatedDocument) {
        return res.status(404).json({ message: "Document not found" });
      } else if (session) {
        if (post.email === session.email) {
          return res.json({ updatedDocument, success: true });
        } else {
          return res.json({ updatedDocument });
        }
      } else {
        return res.json({ updatedDocument, success: false });
      }
    } else if (obj.like == "") {
      const updatedDocument = await req.mongo.board.findOneAndUpdate(
        { _id },
        { $inc: { count: 1 } },
        { new: true }
      );
      if (!updatedDocument) {
        return res.status(404).json({ message: "Document not found" });
      } else if (session) {
        if (post.email === session.email) {
          return res.json({ updatedDocument, success: true });
        } else {
          return res.json({ updatedDocument });
        }
      } else {
        return res.json({ updatedDocument, success: false });
      }
    } // 업데이트된 문서를 응답으로 전송
  } catch (err) {
    next(err);
  }
};
