import React from "react";
import {
  Box,
  Center,
  Grid,
  Stack
} from "@chakra-ui/react";

import Requestbaseball from "../component/Requestbaseball";
import Requestlol from "../component/Requestlol";
import Requestsoccer from "../component/Requestsoccer";
import Requestsociety from "../component/Requestsociety";

export default () => {

  return (
    <Stack>
      <Box margin={"auto"}>요청내역</Box>
      <Grid templateColumns={"1fr 1fr 1fr 1fr"}>
        <Requestbaseball />
        <Requestlol />
        <Requestsoccer/>
        <Requestsociety/>
      </Grid>
    </Stack>
  );
};
