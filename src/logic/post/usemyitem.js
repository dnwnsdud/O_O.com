(await import("dotenv")).default.config({ path: "./.env" });
import { ObjectId } from "mongodb";
export default async (req, res, next) => {
  try {
    const title = req.body.title;
    if (title === "토픽 요청권 1회") {
      const { _id } = req.body;

      const myId = new ObjectId(_id);
      const useitem = await req.mongo.buyitem.findOne({ _id: myId });

      const use = await req.mongo.useditem.create({
        title: useitem.title,
        email: useitem.email,
        price: useitem.price,
        images: useitem.images,
        usetime: new Date(),
      });
      await use.save();
      const result = await req.mongo.buyitem.deleteOne({ _id: myId });
      res.status(200).json({ success: true, result });
    } else if (title === "토픽요청권 기간제 (일주일)") {
      const { _id } = req.body;

      const myId = new ObjectId(_id);
      const useitem = await req.mongo.buyitem.findOne({ _id: myId });

      const used = await req.mongo.useditem.create({
        title: useitem.title,
        email: useitem.email,
        price: useitem.price,
        images: useitem.images,
        usetime: new Date(),
      });
      await used.save();

      const use = await req.mongo.useitem.create({
        title: useitem.title,
        email: useitem.email,
        price: useitem.price,
        images: useitem.images,
        usetime: new Date(),
      });
      await use.save();

      const useitemCollection = req.mongo.useitem.collection;
      await useitemCollection.createIndex(
        { usetime: 1 },
        { expireAfterSeconds: 604800 }
      );
      const result = await req.mongo.buyitem.deleteOne({ _id: myId });
      res
        .status(200)
        .json({ success: true, message: "아이템을 사용했습니다." });
    } else {
      res
        .status(200)
        .json({ success: false, message: "아이템을 사용할 수 없습니다." });
    }
  } catch (err) {
    console.error("상품을 사용하는 동안 오류 발생:", err);
    res.status(500).json({ error: err.message });
  }
};
