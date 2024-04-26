(await import("dotenv")).default.config({ path: "./.env" });
export default async (req, res, next) => {
  try {
    let result = {};
    let result2 = {};
    let titles = [];
    let votes = [];
    let category = JSON.parse(req.body).category;
    if (category == "/") {
      let title1;
      let title2;
      let title3;
      let title4;
      votes = await req.mongo.vote.find({ category: "main" });
      if (votes.length > 0) result = votes[0];
      else votes.push({ title: "현재 투표가 진행중이지 않습니다." })
      result = votes[0]
      title1 = await req.mongo.vote.find({ category: "baseball" });
      if (title1.length > 0) title1 = title1[0];
      else title1.title = "현재 투표가 진행중이지 않습니다.";
      title2 = await req.mongo.vote.find({ category: "lol" });
      if (title2.length > 0) title2 = title2[0];
      else title2.title = "현재 투표가 진행중이지 않습니다.";
      title3 = await req.mongo.vote.find({ category: "soccer" });
      if (title3.length > 0) title3 = title3[0];
      else title3.title = "현재 투표가 진행중이지 않습니다.";
      title4 = await req.mongo.vote.find({ category: "society" });
      if (title4.length > 0) title4 = title4[0];
      else title4.title = "현재 투표가 진행중이지 않습니다.";

      titles = [title1.title, title2.title, title3.title, title4.title];
      result2 = { title: titles };
      return res.json({ result, result2 });
    } else if (category == "/b") {
      votes = await req.mongo.vote.find({ category: "baseball" });
      result = votes[0];
      
      return res.json(result);
    } else if (category == "/l") {
      votes = await req.mongo.vote.find({ category: "lol" });
      result = votes[0];
      console.log(result);
      return res.json(result);
    } else if (category == "/s") {
      votes = await req.mongo.vote.find({ category: "soccer" });
      result = votes[0];
      console.log(result);
      return res.json(result);
    } else if (category == "/c") {
      votes = await req.mongo.vote.find({ category: "society" });
      result = votes[0];
      return res.json(result);
    }
  } catch (error) {
    console.error(error);
  }
};
