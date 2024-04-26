import { default as dotenv } from "dotenv";
dotenv.config({ path: "./.env" });
export default async (req, res, next) => {
  try {
    const userEmail = req.session.user;
    const updatedUserData = await req.mongo.user.findOneAndUpdate(
      { email: userEmail.email },
      { $set: req.body },
      { new: true }
    );

    req.session.user = {
      email: updatedUserData.email,
      nickname: updatedUserData.nickname,
      role: updatedUserData.role,
    };
    const userdata = req.session.user;

    if (userEmail.nickname !== updatedUserData.nickname) {
      await req.mongo.board.updateMany(
        { nickname: userEmail.nickname },
        { $set: { nickname: updatedUserData.nickname } }
      );
      await req.mongo.board.updateMany(
        { "comment.nickname": userEmail.nickname },
        { $set: { "comment.$[].nickname": updatedUserData.nickname } }
      );
    }

    res.status(200).json({ success: true, userdata });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
