import React from "react";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "../hook/User";
import Baseball from "../pages/Baseball";
import Badetail from "../pages/BoardDetail";
import Boardcreate from "../pages/Boardcreate";
import Boardmodify from "../pages/Boardmodify";
import CreateVote from "../pages/CreateVote";
import Layout from "../pages/Layout";
import LoL from "../pages/LoL";
import Loading from "../pages/Loading";
import Mypage from "../pages/Mypage";
import Notice from "../pages/Notice";
import NoticeDetail from "../pages/NoticeDetail";
import NoticeModify from "../pages/NoticeModify";
import NoticeWrite from "../pages/NoticeWrite";
import Report from "../pages/Report";
import Result from "../pages/Result";
import Signupform from "../pages/Signupform";
import Soccer from "../pages/Soccer";
import Society from "../pages/Society";
import Store from "../pages/Store";
import SubmitProduct from "../pages/SubmitProduct";
import Success from "../pages/Success";
import TopicRequest from "../pages/TopicRequest";
import Main from "./Main";
import Mygrade from "./Mygrade";
import Mypage_Admin from "./Mypage_Admin";
import Myprofile from "./Myprofile";
import Myrequest from "./Myrequest";
import Mywrite from "./Mywrite";
import UserModify from "./UserModify";
import Requestlist from "../pages/Requestlist";
import Requestdetail from "../pages/Requestdetail";

export default () => {

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
          <Route path="/n/write" element={<NoticeWrite />} />
          <Route path="/n/:id" element={<NoticeDetail />} />
          <Route path="/n/:id/modify" element={<NoticeModify />} />
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
          <Route path="/admin/report" element={<Report />} />
          <Route path="/topicrequest" element={<TopicRequest />} />
          <Route path="/requestlist" element={<Requestlist />} />
          <Route path="/requestlist/:id" element={<Requestdetail />} />
        </Route>
        <Route path="/signupform/:email?" element={<Signupform />} />
        <Route path="/deleteloading" element={<Loading />} />
        <Route path="/vote" element={<CreateVote />} />
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
