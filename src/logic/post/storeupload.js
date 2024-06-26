(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
  try {
    const store = new req.mongo.store(req.body);
    await store.save();
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("상품을 저장하는 동안 오류 발생:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
