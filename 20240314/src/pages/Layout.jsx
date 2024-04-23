import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import Header from "../component/Header";
import { Box } from "@chakra-ui/react";

export default () => {
    return (
        <>
            <Header />
            <Box pt='20' >
                <Outlet />
            </Box>
            <Footer />
        </>
    )
}