export default async (req, res, next) => {
  if (!req.session.user) {
    return res.json("logout");
  } else {
    let logincheck = req.session.user;
    return res.json(logincheck);
  }
};
