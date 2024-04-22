(await import("dotenv")).default.config({ path: "./.env" });
export default async (req, res, next) => {
    // let date = new Date();
    // console.log(date, "date");
    // // let formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    // let formattedDate = date.toISOString().split('T')[0];
    // console.log(formattedDate, "formattedDate");
    console.log(req.body.date, "req.body.date");
    let main = []
    let baseball = []
    let lol = []
    let soccer = []
    let society = []
    try {
        let result = await req.mongo.result.find({}).then((result) => {
            result.forEach((element) => {
                if (element.category === "main") {
                    main.push(element);
                } else if (element.category === "baseball") {
                    baseball.push(element);
                } else if (element.category === "lol") {
                    lol.push(element);
                } else if (element.category === "soccer") {
                    soccer.push(element);
                } else if (element.category === "society") {
                    society.push(element);
                }
            });
            console.log("main:", main.length, "baseball:", baseball.length, "lol:", lol.length, "soccer:", soccer.length, "society:", society.length);
        })
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
    }
}