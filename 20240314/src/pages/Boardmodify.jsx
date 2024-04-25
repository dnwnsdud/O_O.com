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
  const [images, setImage] = useState("");
  const [videos, setVideo] = useState("");

  const handleInputChange = (e) => settitle(e.target.value);
  const handleInputChange2 = (e) => setcontent(e.target.value);

  const [uploadedImageName, setUploadedImageName] = useState();
  const [uploadedVideoName, setUploadedVideoName] = useState();
  const [itemImageError, setItemImageError] = useState(false);

  const isError = title === "";
  const isError2 = content === "";

  useEffect((e) => {
    let body = {
      id: id,
      content: content,
      title: title,
      images: images,
      videos: videos,
    };

    fetch(`/api/boardLoad`, {
      body: JSON.stringify(body),
      method: "post",
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
          settitle(data.title);
          setcontent(data.content);
          setImage(data.images);
          setVideo(data.videos);
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
      images: images,
      videos: videos,
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

  const clearImage = () => {
    setUploadedImageName("");
    setImage("");
  };

  const clearVideo = () => {
    setUploadedVideoName("");
    setVideo("");
  };

  const handleImagesChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("images", file);
      setImage(file.name);
      setUploadedImageName(file.name);

      fetch("/api/upload/images", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            const imagePath = data.mediapath;
            setImage(imagePath);
            console.log();
            alert("이미지 업로드 성공!!");
          } else {
            console.error("이미지 업로드 실패:", data.error);
            setUploadedImageName("");
          }
        })
        .catch((error) => {
          console.error("이미지 업로드 오류:", error);
          setUploadedImageName("");
        });
    }
  };

  const handleVideosChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("videos", file);
      setUploadedVideoName(file.name);

      fetch("/api/upload/videos", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            const videoPath = data.mediapath;
            setVideo(videoPath);
            alert("동영상 업로드 성공!!");
          } else {
            console.error("동영상 업로드 실패:", data.error);
            setUploadedVideoName("");
          }
        })
        .catch((error) => {
          console.error("동영상 업로드 오류:", error);
          setUploadedVideoName("");
        });
    }
  };

  const CustomFileInput = ({
    onChange,
    label,
    helperText,
    isInvalid,
    errorMessage,
    fileType,
    fileName,
    onClear,
  }) => {
    return (
      <FormControl isInvalid={isInvalid} mt="5">
        <FormLabel fontWeight={"bold"}>{label}</FormLabel>
        <Input type="file" name={fileType} onChange={onChange} hidden />
        <Button
          padding={"10px 20px 10px 20px"}
          onClick={() => document.getElementsByName(fileType)[0].click()}
          variant="outline"
        >
          파일 선택
        </Button>
        {fileName && (
          <Button
            padding={"10px 20px 10px 20px"}
            onClick={onClear}
            variant="outline"
            w={"30px"}
            h="30px"
            color={"#ffffff"}
            bg="#53535f !important"
            marginLeft={"20px"}
          >
            취소
          </Button>
        )}
        {!isInvalid ? (
          fileName ? (
            <FormHelperText color={"#E7141A"}>
              업로드된 파일: {fileName}
            </FormHelperText>
          ) : (
            <FormHelperText color={"darkblue"}>{helperText}</FormHelperText>
          )
        ) : (
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        )}
      </FormControl>
    );
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
          <Flex padding={"0 20px 20px 20px"}>
            <CustomFileInput
              onChange={handleImagesChange}
              label="이미지 업로드"
              helperText="이미지가 올라갑니다."
              isInvalid={itemImageError}
              errorMessage="이미지를 넣어주세요."
              fileType="images"
              fileName={uploadedImageName}
              onClear={clearImage}
            />
            <CustomFileInput
              onChange={handleVideosChange}
              label="동영상 업로드"
              helperText="동영상이 올라갑니다."
              isInvalid={itemImageError}
              errorMessage="동영상를 넣어주세요."
              fileType="videos"
              fileName={uploadedVideoName}
              onClear={clearVideo}
            />
          </Flex>
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
