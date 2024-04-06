(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  const obj = await JSON.parse(req.body);
  console.log(obj);
  const id = obj.id;
  try {
    const post = await req.mongo.board.findById(id);
    console.log(post);
    if (!post) {
      return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
    }
    res.json({ title: post.title, content: post.content });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "서버에서 문제가 발생했습니다." });
  }
};
