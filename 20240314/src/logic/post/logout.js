(await import("dotenv")).default.config({path:'./.env'});
export default (req, res) => {
    req.session.destroy((err) => {
        console.log("hello");
        if (err) {
            return res.status(500).json({ success: false });
        }
        return res.status(200).json({ success: true });
    });
};
// if(req.logout) req.logout(()=>{});
// req.session.destroy();
// res.redirect(`${process.env.API_BASE}/refresh`);