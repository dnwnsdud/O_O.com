(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  try {
    let user = await req.mongo.user.findOne({ email: req.body.email });
    if (!user || user.point < req.body.price) {
      return res
        .status(200)
        .json({ message: "구매에 필요한 포인트가 부족합니다." });
    } else {
      user.point -= req.body.price;
      await user.save();

      let create = new req.mongo.buyitem(req.body);
      let savedDocument = await create.save();

      return res
        .status(201)
        .json({ success: true, message: "구매가 완료되었습니다." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};
