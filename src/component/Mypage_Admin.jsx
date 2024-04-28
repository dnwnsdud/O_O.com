import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  List,
  ListItem,
  Stack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../hook/User";

export default () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState([]);
  const [writeData, setwriteData] = useState([]);
  const [commentData, setcommentData] = useState([]);
  const [render, setRender] = useState(false);
  const [baseballData, setBaseballData] = useState([]);
  const [lolData, setLolData] = useState([]);
  const [soccerData, setSoccerData] = useState([]);
  const [societyData, setSocietyData] = useState([]);
  let nav = useNavigate();

  useEffect(
    (e) => {
      if (user === null || user === "logout" || user.role === "user") {
        nav("/");
      } else {
        setRender(true);
      }
      try {
        fetch("/api/admin")
          .then((response) => {
            if (response) {
              return response.json();
            } else {
              throw new Error(e);
            }
          })
          .then((data) => {
            if (data) {
              setUserData(data.userdata);
              setwriteData(data.writedata);
              setcommentData(data.comments);
              if (user.role == "user" || user == "logout") {
                nav("/");
              }
            } else {
              alert(`사용자를 저장하는 동안 오류 발생:${data.error}`);
            }
          })
          .catch((error) => {});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      try {
        fetch("/api/requestlist")
          .then((res) => {
            if (res) {
              return res.json();
            } else {
              throw new Error("Network response was not ok");
            }
          })
          .then((data) => {
            if (data) {
              setBaseballData(data.baseball);
              setLolData(data.lol);
              setSoccerData(data.soccer);
              setSocietyData(data.society);
            } else {
              throw new Error("Data is empty");
            }
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    [user]
  );
  const Adminuserdelete = (userId, userEmail) => {
    let body = {
      id: userId,
      email: userEmail,
    };
    try {
      fetch("/api/adminuserdelete", {
        method: "post",
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (res) {
            return res.json();
          } else {
            throw new Error();
          }
        })
        .then((data) => {
          if (data) {
            setUserData(data);
          } else {
            alert("유저정보 삭제에 실패하였습니다.");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const Admincommentdelete = (writeId, writePostId) => {
    let body = {
      id: writeId,
      postId: writePostId,
    };
    try {
      fetch("/api/admincommentdelete", {
        method: "post",
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (res) {
            return res.json();
          } else {
            throw new Error();
          }
        })
        .then((data) => {
          if (data) {
            setcommentData(data);
          } else {
            alert("게시글 삭제에 실패하였습니다.");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    render && (
      <Center bg={"#f7f7f8"}>
        <Stack
          margin="100px 0"
          padding="50px 50px 60px"
          border="1px solid #e6e6ea"
          borderRadius="10px"
          width="1280px"
          bg="white"
        >
          <Box
            fontSize="30px"
            padding="0 30px"
            textAlign="center"
            fontWeight="bold"
            marginBottom="20px"
          >
            관리자페이지
          </Box>
          <Flex w="100%" justifyContent="right">
            <Grid templateColumns="1fr 1fr 1fr" w="350px" gap="10px">
              <Button
                onClick={() => {
                  nav("/requestlist");
                }}
                border="1px solid #e6e6ea"
                borderRadius="10px"
              >
                토픽요청
              </Button>
              <Button
                onClick={() => {
                  nav("/n");
                }}
                border="1px solid #e6e6ea"
                borderRadius="10px"
              >
                공지작성
              </Button>
              <Button
                onClick={() => {
                  nav("/admin/report");
                }}
                border="1px solid #e6e6ea"
                borderRadius="10px"
              >
                신고관리
              </Button>
            </Grid>
          </Flex>
          <Box>유저관리</Box>
          <Box border="1px solid #e6e6ea">
            <Grid
              templateColumns="1fr 1fr 1fr 1fr 1fr"
              borderBottom="1px solid #e6e6ea"
              textAlign="center"
              bg='#f7f7f8'
            >
              <Box paddingRight={"10px"}>아이디</Box>
              <Box paddingRight={"10px"}>닉네임</Box>
              <Box paddingRight={"12px"}>벌점</Box>
              <Box paddingRight={"17px"}>role</Box>
              <Box paddingRight={"30px"}>유저관리</Box>
            </Grid>
            <List height="100px" overflowX="auto">
              {userData.map((user) => {
                return (
                  <ListItem key={user._id} borderBottom="1px solid #e6e6ea">
                    <Grid
                      templateColumns="1fr 1fr 1fr 1fr 1fr"
                      textAlign="center"
                      alignItems="center"
                      padding="5px 0"
                    >
                      <Box
                        onClick={() => {
                          nav(
                            `/view?nickname=${encodeURIComponent(
                              user.nickname
                            )}`
                          );
                        }}
                        cursor={"pointer"}
                      >
                        {user.email}
                      </Box>
                      <Box
                        onClick={() => {
                          nav(
                            `/view?nickname=${encodeURIComponent(
                              user.nickname
                            )}`
                          );
                        }}
                        cursor={"pointer"}
                      >
                        {user.nickname}
                      </Box>
                      <Box>{user.penalty}</Box>
                      <Box>{user.role}</Box>
                      <Button
                        w="100px"
                        border="1px solid #e6e6ea"
                        borderRadius="10px"
                        margin="auto"
                        onClick={() => {
                          Adminuserdelete(user._id, user.email);
                        }}
                      >
                        유저탈퇴
                      </Button>
                    </Grid>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box>게시글관리</Box>
          <Box border="1px solid #e6e6ea">
            <Grid
              templateColumns="1fr 1fr 1fr"
              borderBottom="1px solid #e6e6ea"
              textAlign="center"
              bg='#f7f7f8'
            >
              <Box>아이디</Box>
              <Box paddingRight={"15px"}>게시글제목</Box>
              <Box paddingRight={"30px"}>게시글관리</Box>
            </Grid>
            <List height="100px" overflowX="auto">
              {writeData.map((write) => {
                return (
                  <ListItem key={write._id} borderBottom="1px solid #e6e6ea">
                    <Grid
                      templateColumns="1fr 1fr 1fr"
                      textAlign="center"
                      alignItems="center"
                      padding="5px 0"
                    >
                      <Box>{write.nickname}</Box>
                      <Link to={`/b/id=${write._id}`}>
                        <Box>{write.title}</Box>
                      </Link>
                      <Button
                        w="100px"
                        border="1px solid #e6e6ea"
                        borderRadius="10px"
                        margin="auto"
                        onClick={() => {
                          Adminwritedelete(write._id, write.email);
                        }}
                      >
                        게시글삭제
                      </Button>
                    </Grid>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box>댓글관리</Box>
          <Box border="1px solid #e6e6ea">
            <Grid
              templateColumns="1fr 1fr 1fr"
              borderBottom="1px solid #e6e6ea"
              textAlign="center"
              bg='#f7f7f8'
            >
              <Box>아이디</Box>
              <Box pr={"15px"}>댓글내용</Box>
              <Box pr={"30px"}>댓글관리</Box>
            </Grid>
            <List height="100px" overflowX="auto">
              {commentData.map((write) => {
                return (
                  <ListItem key={write._id} borderBottom="1px solid #e6e6ea">
                    <Grid
                      templateColumns="1fr 1fr 1fr"
                      textAlign="center"
                      alignItems="center"
                      padding="5px 0"
                    >
                      <Box>{write.nickname}</Box>
                      <Link to={`/b/id=${write.postId}`}>
                        <Box>{write.content}</Box>
                      </Link>
                      <Button
                        w="100px"
                        border="1px solid #e6e6ea"
                        borderRadius="10px"
                        margin="auto"
                        onClick={() => {
                          Admincommentdelete(write._id, write.postId);
                        }}
                      >
                        댓글삭제
                      </Button>
                    </Grid>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box>대기중인 토픽 요청</Box>
          <Grid templateColumns="1fr 1fr 1fr 1fr" textAlign="center" gap="15px">
            <Box border={"1px solid #e6e6ea"}>
              야구
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                minH={"50px"}
                borderTop={"1px solid #e6e6ea"}
              >
                {baseballData.length}건
              </Flex>
            </Box>
            <Box border={"1px solid #e6e6ea"}>
              LoL
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                minH={"50px"}
                borderTop={"1px solid #e6e6ea"}
              >
                {lolData.length}건
              </Flex>
            </Box>
            <Box border={"1px solid #e6e6ea"}>
              축구
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                minH={"50px"}
                borderTop={"1px solid #e6e6ea"}
              >
                {soccerData.length}건
              </Flex>
            </Box>
            <Box border={"1px solid #e6e6ea"}>
              사회
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                minH={"50px"}
                borderTop={"1px solid #e6e6ea"}
              >
                {societyData.length}건
              </Flex>
            </Box>
          </Grid>
          <Flex border="1px solid #e6e6ea" height="300px">
            <Box margin="auto" border="1px solid #e6e6ea">
              <Flex
                justifyContent="space-between"
                alignItems="center"
                width="300px"
              >
                <Box>일별 아이템 판매량</Box>
                <Button
                  border="1px solid #e6e6ea"
                  onClick={() => {
                    nav("/itemsales");
                  }}
                >
                  전체보기
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Stack>
      </Center>
    )
  );
};
