import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Baseball from '../pages/Baseball';
import Layout from '../pages/Layout';
import LoL from '../pages/LoL';
import Notice from '../pages/Notice';
import Result from '../pages/Result';
import Soccer from '../pages/Soccer';
import Society from '../pages/Society';
import Store from '../pages/Store';
import Main from './Main';
import Signupform from '../pages/Signupform';
import SubmitProduct from '../pages/SubmitProduct';
import Boardcreate from "../pages/Boardcreate";
import Badetail from "../pages/BaDetail";
import Mypage from '../pages/Mypage';
import Mygrade from './Mygrade';
import Myprofile from './Myprofile'
import Myrequest from './Myrequest'
import Mywrite from './Mywrite'

export default () => {
    return <Routes>
        <Route element={<Layout />}>
            <Route path="/" element={<Main  />} />
            <Route path="/b" element={<Baseball />} />
            <Route path="/l" element={<LoL />} />
            <Route path="/s" element={<Soccer />} />
            <Route path="/c" element={<Society />} />
            <Route path="/r" element={<Result />} />
            <Route path="/n" element={<Notice />} />
            <Route path="/st" element={<Store />} />
            <Route path="/create" element={<Boardcreate />} />
            <Route path="/b/:id" element={<Badetail />} />
            <Route path="/stsubmit" element={<SubmitProduct />} />
            {/* <Route path="/mypage" element={<Mypage />} /> */}
        </Route>
            <Route path="/mypage" element={<Mypage  />} >
                <Route path="" element={<Myprofile />} />
                <Route path="request" element={<Myrequest />} />
                <Route path="write" element={<Mywrite />} />
                <Route path="grade" element={<Mygrade />} />
            </Route>
        <Route path="/signupform/:email?" element={<Signupform />} />
    </Routes>

};

//     let data = [
//     {
//         name:"iron",
//         value: 68759 + 54657 + 29669 + 16359,
//         down:[
//             {
//                 name:"i",
//                 value:68759,
//             },
//             {
//                 name:"ii",
//                 value:54657,
//             },
//             {
//                 name:"iii",
//                 value:29669,
//             },
//             {
//                 name:"iv",
//                 value:16359,
//                 down:[
//                     {
//                         name:"top",
//                         value:8359
//                     },
//                     {
//                         name:"bottom",
//                         value:80000
//                     }
//                 ]
//             },
//         ]
//     },
//     {
//         name:"bronze",
//         value: 86052+101638+104781+115637,
//         // down:[
//         //     {
//         //         name:"i",
//         //         value:86052,
//         //     },
//         //     {
//         //         name:"ii",
//         //         value:101638,
//         //     },
//         //     {
//         //         name:"iii",
//         //         value:104781,
//         //     },
//         //     {
//         //         name:"iv",
//         //         value:115637,
//         //     },
//         // ]
//     }
// ];
// return <div>
//     <Downpie
//         emptyRadius={50}
//         data={data}
//         width={900}
//         height={500}
//         dataKey="value"
//         nameKey="name"
//         downKey="down"
//         step={[50, 50, 20]}
//     />
// </div>
