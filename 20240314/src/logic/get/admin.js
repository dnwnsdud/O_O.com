import { default as dotenv } from "dotenv";
dotenv.config({path:'./.env'});
export default async(req,res,next)=>{
    try{
        const userdata = await req.mongo.user.find({}).sort({_id: -1})
        const writedata = await req.mongo.board.find({}).sort({_id: -1})
        const comments = await req.mongo.board.aggregate([
            { $match: { } }, // 사용자의 게시글 필터링
            { $unwind: "$comment" }, // comment 배열을 각각의 문서로 분리
            { $project: { 
                nickname: "$comment.nickname",
                content: "$comment.content",
                images: "$comment.images",
                email: "$comment.email",
                postId: "$comment.postId",
                tap: "$comment.tap",
                _id: "$comment._id",
            } } 
          ]).sort({_id: -1});
          console.log(comments);
        res.status(200).json({userdata,writedata,comments})
    }catch(err){
        console.log("망했어 실패야");
         res.status(500).json({message:'fail'})
    }
    
}