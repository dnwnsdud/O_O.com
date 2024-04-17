(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  try {
    let baseball = new req.mongo.request.find({category:"baseball"});
    let lol = new req.mongo.request.find({category:"lol"});
    let soccer = new req.mongo.request.find({category:"soccer"});
    let society = new req.mongo.request.find({category:"society"});
    
    res.status(201).json({baseball, lol, soccer, society});
    }
   catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};
