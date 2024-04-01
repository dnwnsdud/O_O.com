export default async (req, res, next)=>{
    let logincheck = req.session.user;
    if(logincheck){
        console.log('로그인 체크에 성공하였습니다.');
        return res.json(logincheck)
    }
    else{
        return res.json({message:'fail'})
    }
}