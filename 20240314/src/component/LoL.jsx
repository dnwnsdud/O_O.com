import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Today from "./Today";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  HStack,
  VStack,
} from "@chakra-ui/react";
import Lolboard from "./board/Lolboard";

export default () => {
  return (
    <>
      <Box maxW="1280px" margin="auto">
        <Box h={20} bg="red" margin="20px 0"></Box>
        <Grid templateColumns="1fr 4fr 1fr" gap="20px">
          <Box>
            <Grid
              templateColumns="repeat(1 , 1fr)"
              gap="10px"
              padding="10px 30px"
            >
              <Button size="xs" bg="#e4002b" color="#ffffff">
                T1
              </Button>
              <Button size="xs" bg="#aa8a00" color="#ffffff">
                Geng
              </Button>
              <Button size="xs" bg="#ff6b01" color="#ffffff">
                한화생명
              </Button>
              <Button size="xs" bg="#000" color="#ffffff">
                KT
              </Button>
              <Button size="xs" bg="#0ec7b5" color="#ffffff">
                DK
              </Button>
              <Button size="xs" bg="#e73312" color="#ffffff">
                광동
              </Button>
              <Button size="xs" bg="#FFC900" color="#ffffff">
                피어엑스
              </Button>
              <Button size="xs" bg="#de2027" color="#ffffff">
                농심
              </Button>
              <Button size="xs" bg="#5a8dff" color="#ffffff">
                DRX
              </Button>
              <Button size="xs" bg="#00492b" color="#ffffff">
                브리온
              </Button>
            </Grid>
          </Box>
          <Box border="1px solid red">
            <Today />
            <Lolboard />
          </Box>
          <Box border="1px solid red">3</Box>
        </Grid>
      </Box>
    </>
  );
};