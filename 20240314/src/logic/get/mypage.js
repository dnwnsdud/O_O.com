import { default as dotenv } from "dotenv";
dotenv.config({path:'./.env'});
export default async(req,res,next)=>{
    try{
        const list = await req.mongo.user.find({})
        console.log("Hello");
         res.status(200).json(list)
    }catch(err){
        console.log("망했어 실패야");
         res.status(500).json({message:'fail'})
    }
    
}