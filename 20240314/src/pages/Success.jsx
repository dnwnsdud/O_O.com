import React, { useEffect } from "react"
import { useLocation, useSearchParams } from "react-router-dom"

export default () => {

    const location = useLocation();
    const query = location.search;
    const [searchParams, setSearchParams] = useSearchParams();
    const key = searchParams.get("amount");
    console.log(key);
    useEffect((e)=>{
        fetch('/api/success', {method: 'POST', body: key})
        .then(res => {
            if (res) {
                console.log(key);
                console.log("결제성공");
                return res.json();
              } else {
                throw new Error(e);
              }
        })
        .then(data => {
            console.log(data);
        });
    }, []);
    return <>                      
    <div>결제성공</div>
    </>
}
