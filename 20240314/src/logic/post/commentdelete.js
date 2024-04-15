
export default async (req, res, next) => {

  try {
    const commentId = JSON.parse(req.body);
    const post = await req.mongo.board.findOne({ _id: commentId.postId });
    // post.comment.filter(comment => comment._id.toString() !== commentId.id); // 또는 deleteMany() 사용 가능
    for (let i = 0; i < post.comment.length; i++) {
      if (post.comment[i]._id == commentId.id) {
        post.comment.splice(i, 1)
      }
    }



    await post.save();
    res.status(200).json(post);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
