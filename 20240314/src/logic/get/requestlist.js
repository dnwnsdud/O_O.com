(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  try {
    const baseball = await req.mongo.request.find({category:"baseball"});
    const baseballCount = await req.mongo.request.countDocuments({category:"baseball"});
    const lol = await req.mongo.request.find({category:"lol"});
    const lolCount = await req.mongo.request.countDocuments({category:"lol"});
    const soccer = await req.mongo.request.find({category:"soccer"});
    const soccerCount = await req.mongo.request.countDocuments({category:"soccer"});
    const society = await req.mongo.request.find({category:"society"});        
    const societyCount = await req.mongo.request.countDocuments({category:"society"});        
    
    res.status(201).json({baseball, lol, soccer, society, baseballCount, lolCount, soccerCount, societyCount});
    }
   catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};
