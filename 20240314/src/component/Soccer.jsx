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
import Soboard from "./board/Soboard";

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
              <Button size="xs" color="#000">
                EPL
              </Button>
              <Button size="xs" color="#000">
                라리가
              </Button>
              <Button size="xs" color="#000">
                분데스리가
              </Button>
              <Button size="xs" color="#000">
                세리에
              </Button>
              <Button size="xs" color="#000">
                K리그
              </Button>
              <Button size="xs" color="#000">
                국대
              </Button>
            </Grid>
          </Box>
          <Box border="1px solid red">
            <Today />
            <Soboard />
          </Box>
          <Box border="1px solid red">3</Box>
        </Grid>
      </Box>
    </>
  );
};