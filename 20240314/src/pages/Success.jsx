import React, { useEffect } from "react"
import { useLocation, useSearchParams, useNavigate } from "react-router-dom"

export default () => {
    let nav = useNavigate();
    const location = useLocation();
    const query = location.search;
    const [searchParams, setSearchParams] = useSearchParams();
    const key = searchParams.get("amount");
    // console.log(key);
    useEffect((e)=>{
        fetch('/api/success', {method: 'POST', body: key})
        .then(res => {
            if (res) {
                console.log("결제성공");
                alert('결제완료')
                nav("/");
                return res.json();
              } else {
                throw new Error(e);
              }
        })
        .then(data => {
            key(data);
            console.log(data);
        });
    }, []);
    return <>                      
    <div>결제성공</div>
    </>
}
