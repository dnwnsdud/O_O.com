import { Box } from '@chakra-ui/react';
import React from 'react';
import LoL from '../pages/LoL'
import Soccer from '../pages/Soccer'
import Society from '../pages/Society'
import Baseball from '../pages/Baseball'
import Result from '../pages/Result'
import Notice from '../pages/Notice'
import st from '../pages/Store'
import TopicRequest from '../pages/TopicRequest';
import Store from '../pages/Store';
import { Routes, Route } from 'react-router-dom';
import Main from '../component/Main';
import Layout from '../pages/Layout';

export default () => {
    return <Routes>
        <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/b" element={<Baseball />} />
            <Route path="/l" element={<LoL />} />
            <Route path="/s" element={<Soccer />} />
            <Route path="/c" element={<Society />} />
            <Route path="/r" element={<Result />} />
            <Route path="/n" element={<Notice />} />
            <Route path="/st" element={<Store />} />
        </Route>
    </Routes>


}




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