(await import("dotenv")).default.config({ path: "./.env" });
export default async (req, res, next) => {
    try {
        let result = {};
        let votes = [];
        let category = JSON.parse(req.body).category
        if (category == "/") {
            votes = await req.mongo.vote.find({ category: "main" });
            let count = votes.length;
            result = votes[count - 1];
        }
        else if (category == "/b") {
            votes = await req.mongo.vote.find({ category: "baseball" });
            let count = votes.length;
            result = votes[count - 1];
        }
        else if (category == "/l") {
            votes = await req.mongo.vote.find({ category: "lol" });
            let count = votes.length;
            result = votes[count - 1];
        }
        else if (category == "/s") {
            votes = await req.mongo.vote.find({ category: "soccer" });
            let count = votes.length;
            result = votes[count - 1];
        }
        else if (category == "/c") {
            votes = await req.mongo.vote.find({ category: "society" });
            let count = votes.length;
            result = votes[count - 1];
        }
        res.json(result);
    } catch (error) {
        console.error(error)
    }
}