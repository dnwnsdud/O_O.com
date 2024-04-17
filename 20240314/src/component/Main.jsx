import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Grid,
  Heading,
  Stack,
  Text
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainStore from "../pages/MainStore";
import Noticepost from "../pages/Noticepost";
import Bestpost from "./Bestpost";
import Vote from "./board/Vote";

moment.locale("ko");
export default () => {
  const location = useLocation();
  let date = new Date()
  let today = moment(date).format("YYYY-MM-DD");
  const category = location.pathname;
  let [todayVote, setTodayVote] = useState([]);
  useEffect(() => {
    fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify({
        category: category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
        setTodayVote(data);
      }).catch((e) => {
        setTodayVote("비었음")
      });
  }, [])
  let nav = useNavigate();
  return (
    <div>
      <Box
        bg={"#f7f7f8"}>
        <Stack
          bg={"#f7f7f8"}
          width={"45%"}
          margin={"auto"}
          spacing={8}
          h={"230vh"}
        >
          <Flex
            flexDirection={"column"}
            bg={"white"}
            h={"20%"}
            borderRadius={"10px"}
            boxShadow={"md"}
            mt='5'
          >
            <Text
              fontSize={"6xl"}
              fontWeight={"bold"}
              textAlign={"center"}
              color="#0B0B0D"
            >
              오늘의 O_O
            </Text>
            <Vote todayVote={todayVote} />
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
            h={"17%"}
            borderRadius={"10px"}
            boxShadow={"md"}
          >
            <Text
              ml='10'
              fontWeight={"bold"} mb='7' mt='5'
              onClick={() => {
                nav("/st");
              }}>아이템</Text>
            <MainStore />
          </Box>
        </Stack>
      </Box>
    </div>
  );
};
