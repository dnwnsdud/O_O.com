(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  try {

    let update = await req.mongo.board.findOne({ _id: req.body.id });
    if (req.body.content === "") {
      res.status(201).json(update);
    } else {
      let savedDocument = update.comment.id(req.body.commentId);
      savedDocument.content = req.body.content;
      await update.save();
      res.status(201).json(update);
    }



  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};