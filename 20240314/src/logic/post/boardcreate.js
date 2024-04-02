(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  try {
    let create = new req.mongo.board(req.body);
    let savedDocument = await create.save();

    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};
