
export default async (req, res, next) => {

    const user = req.session.user.email;
    try {
        const result = await req.mongo.user.deleteOne({ email:user }); // 또는 deleteMany() 사용 가능
        const boarddelete = await req.mongo.board.deleteMany({ email:user })
        console.log("삭제 할거다");
        req.session.destroy();
        
        res.status(200).json({success:true});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
