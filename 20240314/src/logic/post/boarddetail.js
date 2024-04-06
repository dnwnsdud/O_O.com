(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  const obj = await JSON.parse(req.body);
  const _id = obj.id;
  try {
    if (obj.like == "like") {
      const updatedDocument = await req.mongo.board.findOneAndUpdate(
        { _id },
        { $inc: { like: 1 } },
        { new: true }
      );
      if (!updatedDocument) {
        return res.status(404).json({ message: "Document not found" });
      }

      res.json(updatedDocument); // 업데이트된 문서를 응답으로 전송
    } else if (obj.like == "") {
      console.log(_id);

      const updatedDocument = await req.mongo.board.findOneAndUpdate(
        { _id },
        { $inc: { count: 1 } },
        { new: true }
      );
      if (!updatedDocument) {
        return res.status(404).json({ message: "Document not found" });
      }
      console.log(obj, "왜 라이크만 뜨는거지?");
      res.json(updatedDocument);
    } // 업데이트된 문서를 응답으로 전송
  } catch (err) {
    next(err);
  }
};
