(await import("dotenv")).default.config({ path: "./.env" });
export default async (req, res, next) => {
    try {
        let result = {};
        let result2 = {}
        let titles = []
        let votes = [];
        let category = JSON.parse(req.body).category
        if (category == "/") {
            let title1;
            let title2;
            let title3;
            let title4;
            votes = await req.mongo.vote.find({ category: "main" });
            let count = votes.length;
            result = votes[count - 1];
            [title1] = await req.mongo.vote.find({ category: "baseball" }).sort({ count: -1 }).limit(1);
            [title2] = await req.mongo.vote.find({ category: "lol" }).sort({ count: -1 }).limit(1);
            [title3] = await req.mongo.vote.find({ category: "soccer" }).sort({ count: -1 }).limit(1);
            [title4] = await req.mongo.vote.find({ category: "society" }).sort({ count: -1 }).limit(1);
            titles = [title1.title, title2.title, title3.title, title4.title]
            result2 = { title: titles }
            return res.json({ result, result2 });
        }
        else if (category == "/b") {
            votes = await req.mongo.vote.find({ category: "baseball" });
            let count = votes.length;
            result = votes[count - 1];
            return res.json(result);
        }
        else if (category == "/l") {
            votes = await req.mongo.vote.find({ category: "lol" });
            let count = votes.length;
            result = votes[count - 1];
            return res.json(result);
        }
        else if (category == "/s") {
            votes = await req.mongo.vote.find({ category: "soccer" });
            let count = votes.length;
            result = votes[count - 1];
            return res.json(result);
        }
        else if (category == "/c") {
            votes = await req.mongo.vote.find({ category: "society" });
            let count = votes.length;
            result = votes[count - 1];
            return res.json(result);
        }

    } catch (error) {
        console.error(error)
    }
}