(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  let price = req.body;
  if (parseInt(price) === 48000) {
    price = parseInt(price) + parseInt(2000);
  }

  try {
    const email = req.session.user.email;
    const updatedDocument = await req.mongo.user.findOneAndUpdate(
      { email },
      { $inc: { point: price } },
      { new: true }
    );
    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json(updatedDocument);
  } catch (err) {
    next(err);
  }
};
