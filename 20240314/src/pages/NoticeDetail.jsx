import {
  Box,
  Button,
  Divider,
  Flex,
  Stack,
  Text,
  Grid,
  Center
} from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../hook/User";
import { useLocation, useNavigate } from "react-router-dom";
import Coment from "./Coment";

export default () => {
  const [baDetails, setbaDetails] = useState();
  const { user } = useContext(UserContext);

  const location = useLocation();
  const nav = useNavigate();
  let id = location.pathname.slice(location.pathname.indexOf("=") + 1);

  const body = {
    id: id,
  };

  // 게시글 나오게 하는 곳
  useEffect(
    (e) => {
      fetch(`/api/noticedetail`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (res) {
            return res.json();
          } else {
            throw new Error(e);
          }
        })
        .then((data) => {
          if (data) {
            setbaDetails(data);
          } else if (!data) {
            console.log("ASDasdasdasdasdas");
          }
          // setbaDetails(data.updatedDocument);
        });
    },
    [id]
  );

  // 시간 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  if (!baDetails) {
    return <div>Loading...</div>;
  }
  return (

    <Box bg={"#f7f7f8"}>
      <Stack
        w={"35%"}
        m={"auto"}
        direction={"column"}
        justifyContent={"center"}
      >
        <Stack
          my="20px"
          direction={"column"}
          justifyContent={"space-around"}
          borderRadius={"10px"}
          bg={"white"}
          boxShadow={"md"}
          padding="20px"
        >
          <Center fontWeight={"bold"} fontSize="30px" paddingBottom={"20px"}>공지사항</Center>
          <Flex justifyContent={"space-between"}>
            <Text fontWeight={"bold"} fontSize={"xl"} maxW="400px">
              {baDetails.title}
            </Text>
            <Grid templateRows={"1fr 1fr 1fr"} gap="1px">
              <Box textAlign={"center"} color={"#004EA1"} fontWeight="bold" fontSize={"13px"}>{baDetails.nickname}</Box>
              <Box textAlign={"center"} fontWeight={"bold"} fontSize={"13px"}>
                {formatDate(baDetails.createdAt)}
              </Box>
            </Grid>
          </Flex>
          <Divider />
          <Box
            marginTop={"20px"}
            minHeight="200px"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {baDetails.content}
          </Box>
          <Divider />

          <Flex justifyContent={"end"}>
            {user.role === "admin" && (
              <Button
                onClick={() => {
                  nav(`/n/${id}/modify`);
                }}
              >
                수정
              </Button>
            )}
          </Flex>
        </Stack>
      </Stack>
    </Box >
  );
};
