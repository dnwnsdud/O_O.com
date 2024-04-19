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
  Text,
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
  let date = new Date();
  let today = moment(date).format("YYYY-MM-DD");
  const category = location.pathname;
  let [todayVote, setTodayVote] = useState([]);
  let [topic, setTopic] = useState([]);
  useEffect(() => {
    fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify({
        category: category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodayVote(data.result);
        setTopic(data.result2.title);
      })
      .catch((e) => {
        setTodayVote("비었음");
        setTopic("비었음");
      });
  }, []);
  let nav = useNavigate();
  return (
    <div>
      <Box bg={"#f7f7f8"}>
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
            mt="5"
          >
            <Text
              fontSize={"6xl"}
              fontWeight={"bold"}
              textAlign={"center"}
              color="#0B0B0D"
            >
              오늘의 O_O
            </Text>
            <Vote todayVote={todayVote} main={category} />
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
            {topic !== "비었음" &&
              topic.map((item, index) => {
                console.log(topic);
                return (
                  <Card
                    size="md"
                    cursor={"pointer"}
                    _hover={{ bg: "gray.100" }}
                    onClick={() => {
                      if (index === 0) {
                        nav("/b");
                      } else if (index === 1) {
                        nav("/l");
                      } else if (index === 2) {
                        nav("/s");
                      } else if (index === 3) {
                        nav("/c");
                      }
                    }}
                  >
                    <CardHeader>
                      <Heading size="md">
                        {index === 0
                          ? "야구"
                          : index === 1
                          ? "LoL"
                          : index === 2
                          ? "축구"
                          : index === 3
                          ? "사회"
                          : "오류"}
                      </Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>{item}</Text>
                    </CardBody>
                  </Card>
                );
              })}
          </Grid>
          <Box
            cursor={"pointer"}
            bg={"white"}
            h={"17%"}
            borderRadius={"10px"}
            boxShadow={"md"}
          >
            <Text
              ml="10"
              fontWeight={"bold"}
              mb="7"
              mt="5"
              onClick={() => {
                nav("/st");
              }}
            >
              아이템
            </Text>
            <MainStore />
          </Box>
        </Stack>
      </Box>
    </div>
  );
};
