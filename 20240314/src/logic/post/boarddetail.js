(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  if (req.body.like == "like") {
    try {
      console.log(req.body);
      const { _id } = req.body.id;
      console.log(_id);
      const updatedDocument = await req.mongo.board.findOneAndUpdate(
        { _id },
        { $inc: { like: 1 } },
        { new: true }
      );
      if (!updatedDocument) {
        return res.status(404).json({ message: "Document not found" });
      }
      console.log(updatedDocument);
      res.json(updatedDocument); // 업데이트된 문서를 응답으로 전송
    } catch (err) {
      next(err);
    }
  }
  try {
    const _id = req.body;
    // console.log(_id);
    const updatedDocument = await req.mongo.board.findOneAndUpdate(
      { _id },
      { $inc: { count: 1 } },
      { new: true }
    );
    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }
    console.log(updatedDocument);
    res.json(updatedDocument); // 업데이트된 문서를 응답으로 전송
  } catch (err) {
    next(err);
  }
};
