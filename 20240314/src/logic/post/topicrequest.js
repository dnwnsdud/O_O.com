(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  try {
    let create = new req.mongo.request(req.body);
    let save = new req.mongo.saverequest(req.body);
    let update = await req.mongo.saverequest.findOneAndUpdate(
      {_id:save._id},
      {$set:{"requestId":create._id}},
      {new:true}
      )
      
        if((req.body.leftSide.images != "" && req.body.rightSide.images == "")||(req.body.leftSide.images  == "" && req.body.rightSide.images != "")){
        res.status(201).json({success: false});

    }
    else{
        await create.save();
        await save.save();
        res.status(201).json({success: true});
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};
