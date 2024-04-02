import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
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