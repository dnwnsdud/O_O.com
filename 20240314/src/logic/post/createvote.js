(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  try {
    let create = new req.mongo.vote(req.body);
    if((req.body.leftSide.image != "" && req.body.rightSide.image == "")||(req.body.leftSide.image  == "" && req.body.rightSide.image != "")){
        res.status(201).json({success: false});

    }
    else{
        await create.save();
        res.status(201).json({success: true});
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};
