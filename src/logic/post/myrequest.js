(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  try {
    const email = req.session.user.email;
    const myrequest = await req.mongo.saverequest
      .find({ email: email })
      .sort({ _id: -1 });
    const totalCount = await req.mongo.saverequest.countDocuments({
      email: email,
    });
    res.status(201).json({ success: true, myrequest, totalCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};
