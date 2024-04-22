import { default as dotenv } from "dotenv";
dotenv.config({path:'./.env'});
export default async (req, res, next) => {
  try {
    const check = await req.mongo.user.findOne({email:req.body.email})
    if(!req.body.email){
      res.status(500).json("reject");
    }
    else if(check){
      res.status(500).json("check");
    }
    else
    {const user = new req.mongo.user(req.body);
    await user.save();
    res.status(200).json({ success: true });}
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};