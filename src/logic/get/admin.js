import { default as dotenv } from "dotenv";
dotenv.config({ path: "./.env" });
export default async (req, res, next) => {
  try {
    const userdata = await req.mongo.user.find({}).sort({ penalty: -1 });
    const writedata = await req.mongo.board.find({}).sort({ _id: -1 });
    const comments = await req.mongo.board
      .aggregate([
        { $match: {} },
        { $unwind: "$comment" },
        {
          $project: {
            nickname: "$comment.nickname",
            content: "$comment.content",
            images: "$comment.images",
            email: "$comment.email",
            postId: "$comment.postId",
            tap: "$comment.tap",
            _id: "$comment._id",
          },
        },
      ])
      .sort({ _id: -1 });
    res.status(200).json({ userdata, writedata, comments });
  } catch (err) {
    res.status(500).json({ message: "fail" });
  }
};
