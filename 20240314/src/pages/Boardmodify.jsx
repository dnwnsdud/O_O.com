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
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default () => {
  const nav = useNavigate();
  const { id } = useParams();

  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");

  const handleInputChange = (e) => settitle(e.target.value);
  const handleInputChange2 = (e) => setcontent(e.target.value);

  const isError = title === "";
  const isError2 = content === "";

  const onNamedHandler = (e) => {
    settitle(e.target.value);
  };
  const onNicknameHandler = (e) => {
    setcontent(e.target.value);
  };
  useEffect((e) => {
    let body = {
      id: id,
      content: content,
      title: title,
    };
    fetch(`/api/boardLoad`, {
      body: JSON.stringify(body),
      method: "post",
    })
      .then((res) => {
        if (res) {
          console.log(body);
          console.log("성공하였습니다.");
          return res.json();
        } else {
          throw new Error(e);
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
          settitle(data.title);
          setcontent(data.content);
          console.log(data);
        } else {
          alert(`사용자 정보를 불러오는 오류:${data.error}`);
        }
      })
      .catch((error) => {
        console.error("패치 에러", error);
      });
  }, []);

  const onSubmitHandler = (e) => {
    //새로고침 방지
    e.preventDefault();

    let body = {
      id: id,
      title: title,
      content: content,
    };

    // 수정
    fetch(`/api/boardmodify`, { method: "post", body: JSON.stringify(body) })
      .then((response) => {
        if (response) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        if (data.success) {
          nav("/b");
        } else {
          console.log(data.error);
          alert(`사용자를 저장하는 동안 오류 발생:${data.error}`);
        }
      })
      .catch((error) => {});
  };

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
            게시글 수정
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
        </Box>
        <Flex justifyContent={"end"} gap={3}>
          <Button
            border={"2px solid"}
            borderColor={"rgba(11,11,13,.6)"}
            onClick={() => {
              window.history.back();
            }}
          >
            취소
          </Button>
          <Button
            border={"2px solid"}
            borderColor={"rgba(11,11,13,.6)"}
            onClick={(e) => {
              onSubmitHandler(e);
            }}
          >
            수정
          </Button>
        </Flex>
      </Stack>
    </Stack>
  );
};
