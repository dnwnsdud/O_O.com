import { Box, Button, Grid } from '@chakra-ui/react';
import React from "react";
import Today from "../component/board/Today";
import BaBoard from "../component/board/Baboard";

export default () => {
  return (
    <>
      <Box maxW='1280px' margin="auto">
        <Box h={20} bg="red" margin="20px 0"></Box>
        <Grid templateColumns='1fr 4fr 1fr' gap="20px">
          <Box>
            <Grid templateColumns='repeat(1 , 1fr)' gap="10px" padding="10px 30px">
              <Button size='xs' bg="#C30452" color="#ffffff">LG</Button>
              <Button size='xs' bg="#041E42" color="#ffffff">롯데</Button>
              <Button size='xs' bg="#EA0029" color="#ffffff">기아</Button>
              <Button size='xs' bg="#CE0E2D" color="#ffffff">SSG</Button>
              <Button size='xs' bg="#000000" color="#ffffff">KT</Button>
              <Button size='xs' bg="#FF6600" color="#ffffff">한화</Button>
              <Button size='xs' bg="#074CA1" color="#ffffff">삼성</Button>
              <Button size='xs' bg="#131230" color="#ffffff">두산</Button>
              <Button size='xs' bg="#570514" color="#ffffff">키움</Button>
              <Button size='xs' bg="#315288" color="#ffffff">NC</Button>
            </Grid>
          </Box>
          <Box border="1px solid red">
            <Today />
            <BaBoard />
          </Box>
          <Box border="1px solid red">3</Box>
        </Grid>
      </Box>
    </>
  );
}