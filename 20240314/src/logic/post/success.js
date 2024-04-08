(await import("dotenv")).default.config({ path: "./.env" });

export default async(req,res,next)=>{
  console.log('난 성공이야');
  let price = req.body;
  console.log('난 가격이야',price);
  if (parseInt(price) === 48000) {
    price = parseInt(price) + parseInt(2000); 
    console.log(price);
  }
  
    try {
        const email = req.session.user.email; 
        const updatedDocument = await req.mongo.user.findOneAndUpdate(
          { email },
          { $inc: { point: price } },
          { new: true }
        );
        if (!updatedDocument) {
          return res.status(404).json({ mesㅈsage: "Document not found" });
        }
        console.log(updatedDocument);
        res.status(200).json(updatedDocument); // 업데이트된 문서를 응답으로 전송
      } catch (err) {
        next(err);
      }
}