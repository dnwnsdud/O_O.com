import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ()=>{
    const history = useHistory();
    useEffect (()=>{
        history.goBack();
    },[]) 
    return <Box>Loading....</Box>
}