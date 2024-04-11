
export default async (req, res, next) => {

  try {
    const commentId = JSON.parse(req.body);
    console.log(commentId);
    const post = await req.mongo.board.findOne({ _id: commentId.postId });
    // post.comment.filter(comment => comment._id.toString() !== commentId.id); // 또는 deleteMany() 사용 가능
    console.log("변형 전:", post.comment);
    for (let i = 0; i < post.comment.length; i++) {
      if (post.comment[i]._id == commentId.id) {
        post.comment.splice(i, 1)
      }
    }
    console.log("변형 후:", post.comment);



    await post.save();
    console.log(post);
    res.status(200).json(post);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
