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
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hook/User";

export default () => {
  const { user } = useContext(UserContext);
  const [render, setRender] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleInputChange = (e) => setTitle(e.target.value);
  const handleInputChange2 = (e) => setContent(e.target.value);

  const isError = title === "";
  const isError2 = content === "";

  const nav = useNavigate();
  useEffect(() => {
    if (user === null || user === "logout" || user.role === "user") {
      nav("/");
    } else {
      setRender(true);
    }
  }, []);
  let body = {
    title: title,
    content: content,
    nickname: user.nickname,
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    fetch("/api/noticewrite", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          nav("/n");
        } else {
          console.log(data.error);
          alert(`사용자를 저장하는 동안 오류 발생:${data.error}`);
        }
      })
      .catch((error) => {});
  };

  return (
    render && (
      <Stack
        w={"35%"}
        m={"auto"}
        direction={"column"}
        justifyContent={"center"}
        minH={"700px"}
      >
        <Stack
          height={"80%"}
          direction={"column"}
          justifyContent={"space-around"}
          borderRadius={"10px"}
          bg={"white"}
          boxShadow={"md"}
          p={10}
        >
          <Center>
            <Text fontSize={"2xl"} color={"#0b0b0d"} fontWeight={"bold"}>
              공지사항 작성
            </Text>
          </Center>
          <Box>
            <FormControl isInvalid={isError} isRequired>
              <FormLabel>제목</FormLabel>
              <Input type="text" value={title} onChange={handleInputChange} />
              {!isError ? (
                <FormHelperText color={"#3182ce"}>
                  입력하신 내용으로 요청이 됩니다.
                </FormHelperText>
              ) : (
                <FormErrorMessage>해당 칸을 입력해주세요</FormErrorMessage>
              )}
            </FormControl>
            <Divider
              orientation="horizontal"
              borderBottomWidth={"2px"}
              borderColor={"#0b0b0d"}
              marginTop={"5px"}
              marginBottom={"5px"}
            />
            <FormControl isInvalid={isError2} isRequired>
              <FormLabel>내용</FormLabel>
              <Textarea
                value={content}
                onChange={handleInputChange2}
                size={"lg"}
                resize={"none"}
                h={"200px"}
              />
              {!isError2 ? (
                <FormHelperText color={"#3182ce"}>
                  입력하신 내용으로 요청이 됩니다.
                </FormHelperText>
              ) : (
                <FormErrorMessage>해당 칸을 입력해주세요</FormErrorMessage>
              )}
            </FormControl>
            <Divider
              orientation="horizontal"
              borderBottomWidth={"2px"}
              borderColor={"#0b0b0d"}
              marginTop={"5px"}
              marginBottom={"5px"}
            />
          </Box>
          <Flex justifyContent={"end"} gap={3}>
            <Button border={"2px solid"} borderColor={"rgba(11,11,13,.6)"}>
              취소
            </Button>
            <Button
              border={"2px solid"}
              borderColor={"rgba(11,11,13,.6)"}
              onClick={onSubmitHandler}
            >
              작성
            </Button>
          </Flex>
        </Stack>
      </Stack>
    )
  );
};
