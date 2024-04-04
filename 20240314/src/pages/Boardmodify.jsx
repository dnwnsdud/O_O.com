import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  let nav = useNavigate();
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");

  const onNamedHandler = (e) => {
    settitle(e.target.value);
  };
  const onNicknameHandler = (e) => {
    setcontent(e.target.value);
  };

  const onSubmitHandler = (e) => {
    //새로고침 방지
    e.preventDefault();

    let body = {
      title: title,
      content: content,
    };

    fetch("/api/boardmodify", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          nav("/b");
        } else {
          console.log(data.error);
          alert(`사용자를 저장하는 동안 오류 발생:${data.error}`);
        }
      })
      .catch((error) => {});
  };

  useEffect((e) => {
    fetch(`/api/boarddetail`, { method: "post", body: id })
      .then((res) => {
        if (res) {
          console.log("성공하였습니다.");
          return res.json();
        } else {
          throw new Error(e);
        }
      })
      .then((data) => {
        console.log(data);
        setbaDetails(data);
        setLikeCount(data.like);
        console.log(data.like);
      });
  }, []);

  return (
       <Stack
      w={"35%"}
      m={"auto"}
      height={"100vh"}
      direction={"column"}
      justifyContent={"center"}
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
          <Text fontSize={"4xl"} color={"#0b0b0d"} fontWeight={"bold"}>
            게시글 작성
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
          <FormControl>
            <Input value={"nickname"} placeholder={nickname} readOnly hidden />
          </FormControl>
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
  );
};
