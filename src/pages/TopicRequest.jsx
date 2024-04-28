import {
  Button,
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
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../hook/User";

export default () => {
  const location = useLocation();
  let id = location.pathname.slice(location.pathname.indexOf("=") + 1);
  const { user } = useContext(UserContext);
  const [render, setRender] = useState(false);
  const [category, setCategory] = useState(id);
  const [topic, setTopic] = useState("");
  const [lefttitle, setLefttitle] = useState("");
  const [leftcontent, setLeftcontent] = useState("");
  const [leftimage, setLeftimage] = useState("");
  const [righttitle, setRighttitle] = useState("");
  const [rightcontent, setRightcontent] = useState("");
  const [rightimage, setRightimage] = useState("");

  useEffect(() => {
    if (user === null || user === "logout") {
      nav("/");
    } else {
      setRender(true);
    }
  }, []);

  let nav = useNavigate();

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
    user: user.nickname,
    email: user.email,
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
    fetch("/api/topicrequest ", {
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
        if (data.success) {
          nav("/");
        } else {
          throw new Error("data was not ok.");
        }
      });
  };

  return (
    render && (
      <>
        <Stack bg={"#f7f7f8"}>
          <Stack
            width={"45%"}
            margin={"20px auto"}
            spacing={8}
            h={"80vh"}
            bg={"#ffffff"}
            borderRadius={"0.5rem"}
          >
            <Heading textAlign={"center"} padding="20px 10px 0 10px">
              오늘의 O_O 작성
            </Heading>
            <FormControl isRequired>
              <FormLabel paddingLeft={"20px"}>카테고리</FormLabel>
              <Select
                marginLeft={"20px"}
                w="200px"
                defaultValue={id}
                onChange={onCategoryHandler}
              >
                <option value="baseball">야구</option>
                <option value="lol">LoL</option>
                <option value="soccer">축구</option>
                <option value="society">사회</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel paddingLeft={"20px"}>주제</FormLabel>
              <Input
                marginLeft={"20px"}
                w="95%"
                type="text"
                onChange={onTopicHandler}
              />
            </FormControl>
            <Flex
              padding={"0 20px"}
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
                  <Textarea resize={"none"} onChange={onRightcontentHandler} />
                </FormControl>
                <FormLabel>오른쪽 이미지</FormLabel>
                <Input type="file" onChange={righthandleImagesChange} />
              </Stack>
            </Flex>
            <Flex justifyContent={"end"} paddingRight="30px" gap={"10px"}>
              <Button
                color={"#ffffff"}
                backgroundColor="#53535f !important"
                padding={"10px"}
                w="80px"
                h="40px"
                onClick={() => {
                  window.history.back();
                }}
              >
                이전으로
              </Button>
              <Button
                color={"#ffffff"}
                backgroundColor="#53535f !important"
                padding={"10px"}
                w="80px"
                h="40px"
                onClick={onSubmitHandler}
              >
                작성
              </Button>
            </Flex>
          </Stack>
        </Stack>
      </>
    )
  );
};