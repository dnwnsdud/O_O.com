export default async (req, res, next) => {
  try {
    const detail = req.params.id;
    const detailid = await req.mongo.board.find({
      _id: detail,
    });
    console.log(detail);
    res.json(detailid);
  } catch (err) {
    next(err);
  }
};
