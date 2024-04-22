(await import("dotenv")).default.config({ path: "./.env" });
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
    let requestedDate = Number(req.body.date.split("-").join(""));

    dbFind.forEach((element) => {
      const dbDate = Number(
        new Date(element.date).toISOString().split("T")[0].split("-").join("")
      );
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

    console.log(result, "result");
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
