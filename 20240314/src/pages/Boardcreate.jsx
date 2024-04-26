import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hook/User";

export default () => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [team, setTeam] = useState("O_O");
  const [images, setImage] = useState("");
  const [videos, setVideo] = useState("");
  const [tap, setTap] = useState("");
  const [teamsOptions, setTeamsOptions] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [render, setRender] = useState(false);
  const cancelRef = React.useRef();

  const handleInputChange = (e) => {
    const newTitle = e.target.value;
    if (newTitle.length < 20) {
      setTitle(newTitle);
    } else {
      setTitle(newTitle.slice(0, 20));
      onOpen();
    }
  };
  const handleInputChange2 = (e) => setContent(e.target.value);
  const handleInputChange3 = (e) => setTeam(e.target.value);
  const handleInputChange4 = (e) => setTap(e.target.value);
  const [itemImageError, setItemImageError] = useState(false);

  const [uploadedImageName, setUploadedImageName] = useState("");
  const [uploadedVideoName, setUploadedVideoName] = useState("");

  const isError = title === "";
  const isError2 = content === "";
  const isError3 = tap === "";

  const nav = useNavigate();
  useEffect(() => {
    if (user === null || user === "logout") {
      nav("/");
    } else {
      setRender(true);
    }
  }, []);
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
    e.preventDefault();
    fetch("/api/boardcreate", {
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
        if (data.success) {
          switch (data.create.tap) {
            case "야구":
              nav("/b");
              break;
            case "LOL":
              nav("/l");
              break;
            case "축구":
              nav("/s");
              break;
            case "사회":
              nav("/c");
              break;
          }
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
      formData.append("images", file);
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
  const clearImage = () => {
    setUploadedImageName("");
    setImage("");
  };

  const clearVideo = () => {
    setUploadedVideoName("");
    setVideo("");
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
    render && (
      <Stack bg={"#f7f7f8"}>
        <Stack
          w={"35%"}
          margin="30px auto"
          direction={"column"}
          justifyContent={"center"}
        >
          <Stack
            height={"80%"}
            direction={"column"}
            justifyContent={"space-around"}
            borderRadius={"10px"}
            bg={"white"}
            boxShadow={"base"}
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
                  <FormErrorMessage>
                    카테고리를 꼭 선택해주세요!
                  </FormErrorMessage>
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
                borderBottomWidth={"1px"}
                borderColor={"#e6e6ea"}
                marginTop={"5px"}
                marginBottom={"5px"}
              />
              <FormControl isInvalid={isError} isRequired>
                <FormLabel>제목</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={handleInputChange}
                  maxLength="20"
                />
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
                borderBottomWidth={"1px"}
                borderColor={"#e6e6ea"}
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
                borderBottomWidth={"1px"}
                borderColor={"#e6e6ea"}
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
                onClick={onSubmitHandler}
              >
                작성
              </Button>
            </Flex>
          </Stack>
        </Stack>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fillontSize="lg" fontWeight="bold">
                글자 수 제한
              </AlertDialogHeader>
              <AlertDialogBody>
                제목은 최대 20자까지 입력 가능합니다.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button
                  sx={{
                    backgroundColor: "#53535f !important",
                    color: "#ffffff",
                  }}
                  onClick={() => {
                    onClose();
                  }}
                  ml={3}
                >
                  돌아가기
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Stack>
    )
  );
};
