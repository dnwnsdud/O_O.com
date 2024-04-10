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
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default ({ user }) => {
  const [content, setContent] = useState("");
  const [images, setImage] = useState("");

  const handleInputChange2 = (e) => setContent(e.target.value);

  const [itemImageError, setItemImageError] = useState(false);

  const isError2 = content === "";

  const nav = useNavigate();

  let body = {
    comment: [{ nickname: user.nickname, content: content }],
    // email: user.email,
    // images: images,
  };

  const onSubmitHandler = (e) => {
    //새로고침 방지
    e.preventDefault();
    fetch(
      "/api/commentcreate",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
      console.log(body)
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          console.log("댓글 성공!");
          // 나중에 경로 생각좀
        } else {
          console.log(data.error);
          alert(`사용자를 저장하는 동안 오류 발생:${data.error}`);
        }
      })
      .catch((error) => {});
  };

  const handleImagesChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("videos", file);

      fetch("/api/upload/images", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log("이미지 업로드 성공");
            const imagePath = data.mediapath;
            console.log(data);
            console.log("이미지경로: " + imagePath);
            setImage(imagePath);
          } else {
            console.error("이미지 업로드 실패:", data.error);
          }
        })
        .catch((error) => {
          console.error("이미지 업로드 오류:", error);
        });
    }
  };

  return (
    <>
      <Divider
        orientation="horizontal"
        borderBottomWidth={"2px"}
        borderColor={"#666666"}
        marginTop={"50px"}
        marginBottom={"5px"}
      />
      <Stack>
        <Text fontSize={"xl"} color={"#0b0b0d"} fontWeight={"bold"}>
          댓글 작성
        </Text>
      </Stack>
      <Box>
        <Divider
          orientation="horizontal"
          borderBottomWidth={"2px"}
          borderColor={"#666666"}
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
            h={"150px"}
          />
          {!isError2 ? (
            <FormHelperText color={"#3182ce"}>
              입력하신 내용으로 요청이 됩니다.
            </FormHelperText>
          ) : (
            <FormErrorMessage>해당 칸을 입력해주세요</FormErrorMessage>
          )}
        </FormControl>
        <FormControl marginTop="20px">
          <Input
            value={"nickname"}
            placeholder={user.nickname}
            readOnly
            hidden
          />
        </FormControl>
        {/* <FormControl isInvalid={itemImageError} mt="5">
          <FormLabel>이미지 업로드</FormLabel>
          <Input type="file" name="images" onChange={handleImagesChange} />
          {!itemImageError ? (
            <FormHelperText color={"darkblue"}>
              이미지가 올라갑니다.
            </FormHelperText>
          ) : (
            <FormErrorMessage>이미지를 넣어주세요.</FormErrorMessage>
          )}
        </FormControl> */}
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
    </>
  );
};
