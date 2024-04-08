(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  const obj = await JSON.parse(req.body);
  const session = req.session.user;
  console.log(obj, "ㅇㄴㅇㅁㄴㅇ");
  const _id = obj.id;
  const post = await req.mongo.board.findOne({ _id: _id });
  console.log(post);
  console.log(session, "세션");
  try {
    if (obj.like == "like") {
      const updatedDocument = await req.mongo.board.findOneAndUpdate(
        { _id },
        { $inc: { like: 1 } },
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
