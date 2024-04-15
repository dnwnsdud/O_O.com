import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  Heading,
  Link,
  List,
  ListItem,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Noticepost from "../pages/Noticepost";
import Bestpost from "./Bestpost";
import MainVote from "./board/MainVote";

export default () => {

  let nav = useNavigate();
  return (
    <div>
      <Stack
        bg={"gray.50"}
        width={"45%"}
        margin={"auto"}
        spacing={8}
        h={"180vh"}
      >
        <Flex
          flexDirection={"column"}
          bg={"white"}
          h={"20%"}
          borderRadius={"10px"}
          boxShadow={"md"}
        >
          <Text
            fontSize={"6xl"}
            fontWeight={"bold"}
            textAlign={"center"}
            color="#0B0B0D"
          >
            오늘의 O_O
          </Text>
          <MainVote />
          <Button
            border={"2px solid #0b0b0d"}
            onClick={() => {
              nav("/r");
            }}
          >
            이전결과
          </Button>
        </Flex>
        <Divider orientation="horizontal" />
        <Noticepost />
        <Bestpost />
        <Grid
          flexWrap={"wrap"}
          gap={5}
          h={"20%"}
          templateColumns={"1fr 1fr"}
          justifyContent={"space-between"}
        >
          <Card
            size="md"
            cursor={"pointer"}
            _hover={{ bg: "black" }}
            onClick={() => {
              nav("/b");
            }}
          >
            <CardHeader>
              <Heading size="md">야구</Heading>
            </CardHeader>
            <CardBody>
              <Text>야구</Text>
            </CardBody>
          </Card>
          <Card
            size="md"
            cursor={"pointer"}
            _hover={{ bg: "black" }}
            onClick={() => {
              nav("/l");
            }}
          >
            <CardHeader>
              <Heading size="md"> LoL</Heading>
            </CardHeader>
            <CardBody>
              <Text>LoL</Text>
            </CardBody>
          </Card>
          <Card
            size="md"
            cursor={"pointer"}
            _hover={{ bg: "black" }}
            onClick={() => {
              nav("/s");
            }}
          >
            <CardHeader>
              <Heading size="md">축구</Heading>
            </CardHeader>
            <CardBody>
              <Text>축구</Text>
            </CardBody>
          </Card>
          <Card
            size="md"
            cursor={"pointer"}
            _hover={{ bg: "black" }}
            onClick={() => {
              nav("/c");
            }}
          >
            <CardHeader>
              <Heading size="md"> 사회</Heading>
            </CardHeader>
            <CardBody>
              <Text>사회</Text>
            </CardBody>
          </Card>
        </Grid>
        <Box
          cursor={"pointer"}
          bg={"white"}
          h={"20%"}
          borderRadius={"10px"}
          boxShadow={"md"}
          onClick={() => {
            nav("/st");
          }}
        >
          포인트
        </Box>
      </Stack>
    </div>
  );
};
