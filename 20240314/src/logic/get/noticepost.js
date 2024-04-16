(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  try {
    const posts = await req.mongo.notice.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};
