import { default as dotenv } from "dotenv";
dotenv.config({path:'./.env'});
export default async (req, res, next) => {
  try {
    const userEmail = req.session.user.email;
    const updatedUserData = await req.mongo.user.findOneAndUpdate(
      { email: userEmail },
      { $set: req.body }, // 업데이트할 데이터
      { new: true } // 옵션: 업데이트된 문서 반환
    );

    console.log(updatedUserData);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};