(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  try {
    let create = new req.mongo.vote(req.body);
    let save = new req.mongo.saverequest(req.body);

    if((req.body.leftSide.images != "" && req.body.rightSide.images == "")||(req.body.leftSide.images  == "" && req.body.rightSide.images != "")){
        res.status(201).json({success: false});

    }
    else{
        await create.save();
        save = await save.save();
        res.status(201).json({success: true});
        await req.mongo.saverequest.findOneAndUpdate(
          {_id:save._id},
          {$set:{"state":"승인"}},
          {new:true}
          )
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};
