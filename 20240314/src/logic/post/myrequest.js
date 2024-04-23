(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  try {
    const email = req.session.user.email
    const myrequest = await req.mongo.saverequest.find({email:email})
    res.status(201).json({ success: true, myrequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};
