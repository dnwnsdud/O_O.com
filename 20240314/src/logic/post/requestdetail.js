(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
    try {
      const detail = await req.mongo.request.findOne({_id:req.body.id})
    res.status(201).json(detail);
    }
   catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};
