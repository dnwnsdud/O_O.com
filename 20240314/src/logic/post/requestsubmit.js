
export default async (req, res, next) => {

    try {
      if (req.body.state == "reject") {
        console.log(req.body);
        await req.mongo.request.deleteOne({ _id: req.body.requestId });
      }
      else if (req.body.state == "approval") {
        const request = await req.mongo.request.findOne({_id: req.body.requestId})
        const left = request.leftSide
        const right = request.rightSide
        let body = {
            category: request.category,
            title: request.title,
            leftSide: {
                images: left.images ? left.images : "",
                title: left.title,
                content: left.content,
            },
            rightSide: {
                images: right.images ? right.images : "",
                title: right.title,
                content: right.content,
            }
        }
        console.log(body, "이 형식이면 어때?");
        const test =  new req.mongo.vote(body)
        await test.save()
        console.log(test,"이거 나와주면 진짜 고맙겠는데 어떻게 생각해");
        await req.mongo.request.deleteOne({ _id: req.body.requestId });
      }
      res.status(200).json({ success:true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  