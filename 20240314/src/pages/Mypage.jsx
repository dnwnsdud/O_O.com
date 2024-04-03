import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';


export default () => {
            

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
            <Header/>
            <Outlet />
            <Footer/>
        </>
    );
};

