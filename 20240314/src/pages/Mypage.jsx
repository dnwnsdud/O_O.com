import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';


export default () => {
            const [userData, setUserData] = useState([]);
        
            useEffect((e) => {
                try {
                    fetch('/api/mypage')
                    .then(response => {
                        if (response) {
                            console.log(response);
                            return response.json();
                          } 
                          else{
                              throw new Error(e);
                          }
                    })
                     .then(data => {
                    console.log("hi")
                if (data) {
                    setUserData(data);
                } else {
                  alert(`사용자를 저장하는 동안 오류 발생:${data.error}`);
                }
              })
              .catch(error => {
              });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }, []);
    

    return (
        // <div>
        //     <h1>User List</h1>
        //     <ul>
        //         {userData.map(user => (
        //             <li key={user._id}>
        //                 {user.ame}{user.email} {/* 사용자 데이터의 필드에 맞게 수정 */}
        //             </li>
        //         ))}
        //     </ul>
        // </div>
        <>
            <Outlet />
        </>
    );
};

