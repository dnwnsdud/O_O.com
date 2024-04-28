import { default as dotenv } from "dotenv";
dotenv.config({ path: "./.env" });
export default async (req, res, next) => {
  try {
    const session = req.session.user.email;
    const data = await req.mongo.user.findOne({ email: session });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "fail" });
  }
};
