export default async (req, res, next) => {
  const user = req.session.user.email;
  try {
    const result = await req.mongo.user.deleteOne({ email: user });
    const boarddelete = await req.mongo.board.deleteMany({ email: user });
    req.session.destroy();

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
