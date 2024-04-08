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
  Select
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [team, setTeam] = useState("");
  const [images, setImage] = useState('');
  const [videos, setVideo] = useState('');
  const [userData, setUserData] = useState([]);


  const [nickname, setNick] = useState("");
  const handleInputChange = (e) => setTitle(e.target.value);
  const handleInputChange2 = (e) => setContent(e.target.value);
  const handleInputChange3 = (e) => setTeam(e.target.value);
  const [itemImageError, setItemImageError] = useState(false);

  const isError = title === "";
  const isError2 = content === "";

  const nav = useNavigate();

  useEffect((e) => {
    try {
      fetch("/api/mypage")
        .then((response) => {
          if (response) {
            console.log(response);
            return response.json();
          } else {
            throw new Error(e);
          }
        })
        .then((data) => {
          if (data) {
            console.log("이게 먼저오는거면 나는 어쩌라는건데 진짜 다 죽자");
            setUserData(data);
          } else {
            alert(`사용자를 저장하는 동안 오류 발생:${data.error}`);
          }
        })
        .catch((error) => { });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  let body = {
    title: title,
    content: content,
    nickname: userData.nickname || "nick",
    email: userData.email,
    team: team,
    images: images,
    videos: videos
  };

  const onSubmitHandler = (e) => {
    //새로고침 방지
    e.preventDefault();
    fetch("/api/boardcreate", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }, console.log(body))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          nav("/b");
        } else {
          console.log(data.error);
          alert(`사용자를 저장하는 동안 오류 발생:${data.error}`);
        }
      })
      .catch((error) => { });
  };

  const handleImagesChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('videos', file);

      fetch('/api/upload/images', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            console.log('이미지 업로드 성공');
            const imagePath = data.mediapath;
            console.log(data);
            console.log('이미지경로: ' + imagePath);
            setImage(imagePath)
          } else {
            console.error('이미지 업로드 실패:', data.error);
          }
        })
        .catch(error => {
          console.error('이미지 업로드 오류:', error);
        });
    }
  };

  const handleVideosChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('images', file);

      fetch('/api/upload/videos', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            console.log('이미지 업로드 성공');
            const videoPath = data.mediapath;
            console.log(data);
            console.log('이미지경로: ' + imagePath);
            setVideo(videoPath)
          } else {
            console.error('이미지 업로드 실패:', data.error);
          }
        })
        .catch(error => {
          console.error('이미지 업로드 오류:', error);
        });
    }
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
          <FormControl>
            <Select placeholder='Select option' value={team} onChange={handleInputChange3}>
              <option>기아</option>
              <option>키움</option>
              <option>롯데</option>
              <option>한화</option>
              <option>두산</option>
              <option>삼성</option>
              <option>KT</option>
              <option>LG</option>
              <option>SSG</option>
              <option>NC</option>
            </Select>
          </FormControl>
          <FormControl isInvalid={itemImageError} mt='5'>
            <FormLabel>이미지 업로드</FormLabel>
            <Input type='file' name='images' onChange={handleImagesChange} />
            {!itemImageError ? (
              <FormHelperText color={'darkblue'}>이미지가 올라갑니다.</FormHelperText>
            ) : (
              <FormErrorMessage>
                이미지를 넣어주세요.
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={itemImageError} mt='5'>
            <FormLabel>동영상 업로드</FormLabel>
            <Input type='file' name='videos' onChange={handleVideosChange} />
            {!itemImageError ? (
              <FormHelperText color={'darkblue'}>동영상이 올라갑니다.</FormHelperText>
            ) : (
              <FormErrorMessage>
                동영상를 넣어주세요.
              </FormErrorMessage>
            )}
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
