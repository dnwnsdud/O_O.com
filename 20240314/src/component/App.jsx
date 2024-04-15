import React from "react";
import { UserProvider } from "../hook/User";
import { Route, Routes } from "react-router-dom";
import Baseball from "../pages/Baseball";
import Layout from "../pages/Layout";
import LoL from "../pages/LoL";
import Notice from "../pages/Notice";
import Result from "../pages/Result";
import Soccer from "../pages/Soccer";
import Society from "../pages/Society";
import Store from "../pages/Store";
import Main from "./Main";
import Signupform from "../pages/Signupform";
import SubmitProduct from "../pages/SubmitProduct";
import Boardcreate from "../pages/Boardcreate";
import Badetail from "../pages/BoardDetail";
import Boardmodify from "../pages/Boardmodify";
import Mypage from "../pages/Mypage";
import Mygrade from "./Mygrade";
import Myprofile from "./Myprofile";
import Myrequest from "./Myrequest";
import Mywrite from "./Mywrite";
import Mypage_Admin from "./Mypage_Admin";
import UserModify from "./UserModify";
import Calendar from "./Calendar";
import Loading from "../pages/Loading";
import Success from "../pages/Success";

export default () => {
  const weeks = [
    [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, null, null, null, null, null], // Assuming the month ends on the 30th
    ],
    [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, null, null, null, null, null], // Assuming the month ends on the 30th
    ],
    [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, null, null, null, null, null], // Assuming the month ends on the 30th
    ],
    [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, null, null, null, null, null], // Assuming the month ends on the 30th
    ],
    [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, null, null, null, null, null], // Assuming the month ends on the 30th
    ],
    [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, null, null, null, null, null], // Assuming the month ends on the 30th
    ],
    [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, null, null, null, null, null], // Assuming the month ends on the 30th
    ],
    [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, null, null, null, null, null], // Assuming the month ends on the 30th
    ],
    [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, null, null, null, null, null], // Assuming the month ends on the 30th
    ],
    [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, null, null, null, null, null], // Assuming the month ends on the 30th
    ],
    [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, null, null, null, null, null], // Assuming the month ends on the 30th
    ],
    [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, null, null, null, null, null], // Assuming the month ends on the 30th
    ],
  ];
  return (
    <UserProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/b" element={<Baseball />} />
          <Route path="/l" element={<LoL />} />
          <Route path="/s" element={<Soccer />} />
          <Route path="/c" element={<Society />} />
          <Route path="/r" element={<Result />} />
          <Route path="/n" element={<Notice />} />
          <Route path="/st" element={<Store />} />
          <Route path="/create" element={<Boardcreate />} />
          <Route path="/b/:id" element={<Badetail />} />
          <Route path="/b/:id/modify" element={<Boardmodify />} />
          <Route path="/stsubmit" element={<SubmitProduct />} />
          <Route path="/success" element={<Success />} />
          <Route path="/mypage" element={<Mypage />}>
            <Route path="" element={<Myprofile />} />
            <Route path="request" element={<Myrequest />} />
            <Route path="write" element={<Mywrite />} />
            <Route path="grade" element={<Mygrade />} />
            <Route path="modify" element={<UserModify />} />
          </Route>
          <Route path="/admin" element={<Mypage_Admin />} />
          {/* <Route path="/admin/black" element={<Mypage_Admin />} /> */}
          <Route path="calendar" element={<Calendar weeks={weeks} />} />
        </Route>
        <Route path="/signupform/:email?" element={<Signupform />} />
        <Route path="/deleteloading" element={<Loading />} />
      </Routes>
    </UserProvider>
  );
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
