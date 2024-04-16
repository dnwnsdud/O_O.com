import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
    let nav = useNavigate();
    console.log("hello");

    useEffect(() => {
        nav('/')
    }, [])

    return <>

        <Box>Loading....</Box>
    </>
}