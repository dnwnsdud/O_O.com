
export default async (req, res, next) => {

  try {
    const report = JSON.parse(req.body);
    if (report.state == "reject") {
      await req.mongo.blacklist.deleteOne({ _id: report.id });
      const reload = await req.mongo.blacklist.find({}).sort({ _id: -1 });
      
      res.status(200).json({ reload });
    }
    else if (report.state == "approval") {
      const test = await req.mongo.board.findOne({ _id: report.postId })
      if(test !== null){
        test.deleteOne({})
      }
      const user = await req.mongo.user.findOne({ email: report.userEmail });
      if(user !== null){
        user.penalty += 1
        await user.save();
      }
      await req.mongo.blacklist.deleteOne({ _id: report.id });
      const reload = await req.mongo.blacklist.find({}).sort({ _id: -1 });
      res.status(200).json({ reload });
    }else if(report.state == "open"){
      const open = await req.mongo.blacklist.findOne({ _id: report.id })
      const reload = await req.mongo.blacklist.find({}).sort({ _id: -1 });
      res.status(200).json({ reload,open });
    }
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
