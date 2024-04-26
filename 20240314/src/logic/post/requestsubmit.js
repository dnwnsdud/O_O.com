
export default async (req, res, next) => {

    try {
      if (req.body.state == "reject") {
        console.log(req.body,"이건 뭘까요?");
        await req.mongo.request.deleteOne({ _id: req.body.requestId });
        let dog = await req.mongo.saverequest.findOneAndUpdate(
          {requestId:req.body.requestId},
          {$set:{"state":"반려"}},
          {new:true}
          )
          res.status(200).json({ success:true });
      }
      else if (req.body.state == "approval") {
        const request = await req.mongo.request.findOne({_id: req.body.requestId})
        const left = request.leftSide
        const right = request.rightSide
        let body = {
            category: request.category,
            title: request.title,
            user:request.user,
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
        await req.mongo.saverequest.findOneAndUpdate(
          {requestId:req.body.requestId},
          {$set:{"state":"승인"}},
          {new:true}
          )
        const test =  new req.mongo.vote(body)
        await test.save()
        await req.mongo.request.deleteOne({ _id: req.body.requestId });
        res.status(200).json({ success:true });

      }else if(req.body.state == "delete"){
        await req.mongo.request.deleteOne({ _id: req.body.requestId });
        await req.mongo.saverequest.findOneAndUpdate(
          {requestId:req.body.requestId},
          {$set:{"state":"삭제"}},
          {new:true}
          )
          res.status(200).json({ success:false });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  