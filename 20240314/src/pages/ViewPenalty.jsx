import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  List,
  ListItem,
  Text,
  Stack,
  Center,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { useLocation, useSearchParams } from "react-router-dom";

export default () => {
  const [userData, setUserData] = useState([]);
  const [searchParams] = useSearchParams();
  const nickname = searchParams.get("nickname");

  useEffect(() => {
    if (nickname) {
      const encodedNickname = encodeURIComponent(nickname);
      const url = `/api/viewuserpenalty?nickname=${encodedNickname}`;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .then((data) => {
          if (data) {
            const sortedData = data.data
            setUserData(sortedData);
          } else {
            throw new Error("Data is empty");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [nickname]);

  return (
    <>
      <Center fontWeight={'bold'} fontSize='30px'>{nickname}님의 정보</Center>
      <Box padding={"20px 20px 0 20px"} fontWeight={"bold"}>
        "{nickname}" 님의 점수
      </Box>
      <Flex
        justifyContent="center"
        flexDir={"column"}
        padding="10px 50px 10px"
        border="1px solid #e6e6ea"
        boxShadow="base"
        borderRadius="10px"
        width="100%"
        height={"100px"}
      >
        <Box height={"100%"}>
          <List>
            <Grid
              templateColumns=" 1fr 1fr 1fr 1fr"
              borderBottom="1px solid #e6e6ea"
              textAlign="center"
              padding={"8px 0"}
              fontWeight="bold"
              fontSize={"1.2rem"}
            >
              <Box>승리</Box>
              <Box>패배</Box>
              <Box>승률</Box>
              <Box>벌점</Box>
            </Grid>
            {userData.map((user) => {
              const winRate = user.rating.win + user.rating.lose > 0
                ? ((user.rating.win / (user.rating.win + user.rating.lose)) * 100).toFixed(2)
                : 0;
              const winRateColor = parseFloat(winRate) >= 50 ? "#004EA1" : "#E7141A";
              return (
                <ListItem key={user._id}>
                  <Grid
                    paddingTop={"10px"}
                    templateColumns="1fr 1fr 1fr 1fr"
                    textAlign="center"
                    fontSize={"15px"}
                  >
                    <Box color={"#004EA1"}>{user.rating.win}</Box>
                    <Box color={"#E7141A"}>{user.rating.lose}</Box>
                    <Box fontWeight={"bold"} color={winRateColor}>{winRate}</Box>
                    <Box fontWeight={"bold"}>{user.penalty}</Box>
                  </Grid>
                </ListItem>
              )
            })}
          </List>
        </Box>
      </Flex>
    </>
  );
};
