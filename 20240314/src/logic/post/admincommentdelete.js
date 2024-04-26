export default async (req, res, next) => {
  try {
    const commentId = JSON.parse(req.body);
    const post = await req.mongo.board.findOne({ _id: commentId.postId });
    for (let i = 0; i < post.comment.length; i++) {
      if (post.comment[i]._id == commentId.id) {
        post.comment.splice(i, 1);
      }
    }
    await post.save();
    const mycomments = await req.mongo.board
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

    res.status(200).json(mycomments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
