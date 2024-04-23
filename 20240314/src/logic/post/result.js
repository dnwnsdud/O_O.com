(await import("dotenv")).default.config({ path: "./.env" });
import moment from "moment";
import 'moment-timezone'
export default async (req, res, next) => {
  try {
    let result = {
      main: [],
      baseball: [],
      lol: [],
      soccer: [],
      society: [],
    };
    const dbFind = await req.mongo.result.find({}).sort({ date: 1 });
    let requestedDate = req.body.date;
    dbFind.forEach((element) => {
      const dbDate = moment(element.date).tz('Asia/Seoul').format('YYYY-MM-DD');
      if (dbDate === requestedDate) {
        switch (element.category) {
          case "main":
            result.main.push(element);
            break;
          case "baseball":
            result.baseball.push(element);
            break;
          case "lol":
            result.lol.push(element);
            break;
          case "soccer":
            result.soccer.push(element);
            break;
          case "society":
            result.society.push(element);
            break;
          default:
            break;
        }
      }
    });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

