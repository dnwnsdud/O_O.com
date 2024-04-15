(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  const obj = await JSON.parse(req.body);
  const session = req.session.user;
  const _id = obj.id;
  const email = obj.email;
  const post = await req.mongo.board.findOne({ _id: _id });

  try {
    if (obj.like === "like") {
      if (post.likeuser && post.likeuser.includes(email)) {
        return res.status(400).json({ message: "이미 추천한 게시글입니다!" });
      }
      const updatedDocument = await req.mongo.board.findOneAndUpdate(
        { _id },
        { $inc: { like: 1 }, $push: { likeuser: email } },
        { new: true }
      );
      if (!updatedDocument) {
        return res.status(404).json({ message: "Document not found" });
      }
      return res.json({ updatedDocument, success: true });
    }

    if (obj.dislike === "dislike") {
      if (post.dislikeuser && post.dislikeuser.includes(email)) {
        return res.status(400).json({ message: "이미 비추천한 게시글입니다!" });
      }
      const updatedDocument = await req.mongo.board.findOneAndUpdate(
        { _id },
        { $inc: { dislike: 1 }, $push: { dislikeuser: email } },
        { new: true }
      );
      if (!updatedDocument) {
        return res.status(404).json({ message: "Document not found" });
      }
      return res.json({ updatedDocument, success: true });
    }

    if (obj.like === "") {
      const updatedDocument = await req.mongo.board.findOneAndUpdate(
        { _id },
        { $inc: { count: 1 } },
        { new: true }
      );
      if (!updatedDocument) {
        return res.status(404).json({ message: "Document not found" });
      }
      return res.json({ updatedDocument, success: true });
    }
  } catch (err) {
    next(err);
  }
};
