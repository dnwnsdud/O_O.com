import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AspectRatio,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../hook/User";
import Coment from "./Coment";
import BlackModal from "./Modal";

export default () => {
  const [baDetails, setbaDetails] = useState();
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [Check, setCheck] = useState();
  const { user } = useContext(UserContext);
  let [isLoading, setIsLoading] = useState(true);
  const {
    isOpen: isModal,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const {
    isOpen: isAlert,
    onOpen: openAlert,
    onClose: closeAlert,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const location = useLocation();
  const nav = useNavigate();
  let id = location.pathname.slice(location.pathname.indexOf("=") + 1);

  const body = {
    id: id,
    like: "",
    dislike: "",
    email: user.email,
  };
  const Loading = (align, justify, width, height) => {
    return (
      <Flex alignItems={align || "center"} justifyItems={justify || "center"} width={width || "200%"} height={height || ""}>
        <Spinner
          m={"auto"}
          w={"80px"}
          h={"80px"}
          thickness="7px"
          speed="0.65s"
          color="black.500"
          size="xl"
        />
      </Flex>
    );
  };
  
  // 게시글 나오게 하는 곳
  useEffect(
    (e) => {
      fetch(`/api/boarddetail`, {
        method: "post",
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (res) {
            return res.json();
          } else {
            throw new Error(e);
          }
        })
        .then((data) => {
          // setCheck(data.success);
          // console.log(Check);
          if (data.success) {
            setCheck(false);
            setIsLoading(false);
          } else if (!data.success) {
            setCheck(true);
            setIsLoading(false);
          }
          setbaDetails(data.updatedDocument);
          setLikeCount(data.updatedDocument.like);
          setDislikeCount(data.updatedDocument.dislike);
          setIsLoading(false);
        });
    },
    [user.email, id]
  );
  // 좋아요 부분
  const like = (e) => {
    body.like = "like";
    e.preventDefault();
    fetch(`/api/boarddetail`, {
      method: "post",
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok && res.status === 400) {
          res.json().then((data) => {
            alert(data.message);
          });
          throw new Error("Server responded with 400");
        }
        return res.json();
      })
      .then((data) => {
        alert(data.message);
        setLikeCount(data.updatedDocument.like);
        setIsLoading(false);
      });
  };

  //비추천
  const dislike = (e) => {
    body.dislike = "dislike";
    e.preventDefault();
    fetch(`/api/boarddetail`, {
      method: "post",
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok && res.status === 400) {
          res.json().then((data) => {
            alert(data.message);
          });
          throw new Error("Server responded with 400");
        }
        return res.json();
      })
      .then((data) => {
        alert(data.message);
        setDislikeCount(data.updatedDocument.dislike);
        setIsLoading(false);
      });
  };

  //삭제
  const deleteSubmit = (e, userid, useremail, postId) => {
    e.preventDefault();
    console.log("삭제");
    console.log("내 아이디다" + userid);
    fetch("/api/boarddelete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ id: userid, email: useremail, postid: postId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          nav("/b");
        } else {
        }
      })
      .catch((error) => {
        console.error("아이템 삭제 실패 : ", error);
      });
  };

  // 시간 함수
  const getDayMinuteCounter = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };
  console.log(user);

  if (isLoading) {
    return Loading("center", "center", "100%", "100vh")
  }
  return (
    <Box bg="#f7f7f8">
      <Stack
        w={"35%"}
        m={"auto"}
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
          my="10"
        >
          <Box>
            <Link
              color={"darkblue"}
              fontWeight={"bold"}
              onClick={() => {
                if (baDetails.tap === "야구") {
                  nav("/b");
                } else if (baDetails.tap === "축구") {
                  nav("/s");
                } else if (baDetails.tap === "LOL") {
                  nav("/l");
                } else if (baDetails.tap === "사회") {
                  nav("/c");
                }
              }}
            >
              {baDetails.tap}
            </Link>
          </Box>
          <Flex justifyContent={"space-between"}>
            <Text fontWeight={"bold"} fontSize={"xl"} maxW={"350px"}>
              {baDetails.title}
            </Text>
            <Flex fontSize={"xs"} alignItems={"end"} gap="10px">
              <Menu>
                <MenuButton color={"#46a3d2"} fontWeight="bold">
                  {baDetails.nickname}
                </MenuButton>
                <MenuList minWidth="120px" fontWeight={"bold"}>
                  {user === "logout" ? (
                    <MenuItem disabled opacity={"0.5"} color="crimson">
                      신고하기
                    </MenuItem>
                  ) : (
                    <MenuItem color={"crimson"} onClick={openModal}>
                      신고하기
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() =>
                      nav(
                        `/view?nickname=${encodeURIComponent(
                          baDetails.nickname
                        )}`
                      )
                    }
                  >
                    유저정보 보기
                  </MenuItem>
                </MenuList>
              </Menu>
              <BlackModal
                isOpen={isModal}
                onClose={closeModal}
                postId={id}
                userEmail={baDetails.email}
              />
              <Text>{getDayMinuteCounter(baDetails.createdAt)}</Text>
            </Flex>
          </Flex>
          <Divider />
          <Box minH={"250px"} style={{ whiteSpace: "pre-wrap" }}>
            {baDetails.content}
            <br />
            <br />
            {baDetails.images && (
              <Box width="400px" height="auto" margin="auto">
                <Image
                  maxW={"60%"}
                  aspectRatio={"auto"}
                  src={`http://localhost:3000/${baDetails.images}`}
                  boxSize="100%"
                  objectFit="cover"
                  alt="이미지"
                  m="auto"
                />
              </Box>
            )}
            <br />
            {baDetails.videos && (
              <AspectRatio maxW="560px" ratio={1}>
                <iframe
                  title="비디오"
                  src={`http://localhost:3000/${baDetails.videos}`}
                  allowFullScreen
                />
              </AspectRatio>
            )}
          </Box>
          <Divider />

          <Flex justifyContent={"space-between !important"}>
            <Flex>
              <Button
                onClick={(e) => {
                  like(e);
                }}
                pr="1"
              >
                <FaRegThumbsUp />
              </Button>
              <Box alignContent="center" fontWeight={"bold"}>
                {likeCount}
              </Box>
              <Button onClick={(e) => dislike(e)} pr="1">
                <FaRegThumbsDown />
              </Button>
              <Box alignContent="center" fontWeight={"bold"}>
                {dislikeCount}
              </Box>
              {user === "logout" ? (
                ""
              ) : user.role === "admin" ? (
                ""
              ) : user.email !== baDetails.email ? (
                ""
              ) : !Check ? (
                <Button
                  onClick={() => {
                    nav(`/b/${id}/modify`);
                  }}
                >
                  수정
                </Button>
              ) : (
                ""
              )}
             
                  <Button
                    onClick={(e) =>
                      openAlert()
                    }
                  >
                    삭제
                  </Button>
            </Flex>
            <Button
              onClick={() => {
                if (baDetails.tap === "야구") {
                  nav("/b");
                } else if (baDetails.tap === "축구") {
                  nav("/s");
                } else if (baDetails.tap === "LOL") {
                  nav("/l");
                } else if (baDetails.tap === "사회") {
                  nav("/c");
                }
              }}
            >
              글 목록으로
            </Button>
          </Flex>
          <Coment user={user} />
        </Stack>
      </Stack>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={closeAlert}
        isOpen={isAlert}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>이 게시글을 삭제하시겠습니까?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>작성자만 삭제할 수 있습니다.</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={closeAlert}>
              취소
            </Button>
            {user !== "logout" &&
              (user.email === baDetails.email || user.role === "admin") && (
                <Button
                  sx={{
                    backgroundColor: "#53535f !important",
                    color: "#ffffff",
                  }}
                  onClick={(e) =>
                    deleteSubmit(e, baDetails._id, baDetails.email, id)
                  }
                >
                  삭제
                </Button>
              )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};
