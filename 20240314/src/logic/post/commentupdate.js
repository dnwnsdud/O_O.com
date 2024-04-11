(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
    console.log("오 왔다");
    console.log(req.body);
    let a =req.body;
    console.log(a.id);
    console.log(a.postId);
    console.log(a.content);
  try {
    
    let update = await req.mongo.board.findOne({ _id: a.postId });
    console.log(update)
    console.log(update.comment.id(a.id))
    if (req.body.content === "") {
      res.status(201).json(update);
    } else {
      let savedDocument = update.comment.id(a.id);
      savedDocument.content = req.body.content;
      await update.save();
      console.log("수정완료");
      res.status(201).json(update);
    }



  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};