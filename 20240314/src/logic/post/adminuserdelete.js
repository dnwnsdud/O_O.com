export default async (req, res, next) => {
  try {
    const selectuser = JSON.parse(req.body);
    await req.mongo.user.deleteOne({ email: selectuser.email });
    await req.mongo.board.deleteMany({
      email: selectuser.email,
    });
    const reload = await req.mongo.user.find({});
    res.status(200).json(reload);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
