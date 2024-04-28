import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export default async (req, res, next) => {
  const email = req.query.email;
  const emailSearch = await req.mongo.user.findOne({ email: email });

  if (!emailSearch) {
    return res.redirect("/");
  }

  req.session.user = {
    email: emailSearch.email,
    role: emailSearch.role,
    nickname: emailSearch.nickname,
  };

  res.redirect("/");
};
