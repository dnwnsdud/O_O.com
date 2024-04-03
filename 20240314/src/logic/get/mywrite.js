import { default as dotenv } from "dotenv";
dotenv.config({path:'./.env'});
export default async(req,res,next)=>{
    try{
        const session = req.session.user.nickname; 
        const data = await req.mongo.board.find({content:session})
        res.status(200).json(data)
    }catch(err){
        console.log("망했어 실패야");
         res.status(500).json({message:'fail'})
    }
    
}