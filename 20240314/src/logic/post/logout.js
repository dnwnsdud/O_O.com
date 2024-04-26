(await import("dotenv")).default.config({ path: "./.env" });
export default (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false });
    } else {
      return res.status(200).json("logout");
    }
  });
};
