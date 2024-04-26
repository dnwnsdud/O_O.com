(await import("dotenv")).default.config({ path: "./.env" });
export default async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await req.mongo.vote.findOne({ _id: req.body.voteId });
    console.log(result.leftSide.participants);
    console.log(result.rightSide.participants);
    if (
      result.leftSide.participants.length === 0 ||
      result.rightSide.participants.length === 0
    ) {
      console.log("참여 없을때");
      await req.mongo.result.create({
        category: result.category,
        title: result.title,
        user: result.user,
        leftSide: result.leftSide,
        rightSide: result.rightSide,
        date: result.date,
      });
      await req.mongo.vote.deleteOne({ _id: req.body.voteId });
      return res
        .status(200)
        .json({ success: true });
    }
    if (
      result.leftSide.participants.length > result.rightSide.participants.length
    ) {
      console.log("왼쪽 승");
      for (let i = 0; i < result.leftSide.participants.length; i++) {
        await req.mongo.user.updateOne(
          { email: result.leftSide.participants[i] },
          { $inc: { "rating.win": 1 } }
        );
        await req.mongo.user.updateOne(
          { email: result.rightSide.participants[i] },
          { $inc: { "rating.lose": 1 } }
        );
      }
    } else if (
      result.leftSide.participants.length < result.rightSide.participants.length
    ) {
      console.log("오른쪽 승");
      for (let i = 0; i < result.rightSide.participants.length; i++) {
        await req.mongo.user.updateOne(
          { email: result.rightSide.participants[i] },
          { $inc: { "rating.win": 1 } }
        );
        await req.mongo.user.updateOne(
          { email: result.leftSide.participants[i] },
          { $inc: { "rating.lose": 1 } }
        );
      }
    } else if (
      result.leftSide.participants.length ===
      result.rightSide.participants.length
    ) {
      console.log("무승부");
      for (let i = 0; i < result.rightSide.participants.length; i++) {
        await req.mongo.user.updateOne(
          { email: result.rightSide.participants[i] },
          { $inc: { "rating.lose": 1 } }
        );
      }
      for (let i = 0; i < result.leftSide.participants.length; i++) {
        await req.mongo.user.updateOne(
          { email: result.leftSide.participants[i] },
          { $inc: { "rating.lose": 1 } }
        );
      }
    }
    await req.mongo.result.create({
      category: result.category,
      title: result.title,
      user: result.user,
      leftSide: result.leftSide,
      rightSide: result.rightSide,
      date: result.date,
    });
    await req.mongo.vote.deleteOne({ _id: req.body.voteId });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
  }
};
