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
      result = votes[0];
      title1 = await req.mongo.vote.find({ category: "baseball" });
      title1 = title1[0];
      title2 = await req.mongo.vote.find({ category: "lol" });
      title2 = title2[0];
      title3 = await req.mongo.vote.find({ category: "soccer" });
      title3 = title3[0];
      title4 = await req.mongo.vote.find({ category: "society" });
      title4 = title4[0];
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
      return res.json(result);
    } else if (category == "/s") {
      votes = await req.mongo.vote.find({ category: "soccer" });
      result = votes[0];
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
