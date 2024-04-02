(await import("dotenv")).default.config({ path: './.env' });

export default async (req, res, next) => {

  try {
    console.log(1);
    console.log(req.body);
    console.log(2);
    const detailid = await req.mongo.board.findOne({
      _id: req.body
    });
    res.json(detailid);
  } catch (err) {
    next(err);
  }
};
