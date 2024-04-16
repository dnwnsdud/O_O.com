import { default as dotenv } from "dotenv";
dotenv.config({path:'./.env'});
export default async(req,res,next)=>{
    try{
        const session = req.session.user.email; 
        const data = await req.mongo.board.find({email:session}).sort({_id: -1})
        const totalCount = await req.mongo.board.countDocuments({email:session})
        const mycomments = await req.mongo.board.aggregate([
            { $match: { "comment.email": session } }, // 사용자의 게시글 필터링
            { $unwind: "$comment" }, // comment 배열을 각각의 문서로 분리
            { $project: { 
                nickname: "$comment.nickname",
                content: "$comment.content",
                images: "$comment.images",
                email: "$comment.email",
                postId: "$comment.postId",
                tap: "$comment.tap",
                _id: "$comment._id",
                createAt: "$comment.createAt",
            } } // comment 필드만 유지
          ]).sort({_id: -1});
          const commentCount = mycomments.length; // 배열의 길이를 사용하여 댓글 수 계산
        res.status(200).json({data, totalCount, mycomments, commentCount})
    }catch(err){
        console.log("망했어 실패야");
         res.status(500).json({message:'fail'})
    }
}