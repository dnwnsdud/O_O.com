(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  try {
    let user = await req.mongo.user.findOne({ email: req.body.email });
    if (!user || user.point < req.body.price) {
      alert("포인트가 부족합니다.");
      return res.status(400).json({ message: "포인트가 부족합니다." });
    }

    user.point -= req.body.price;
    console.log('포인트', req.body.price);

    console.log(user.point);
    await user.save();

    let create = new req.mongo.buyitem(req.body);
    let savedDocument = await create.save();

    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};
