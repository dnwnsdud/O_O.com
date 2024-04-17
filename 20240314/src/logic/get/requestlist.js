(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  try {
    const baseball = new req.mongo.request.find({category:"baseball"});
    const baseballCount = new req.mongo.request.countDocuments({category:"baseball"});
    const lol = new req.mongo.request.find({category:"lol"});
    const lolCount = new req.mongo.request.countDocuments({category:"lol"});
    const soccer = new req.mongo.request.find({category:"soccer"});
    const soccerCount = new req.mongo.request.countDocuments({category:"soccer"});
    const society = new req.mongo.request.find({category:"society"});        
    const societyCount = new req.mongo.request.countDocuments({category:"society"});        
    
    res.status(201).json({baseball, lol, soccer, society, baseballCount, lolCount, soccerCount, societyCount});
    }
   catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};
