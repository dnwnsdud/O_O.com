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
          <Box>광고</Box>
          <Box border="1px solid red">2</Box>
          <Box border="1px solid red">3</Box>
        </Grid>
      </Box>
    </>
  );
};