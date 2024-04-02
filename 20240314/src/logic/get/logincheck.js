
export default async (req, res, next)=>{
    if(!req.session.user){
        console.log("로그인 상태가 아닙니다.");
            return res.json('logout')
        }
        else{
            let logincheck = req.session.user;
            console.log(req.session);
                console.log('로그인 체크에 성공하였습니다.');
                console.log(logincheck);
                return res.json(logincheck)
            
        }
}