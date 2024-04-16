(await import("dotenv")).default.config({ path: "./.env" });

export default async (req, res, next) => {
    try {
        let { choice, user, voteId } = JSON.parse(req.body);
        let updateQuery = {};

        const vote = await req.mongo.vote.findOne({ _id: voteId });

        if (!vote) {
            res.json({ success: false });
            return;
        }

        let participantsArray = [];
        if (choice === "left") {
            participantsArray = vote.leftSide.participants;
        } else if (choice === "right") {
            participantsArray = vote.rightSide.participants;
        } else {
            res.json({ success: false });
            return;
        }

        if (participantsArray.includes(user)) {
            res.json({ success: false });
            return;
        }

        updateQuery = {
            $addToSet: {
                [`${choice}Side.participants`]: user
            }
        };

        const updatedVote = await req.mongo.vote.findOneAndUpdate(
            { _id: voteId },
            updateQuery,
            { new: true }
        );

        if (!updatedVote) {
            res.json({ success: false });
            return;
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
};
