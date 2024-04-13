import { default as dotenv } from "dotenv";
dotenv.config({path:'./.env'});
export default async(req,res,next)=>{
    try{
        const session = req.session.user.email; 
        const data = await req.mongo.board.find({email:session})
        const totalCount = await req.mongo.board.countDocuments({email:session})
        const mycomments = await req.mongo.board.aggregate([
            { $match: { "comment.email": session } }, // 사용자의 게시글 필터링
            { $unwind: "$comment" }, // comment 배열을 각각의 문서로 분리
            { $project: { _id: 0, comment: 1 } } // comment 필드만 유지
          ]);
          console.log(mycomments);
        res.status(200).json({data, totalCount, mycomments})
    }catch(err){
        console.log("망했어 실패야");
         res.status(500).json({message:'fail'})
    }
}