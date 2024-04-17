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
import React, { useState, useContext } from "react";
import { UserContext } from "../hook/User";
import { useNavigate } from "react-router-dom";

export default () => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [team, setTeam] = useState("O_O");
  const [images, setImage] = useState("");
  const [videos, setVideo] = useState("");
  const [tap, setTap] = useState("");
  const [teamsOptions, setTeamsOptions] = useState([]);

  const handleInputChange = (e) => setTitle(e.target.value);
  const handleInputChange2 = (e) => setContent(e.target.value);
  const handleInputChange3 = (e) => setTeam(e.target.value);
  const handleInputChange4 = (e) => setTap(e.target.value);
  const [itemImageError, setItemImageError] = useState(false);

  const isError = title === "";
  const isError2 = content === "";
  const isError3 = tap === "";

  const nav = useNavigate();

  let body = {
    title: title,
    content: content,
    nickname: user.nickname,
    email: user.email,
    team: team,
    images: images,
    videos: videos,
    tap: tap,
  };

  const onSubmitHandler = (e) => {
    //새로고침 방지
    e.preventDefault();
    fetch(
      "/api/boardcreate",
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
          switch (data.create.tap) {
            case '야구':
              nav("/b");
              break;
            case 'LOL':
              nav("/l");
              break;
            case '축구':
              nav("/s");
              break;
            case '사회':
              nav("/c");
              break;
          }
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
      formData.append("images", file);

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

  const handleVideosChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("videos", file);

      fetch("/api/upload/videos", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log("동영상 업로드 성공");
            const videoPath = data.mediapath;
            console.log(data);
            console.log("동영상경로: " + videoPath);
            setVideo(videoPath);
          } else {
            console.error("동영상 업로드 실패:", data.error);
          }
        })
        .catch((error) => {
          console.error("동영상 업로드 오류:", error);
        });
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setTap(selectedCategory);
    updateTeams(selectedCategory);
  };

  const updateTeams = (category) => {
    switch (category) {
      case "야구":
        setTeamsOptions([
          "기아",
          "롯데",
          "LG",
          "두산",
          "키움",
          "SSG",
          "NC",
          "한화",
          "삼성",
          "KT",
        ]);
        break;
      case "축구":
        setTeamsOptions([
          "EPL",
          "라리가",
          "분데스리가",
          "세리에",
          "K리그",
          "국대",
        ]);
        break;
      case "LOL":
        setTeamsOptions([
          "T1",
          "DRX",
          "Gen.G",
          "한화생명",
          "KT",
          "DK",
          "광동",
          "피어엑스",
          "농심",
          "브리온",
        ]);
        break;
      case "사회":
        setTeamsOptions([
          "잡담",
          "정치",
          "연애",
          "여행",
          "취미",
          "경제",
          "역사",
        ]);
        break;
      default:
        setTeamsOptions([]);
        break;
    }
  };

  return (
    <Stack w={"35%"} m={"auto"} direction={"column"} justifyContent={"center"}>
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
          <FormControl isInvalid={isError3} isRequired>
            <FormLabel>카테고리</FormLabel>
            <Select
              placeholder="카테고리 선택"
              value={tap}
              onChange={handleCategoryChange}
            >
              <option>야구</option>
              <option>축구</option>
              <option>LOL</option>
              <option>사회</option>
            </Select>
            {!isError3 ? (
              <FormHelperText color={"#3182ce"}>
                선택한 카테고리로 저장됩니다
              </FormHelperText>
            ) : (
              <FormErrorMessage>카테고리를 꼭 선택해주세요!</FormErrorMessage>
            )}
          </FormControl>
          {teamsOptions.length > 0 && (
            <FormControl marginBottom="20px">
              <FormLabel>응원팀</FormLabel>
              <Select
                placeholder="응원팀 선택"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                disabled={!teamsOptions.length}
              >
                {teamsOptions.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}
          <Divider
            orientation="horizontal"
            borderBottomWidth={"2px"}
            borderColor={"#0b0b0d"}
            marginTop={"5px"}
            marginBottom={"5px"}
          />
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
          <FormControl marginTop="20px">
            <Input
              value={"nickname"}
              placeholder={user.nickname}
              readOnly
              hidden
            />
          </FormControl>
          <FormControl isInvalid={itemImageError} mt="5">
            <FormLabel>이미지 업로드</FormLabel>
            <Input type="file" name="images" onChange={handleImagesChange} />
            {!itemImageError ? (
              <FormHelperText color={"darkblue"}>
                이미지가 올라갑니다.
              </FormHelperText>
            ) : (
              <FormErrorMessage>이미지를 넣어주세요.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={itemImageError} mt="5">
            <FormLabel>동영상 업로드</FormLabel>
            <Input type="file" name="videos" onChange={handleVideosChange} />
            {!itemImageError ? (
              <FormHelperText color={"darkblue"}>
                동영상이 올라갑니다.
              </FormHelperText>
            ) : (
              <FormErrorMessage>동영상를 넣어주세요.</FormErrorMessage>
            )}
          </FormControl>
        </Box>
        <Flex justifyContent={"end"} gap={3}>
          <Button border={"2px solid"} borderColor={"rgba(11,11,13,.6)"} onClick={()=>{
            window.history.back();
          }}>
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
