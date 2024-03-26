import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  HStack,
  VStack,
} from "@chakra-ui/react";

export default () => {
  return (
    <>
      <Box maxW="1280px" margin="auto">
        <Grid templateColumns="1fr 4fr 1fr" gap="20px">
          <Box marginTop="100px" border="1px solid black" h="450px">광고</Box>
          <Box border="1px solid red" margin="20px 0">
            <Box border="1px solid black" w="100%" h="200px" marginBottom="10px">달력</Box>
            <Box border="1px solid black" w="100%" h="200px" marginBottom="10px" textAlign="center" fontWeight="bold" fontSize="1.5 rem">결과</Box>
            <Flex gap="10px" padding="10px">
              <Box border="1px solid black" w="100%" h="150px" textAlign="center">야구</Box>
              <Box border="1px solid black" w="100%" h="150px" textAlign="center">LOL</Box>
              <Box border="1px solid black" w="100%" h="150px" textAlign="center">축구</Box>
              <Box border="1px solid black" w="100%" h="150px" textAlign="center">사회</Box>
            </Flex>
          </Box>
          <Box marginTop="100px" border="1px solid black" h="450px">광고</Box>
        </Grid>
      </Box>
    </>
  );
};