import { default as dotenv } from "dotenv";
dotenv.config({path:'./.env'});
export default async(req, res, next)=>{
    const email = req.query.email;
    const emailSearch = await req.mongo.user.findOne({email:email})
    if(email.length < 0) res.redirect("/")
    else if(req.session.user) {
        console.log("이미 로그인 되어있습니다.");
        console.log(req.session.user);
        res.redirect("/");
    }
    else{
        if(emailSearch){
            req.session.user = {nickname: emailSearch.nickname, role:emailSearch.role}
            console.log("로그인 성공");
            return res.redirect('/');    

        }
        else{
            console.log(('실패'));
            return res.redirect('/');
        }

    }
    
}