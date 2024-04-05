(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  console.log("ㅗㅜㅑ");
  const obj = await JSON.parse(req.body)
  const _id = obj.id;
  console.log(obj);
  try {
    if (obj.like == "like") {
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
      res.json(updatedDocument);
    } // 업데이트된 문서를 응답으로 전송
  } catch (err) {
    next(err);
  }

}