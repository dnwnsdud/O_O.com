(await import("dotenv")).default.config({ path: "./.env" });

export default async(req,res,next)=>{
  console.log('난 성공이야');
  const price = req.body;
  console.log(price);
    // try {
    //     const email = req.session.user.email; 
    //     const updatedDocument = await req.mongo.board.findOneAndUpdate(
    //       { email },
    //       { $inc: { point: 1 } },
    //       { new: true }
    //     );
    //     if (!updatedDocument) {
    //       return res.status(404).json({ message: "Document not found" });
    //     }
    //     console.log(updatedDocument);
    //     res.status(200).json(updatedDocument); // 업데이트된 문서를 응답으로 전송
    //   } catch (err) {
    //     next(err);
    //   }
}