import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import Header from "../component/Header";

export default () => {
  return (
    <>
      <Header />
        <Box pt="20">
          <Outlet />
        </Box>
      <Footer />
    </>
  );
};
