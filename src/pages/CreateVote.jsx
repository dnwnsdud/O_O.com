import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hook/User";

export default () => {
  const { user } = useContext(UserContext);
  const [render, setRender] = useState(false);
  const [category, setCategory] = useState("main");
  const [topic, setTopic] = useState("");
  const [lefttitle, setLefttitle] = useState("");
  const [leftcontent, setLeftcontent] = useState("");
  const [leftimage, setLeftimage] = useState("");
  const [righttitle, setRighttitle] = useState("");
  const [rightcontent, setRightcontent] = useState("");
  const [rightimage, setRightimage] = useState("");

  let nav = useNavigate();
  useEffect(() => {
    if (user === null || user === "logout" || user.role === "user") {
      nav("/");
    } else {
      setRender(true);
    }
  }, []);

  const onCategoryHandler = (e) => {
    setCategory(e.target.value);
  };
  const onTopicHandler = (e) => {
    setTopic(e.target.value);
  };
  const onLefttitleHandler = (e) => {
    setLefttitle(e.target.value);
  };
  const onLeftcontentHandler = (e) => {
    setLeftcontent(e.target.value);
  };

  const onRighttitleHandler = (e) => {
    setRighttitle(e.target.value);
  };
  const onRightcontentHandler = (e) => {
    setRightcontent(e.target.value);
  };

  const lefthandleImagesChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("images", file);

      fetch("/api/upload/images", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            const imagePath = data.mediapath;
            setLeftimage(imagePath);
          } else {
            console.error("이미지 업로드 실패:", data.error);
          }
        })
        .catch((error) => {
          console.error("이미지 업로드 오류:", error);
        });
    }
  };
  const righthandleImagesChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("images", file);

      fetch("/api/upload/images", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            const imagePath = data.mediapath;
            setRightimage(imagePath);
          } else {
            console.error("이미지 업로드 실패:", data.error);
          }
        })
        .catch((error) => {
          console.error("이미지 업로드 오류:", error);
        });
    }
  };

  let body = {
    category: category,
    title: topic,
    leftSide: {
      images: leftimage,
      title: lefttitle,
      content: leftcontent,
    },
    rightSide: {
      images: rightimage,
      title: righttitle,
      content: rightcontent,
    },
  };

  const onSubmitHandler = (e) => {
    fetch("/api/createvote", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        if (data.success == true) {
          nav("/");
        }
        throw new Error("data was not ok.");
      });
  };

  return (
    render && (
      <>
        <Center bg="#f7f7f8">
          <Box
            my="10"
            bg="#fff"
            w={"35%"}
            borderRadius={"10px"}
            border={"1px solid #f7f7f8"}
            shadow={"base"}
          >
            <Stack gap={6} w="80%" margin="auto" py="10">
              <Heading textAlign={"center"}>오늘의 O_O 작성</Heading>
              <FormControl>
                <FormLabel>카테고리</FormLabel>
                <Select defaultValue={"main"} onChange={onCategoryHandler}>
                  <option value="main">메인</option>
                  <option value="baseball">야구</option>
                  <option value="lol">LoL</option>
                  <option value="soccer">축구</option>
                  <option value="society">사회</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>주제</FormLabel>
                <Input type="text" onChange={onTopicHandler} />
              </FormControl>
              <Flex
                gap={4}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack gap={4}>
                  <FormControl isRequired>
                    <FormLabel>왼쪽 제목</FormLabel>
                    <Input type="text" onChange={onLefttitleHandler} />
                    <FormLabel>왼쪽 내용</FormLabel>
                    <Textarea resize={"none"} onChange={onLeftcontentHandler} />
                  </FormControl>
                  <FormLabel>왼쪽 이미지</FormLabel>
                  <Input type="file" onChange={lefthandleImagesChange} />
                </Stack>
                <Divider
                  borderColor={"#eaeaea"}
                  borderWidth={"1px"}
                  orientation="vertical"
                  h={"240px"}
                />
                <Stack gap={4}>
                  <FormControl isRequired>
                    <FormLabel>오른쪽 제목</FormLabel>
                    <Input type="text" onChange={onRighttitleHandler} />
                    <FormLabel>오른쪽 내용</FormLabel>
                    <Textarea
                      resize={"none"}
                      onChange={onRightcontentHandler}
                    />
                  </FormControl>
                  <FormLabel>오른쪽 이미지</FormLabel>
                  <Input type="file" onChange={righthandleImagesChange} />
                </Stack>
              </Flex>
              <Button onClick={onSubmitHandler}>작성</Button>
            </Stack>
          </Box>
        </Center>
      </>
    )
  );
};
