(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  const obj = await JSON.parse(req.body);
  const _id = obj.id;
  const email = obj.email;
  const post = await req.mongo.board.findOne({ _id: _id });

  try {
    if (obj.like === "like") {
      if (post.likeuser && post.likeuser.includes(email)) {
        const updatedDocument = await req.mongo.board.findOneAndUpdate(
          { _id },
          { $inc: { like: -1 }, $pull: { likeuser: email } },
          { new: true }
        );
        if (!updatedDocument) {
          return res.status(404).json({ message: "Document not found" });
        }
        return res.json({ message: "추천을 취소했습니다.", updatedDocument, success: true });
      } else {
        const updatedDocument = await req.mongo.board.findOneAndUpdate(
          { _id },
          { $inc: { like: 1 }, $push: { likeuser: email } },
          { new: true }
        );
        if (!updatedDocument) {
          return res.status(404).json({ message: "Document not found" });
        }
        return res.json({ message: "추천하였습니다.", updatedDocument, success: true });
      }
    }

    if (obj.dislike === "dislike") {
      if (post.dislikeuser && post.dislikeuser.includes(email)) {
        const updatedDocument = await req.mongo.board.findOneAndUpdate(
          { _id },
          { $inc: { dislike: -1 }, $pull: { dislikeuser: email } },
          { new: true }
        );
        if (!updatedDocument) {
          return res.status(404).json({ message: "Document not found" });
        }
        return res.json({ message: "비추천을 취소했습니다.", updatedDocument, success: true });
      } else {
        const updatedDocument = await req.mongo.board.findOneAndUpdate(
          { _id },
          { $inc: { dislike: 1 }, $push: { dislikeuser: email } },
          { new: true }
        );
        if (!updatedDocument) {
          return res.status(404).json({ message: "Document not found" });
        }
        return res.json({ message: "비추천하였습니다.", updatedDocument, success: true });
      }
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
