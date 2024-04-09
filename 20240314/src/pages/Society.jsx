import {
  Box,
  Grid
} from "@chakra-ui/react";
import React from "react";
import Today from "../component/board/Today";
import Ciboard from "../component/board/Ciboard";
import { useContext } from "react";
import { UserContext } from "../hook/User";

export default () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Box maxW="1280px" margin="auto">
        <Box h={20} bg="red" margin="20px 0"></Box>
        <Grid templateColumns="4fr 1fr" gap="20px">
          <Box border="1px solid red">
            <Today />
            <Ciboard />
          </Box>
          <Box border="1px solid red">3</Box>
        </Grid>
      </Box>
    </>
  );
};