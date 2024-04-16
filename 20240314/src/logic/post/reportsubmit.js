
export default async (req, res, next) => {

  try {
    const report = JSON.parse(req.body);
    if (req.body.state == "reject") {
      await req.mongo.blacklist.deleteOne({ _id: report.id });
    }
    else if (req.body.state == "approval") {
      await req.mongo.board.deleteOne({ _id: report.postId })
      const user = await req.mongo.user.findOne({ email: report.userEmail });
      user.penalty += 1
      await user.save();
      await req.mongo.blacklist.deleteOne({ _id: report.id });
    }
    const open = await req.mongo.blacklist.findOne({ _id: report.id })
    const reload = await req.mongo.blacklist.find({}).sort({ _id: -1 });
    res.status(200).json({ reload, open });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
