import { default as dotenv } from "dotenv";
dotenv.config({ path: './.env' });
export default async (req, res, next) => {
  try {
    const user = new req.mongo.user(req.body);
    const userInfo = await user.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};