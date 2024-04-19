import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
  Image,
  AspectRatio,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
          p={10}
        >
          <Flex justifyContent={"space-between"}>
            <Text fontWeight={"bold"} fontSize={"xl"}>
              {baDetails.title}
            </Text>
            <Text fontWeight={"bold"} fontSize={"xl"}>
              {formatDate(baDetails.createdAt)}
            </Text>
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
    </Box>
  );
};
