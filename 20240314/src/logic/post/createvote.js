(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  try {
    let create = new req.mongo.vote(req.body);
    console.log(req.body,"젠장할 이게 뭐가 문제인지 설명 못하면 죽여버릴거야");
    if((req.body.leftSide.images != "" && req.body.rightSide.images == "")||(req.body.leftSide.images  == "" && req.body.rightSide.images != "")){
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
