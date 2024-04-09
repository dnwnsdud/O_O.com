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
  Grid,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default ({ user }) => {
  const [baDetails, setbaDetails] = useState();
  const location = useLocation();
  const nav = useNavigate();
  let id = location.pathname.slice(location.pathname.indexOf("=") + 1);

  const body = {
    id: id,
    nickname: user.nickname,
    like: "",
  };

  // 게시글 나오게 하는 곳
  useEffect((e) => {
    fetch(`/api/coment`, {
      method: "post",
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
        console.log(data.post, "132134545");
        setbaDetails(data.post.content);
      });
  }, []);

  console.log(baDetails, "정보확인");

  return (
    <>
      <Grid
        templateColumns="2fr 5fr"
        padding="8px 0"
        gap="50px"
        color="#5181e3"
      >
        <Box>{user.nickname}</Box>
        <Box>{baDetails}</Box>
      </Grid>
    </>
  );
};
