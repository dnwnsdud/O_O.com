import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../component/fa";
import Header from "../component/Header";

export default () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}