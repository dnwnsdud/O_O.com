import { default as dotenv } from "dotenv";
dotenv.config({ path: './.env' });
export default async (req, res, next) => {
  try {
    const userEmail = req.session.user;
    const updatedUserData = await req.mongo.user.findOneAndUpdate(
      { email: userEmail.email },
      { $set: req.body }, // 업데이트할 데이터
      { new: true } // 옵션: 업데이트된 문서 반환
    );

    req.session.user = { email: updatedUserData.email, nickname: updatedUserData.nickname, role: updatedUserData.role };
    const userdata = req.session.user;

    if (userEmail.nickname !== updatedUserData.nickname) {
      // 모든 관련 게시글을 업데이트합니다.
      await req.mongo.board.updateMany(
        { nickname: userEmail.nickname },
        { $set: { nickname: updatedUserData.nickname } }
      );
    }



    res.status(200).json({ success: true, userdata });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};