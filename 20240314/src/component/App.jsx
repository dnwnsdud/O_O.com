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
import Mypage_Admin from "./Mypage_Admin";
import Myprofile from "./Myprofile";
import Myrequest from "./Myrequest";
import UserModify from "./UserModify";
import Requestlist from "../pages/Requestlist";
import Requestdetail from "../pages/Requestdetail";
import Calender from "../pages/Calender";
import ViewUser from "../pages/ViewUser";
import ItemSales from "../pages/ItemSales";
import Loginterms from "./Loginterms";
import UserInfo from "./UserInfo";

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
          <Route path="/profile" element={<Myprofile />} />
          <Route path="/request" element={<Myrequest />} />
          <Route path="/modify" element={<UserModify />} />
          <Route path="/admin" element={<Mypage_Admin />} />
          <Route path="/admin/report" element={<Report />} />
          <Route path="/topicrequest/:category" element={<TopicRequest />} />
          <Route path="/requestlist" element={<Requestlist />} />
          <Route path="/requestlist/:id" element={<Requestdetail />} />
          <Route path="/vote" element={<CreateVote />} />
          <Route path="/view" element={<ViewUser />} />
          <Route path="/itemsales" element={<ItemSales />} />
          <Route path="/terms" element={<Loginterms />} />
          <Route path="/userinfo" element={<UserInfo />} />
        </Route>
        <Route path="/signupform/:email?" element={<Signupform />} />
      </Routes>
    </UserProvider>
  );
};
