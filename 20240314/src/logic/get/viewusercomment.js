import { default as dotenv } from "dotenv";
dotenv.config({ path: "./.env" });
export default async (req, res, next) => {
  try {
    const nickname = req.query.nickname;
    console.log(nickname);
    const mycomments = await req.mongo.board
      .aggregate([
        { $match: { "comment.nickname": nickname } },
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
            createdAt: "$comment.createdAt",
          },
        }, // comment 필드만 유지
      ])
      .sort({ _id: -1 });
    console.log(mycomments, "asdasdasdasdas");
    const commentCount = mycomments.length;
    res.status(200).json({ mycomments, commentCount });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};