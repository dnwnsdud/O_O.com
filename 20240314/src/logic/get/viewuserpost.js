import { default as dotenv } from "dotenv";
dotenv.config({ path: "./.env" });
export default async (req, res, next) => {
  console.log(req.body.param);
  try {
    console.log(req.params, "이거 뭔데1");
    console.log(req.query, "이거 뭔데2");
    console.log(req.params.nickname, "파라미터 다시 확인");
    const data = await req.mongo.board.find({ nickname: req.params.nickname });
    console.log(data, "확인해볼게요");
    const totalCount = await req.mongo.board.countDocuments({
      nickname: req.params.nickname,
    });
    res.status(200).json({ data, totalCount });
  } catch (err) {
    console.log("망했어 실패야");
    res.status(500).json({ message: "fail" });
  }
};
