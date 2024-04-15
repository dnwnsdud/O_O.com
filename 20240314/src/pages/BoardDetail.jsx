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
  Image,
  AspectRatio,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure
} from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../hook/User";
import { useLocation, useNavigate } from "react-router-dom";
import Coment from "./Coment";
import BlackModal from "./BlackModal";

export default () => {
  const [baDetails, setbaDetails] = useState();
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [Check, setCheck] = useState();
  const { user } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const location = useLocation();
  const nav = useNavigate();
  let id = location.pathname.slice(location.pathname.indexOf("=") + 1);

  const body = {
    id: id,
    like: "",
    dislike: "",
    email: user.email,
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
            console.log("ㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㅇㅁㄴ");
          } else if (!data.success) {
            setCheck(true);
            console.log("ASDasdasdasdasdas");
          }
          setbaDetails(data.updatedDocument);
          setLikeCount(data.updatedDocument.like);
          setDislikeCount(data.updatedDocument.dislike);
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
        console.log(data, "확인");
        setLikeCount(data.updatedDocument.like);
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
        console.log(data, "확인");
        setDislikeCount(data.updatedDocument.dislike);
      });
  };

  //삭제
  const deleteSubmit = (e, userid, useremail, postId) => {
    e.preventDefault();
    console.log("삭제");
    console.log("내 아이디다" + userid);
    if (confirm("이 게시글을 삭제하시겠습니까?")) {
      fetch("/api/boarddelete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ id: userid, email: useremail, postid:postId }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            alert("삭제되었습니다.");
            nav("/b");
          } else {
            alert("작성자만 삭제할 수 있습니다");
            console.log("삭제 실패얌");
          }
        })
        .catch((error) => {
          console.error("아이템 삭제 실패 : ", error);
        });
    } else {
      console.log("삭제 취소됨");
    }
  };

  // 시간 함수
  const getDayMinuteCounter = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  if (!baDetails) {
    return <div>Loading...</div>;
  }
  return (
    <>
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
          boxShadow={"md"}
          p={10}
        >
          <Box display="none">{baDetails.tap}</Box>
          <Flex justifyContent={"space-between"}>
            <Text fontWeight={"bold"} fontSize={"xl"}>
              {baDetails.title}
            </Text>
            <Flex fontSize={"xs"} alignItems={"end"} gap="10px">
              <Menu>
                <MenuButton fontWeight="bold">{baDetails.nickname}</MenuButton>
                <MenuList>
                  <MenuItem onClick={onOpen}>신고하기</MenuItem>
                  <MenuItem>작성글 보기</MenuItem>
                </MenuList>
              </Menu>
              <BlackModal isOpen={isOpen} onClose={onClose} postId={id} />
              <Text>{getDayMinuteCounter(baDetails.createdAt)}</Text>
            </Flex>
          </Flex>
          <Divider />
          <Box style={{ whiteSpace: "pre-wrap" }}>{baDetails.content}</Box>
          <Divider />
          {baDetails.images && (
            <Box
              border="1px solid black"
              borderRadius="50%"
              width="400px"
              height="auto"
              margin="auto"
            >
              <Image
                src={`http://localhost:3000/${baDetails.images}`}
                boxSize="100%"
                objectFit="cover"
                alt="아이템 이미지"
                m="auto"
              />
            </Box>
          )}
          {baDetails.videos && (
            <AspectRatio maxW="560px" ratio={1}>
              <iframe
                title="비디오"
                src={`http://localhost:3000/${baDetails.videos}`}
                allowFullScreen
              />
            </AspectRatio>
          )}

          <Flex>
            <Button
              onClick={(e) => {
                like(e);
              }}
            >
              추천~!
            </Button>
            <Box alignContent="center">{likeCount}</Box>
            <Button onClick={(e) => dislike(e)}>비추천!</Button>
            <Box alignContent="center">{dislikeCount}</Box>
            {user === "logout" ? "" : user.role === "admin"? "": !Check ? (
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
            {user==="logout" ? "" : user.role === "admin" ? (
              <Button onClick={(e) => deleteSubmit(e, baDetails._id, baDetails.email, id)}>
                삭제
              </Button>
            ) : !Check ? (
              <Button onClick={(e) => deleteSubmit(e, baDetails._id, baDetails.email, id)}>
                삭제
              </Button>
            ) : (
              ""
            )}
          </Flex>
          <Coment user={user} />
          {/* <Coments user={user} /> */}
        </Stack>
      </Stack>
    </>
  );
};
