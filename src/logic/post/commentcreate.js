(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  try {
    let create = await req.mongo.board.findOne({ _id: req.body.id });
    if (req.body.content === "") {
      res.status(201).json(create);
    } else {
      create.comment.push({
        nickname: req.body.nickname,
        content: req.body.content,
        email: req.body.email,
        postId: req.body.id,
        tap: create.tap,
      });

      await create.save();
      res.status(201).json(create);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};
