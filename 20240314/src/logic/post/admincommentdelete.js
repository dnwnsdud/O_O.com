
//export default async (req, res, next) => {
//
//    try {
//        const selectwrite = JSON.parse(req.body);
//        const result = await req.mongo.board.deleteOne({ _id:selectwrite.id }); // 또는 deleteMany() 사용 가능
//        console.log("삭제 할거다");
//        const reload = await req.mongo.board.find({});
//        res.status(200).json(reload);
//    } catch (err) {
//        res.status(500).json({ error: err.message });
//    }
//};

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
      const mycomments = await req.mongo.board.aggregate([
        { $match: {} }, // 사용자의 게시글 필터링
        { $unwind: "$comment" }, // comment 배열을 각각의 문서로 분리
        { $project: { 
            nickname: "$comment.nickname",
            content: "$comment.content",
            images: "$comment.images",
            email: "$comment.email",
            postId: "$comment.postId",
            tap: "$comment.tap",
            _id: "$comment._id",
        } } // comment 필드만 유지
      ]).sort({_id: -1});
  
  
      res.status(200).json(mycomments);
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  