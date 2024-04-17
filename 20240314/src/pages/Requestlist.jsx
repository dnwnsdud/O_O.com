import React from "react";
import {
  Box,
  Center,
  Flex,
  Grid,
  Stack
} from "@chakra-ui/react";

import Requestbaseball from "../component/Requestbaseball";
import Requestlol from "../component/Requestlol";
import Requestsoccer from "../component/Requestsoccer";
import Requestsociety from "../component/Requestsociety";

export default () => {

  return (
    <Box maxW="1300px" margin="auto">
      <Box padding="30px" fontSize="2rem" fontWeight="bold" textAlign="center">요청내역</Box>
      <Grid templateColumns={"1fr 1fr"} templateRows={"1fr 1fr"} gap="50px" paddingBottom="30px">
        <Box bg="#f6f6f6" borderRadius="0.5rem">
          <Requestbaseball />
        </Box>
        <Box bg="#f6f6f6" borderRadius="0.5rem">
          <Requestlol />
        </Box>
        <Box bg="#f6f6f6" borderRadius="0.5rem">
          <Requestsoccer />
        </Box>
        <Box bg="#f6f6f6" borderRadius="0.5rem">
          <Requestsociety />
        </Box>
      </Grid>
    </Box>
  );
};
