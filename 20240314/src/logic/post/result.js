(await import("dotenv")).default.config({ path: "./.env" });
export default async (req, res, next) => {
    let date = new Date();
    console.log(date, "date");
    // let formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let formattedDate = date.toISOString().split('T')[0];
    console.log(formattedDate, "formattedDate");
    try {
        let result = await req.mongo.result.find({}).then((result) => {
            console.log(result);
        })
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
    }
}