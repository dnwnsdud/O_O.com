import { TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  Heading,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CiBaseball } from "react-icons/ci";
import { IoGameControllerOutline, IoNewspaperOutline } from "react-icons/io5";
import { PiSoccerBallFill } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import MainStore from "../pages/MainStore";
import Noticepost from "../pages/Noticepost";
import Bestpost from "./Bestpost";
import Vote from "./board/Vote";

const Loading = (align, justify, width, height) => {
  return (
    <Flex alignItems={align || "center"} justifyItems={justify || "center"} width={width || "200%"} height={height || ""}>
      <Spinner
        m={"auto"}
        w={"80px"}
        h={"80px"}
        thickness="10px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
};

export default () => {
  const handleScroll = () => {
    if (window.scrollY > 500) setIsHalf(true);
    else if (window.scrollY < 500) setIsHalf(false);
    else return;
  };
  const location = useLocation();
  const category = location.pathname;
  let [isLoading, setIsLoading] = useState(true);
  let [todayVote, setTodayVote] = useState([]);
  let [topic, setTopic] = useState([]);
  let [isHalf, setIsHalf] = useState(false);
  const toTop = () => {
    window.scrollTo(0, 0);
    setIsHalf(false);
    return null;
  };
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
        setIsLoading(false);
      })
      .catch((e) => {
        setTodayVote("비었음");
        setTopic("비었음");
        setIsLoading(false);
      });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  let nav = useNavigate();
  return (
    <Box bg={"#f7f7f8"}>
      <Box bg={"#f7f7f8"}>
        <Stack
          bg={"#f7f7f8"}
          width={"45%"}
          margin={"auto"}
          spacing={8}
          h={"190vh"}
          justifyContent={"space-evenly"}
          pb="8"
        >
          <Flex
            flexDirection={"column"}
            bg={"white"}
            h={"17%"}
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
            {isLoading && Loading("center", "center", "100%", "100%")}
            {!isLoading && <Vote todayVote={todayVote} main={category} />}
          </Flex>
          <Noticepost />
          <Bestpost />
          <Grid
            flexWrap={"wrap"}
            gap={5}
            h={"20%"}
            templateColumns={"1fr 1fr"}
            justifyContent={"space-between"}
          >
            {isLoading && <Loading />}
            {!isLoading &&
              topic !== "비었음" &&
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
                        {index === 0 ? (
                          <Flex gap={1}>
                            야구
                            <CiBaseball />
                          </Flex>
                        ) : index === 1 ? (
                          <Flex gap={1}>
                            LoL
                            <IoGameControllerOutline />
                          </Flex>
                        ) : index === 2 ? (
                          <Flex gap={1}>
                            축구 <PiSoccerBallFill />
                          </Flex>
                        ) : index === 3 ? (
                          <Flex gap={1}>
                            사회 <IoNewspaperOutline />
                          </Flex>
                        ) : (
                          "오류"
                        )}
                      </Heading>
                    </CardHeader>
                    <CardBody>
                      <Text textAlign={"center"}>{item}</Text>
                    </CardBody>
                  </Card>
                );
              })}
          </Grid>
          <Box
            cursor={"pointer"}
            bg={"white"}
            h={"13%"}
            borderRadius={"10px"}
            boxShadow={"md"}
          >
            <Text
              ml="10"
              fontWeight={"bold"}
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
      {isHalf && (
        <TriangleUpIcon
          cursor={"pointer"}
          boxSize={10}
          border={"2px solid"}
          borderColor={"gray.300"}
          p={"7px"}
          w={"40px"}
          h={"40px"}
          position={"fixed"}
          right={"23%"}
          top={"75%"}
          borderRadius={"50%"}
          onClick={toTop}
          _hover={{ bg: "black", color: "white", borderColor: "gray.100" }}
        />
      )}
    </Box>
  );
};
