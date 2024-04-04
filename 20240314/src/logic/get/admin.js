import { default as dotenv } from "dotenv";
dotenv.config({path:'./.env'});
export default async(req,res,next)=>{
    try{
        const userdata = await req.mongo.user.find({})
        const writedata = await req.mongo.board.find({})
        res.status(200).json({userdata,writedata})
    }catch(err){
        console.log("망했어 실패야");
         res.status(500).json({message:'fail'})
    }
    
}