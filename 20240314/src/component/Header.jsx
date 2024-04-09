import {
  Box,
  Button,
  Flex,
  Grid,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import UserModal from "./UserModal";
import { UserContext } from "../hook/User";

export default () => {
  const { user, setUser } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fill, fillChange] = useState("#0B0B0D");
  const [cl, clChange] = useState(true);
  let nav = useNavigate();

  const logout = () => {
    fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
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
          alert("로그아웃되었습니다.");
          nav("/");
        } else {
          alert("로그아웃에 실패했습니다.");
          nav("/");
        }
      });
  };

  useEffect((e) => {
    fetch("/api/logincheck")
      .then((res) => {
        if (res) {
          console.log("성공하였습니다.");
          return res.json();
        } else {
          throw new Error(e);
        }
      })
      .then((data) => {
        if (data.role == "user" || data.role == "admin") {
          console.log("로그인하려고요");
          setUser(data);
          localStorage.setItem("login", 1);
        }
      });
  }, []);
  console.log("항상 찍는 자리", user);
  return (
    <Box borderBottom="3px solid #0B0B0D" pt={1} pb={1}>
      <Grid maxWidth="55%" margin="auto" templateColumns="1fr 3fr 2fr">
        <Flex
          w="150px"
          h={20}
          cursor={"pointer"}
          justifyContent={"center"}
          onClick={() => {
            nav("/");
          }}
          onMouseEnter={() => {
            fillChange("");
            clChange(!cl);
          }}
          onMouseLeave={() => {
            fillChange("#0B0B0D");
            clChange(!cl);
          }}
        >
          <Logo width="100%" height="100%" fill={fill} cl={cl} />
        </Flex>
        <Stack direction="row" spacing={5} align="center">
          <Button
            w="50px"
            h="10"
            display="flex"
            justifyContent="center"
            bg=""
            onClick={() => {
              nav("/b");
            }}
          >
            야구
          </Button>
          <Button
            w="50px"
            h="10"
            display="flex"
            justifyContent="center"
            bg=""
            onClick={() => {
              nav("/l");
            }}
          >
            LOL
          </Button>
          <Button
            w="50px"
            h="10"
            display="flex"
            justifyContent="center"
            bg=""
            onClick={() => {
              nav("/s");
            }}
          >
            축구
          </Button>
          <Button
            w="50px"
            h="10"
            display="flex"
            justifyContent="center"
            bg=""
            onClick={() => {
              nav("/c");
            }}
          >
            사회
          </Button>
          <Button
            w="50px"
            h="10"
            display="flex"
            justifyContent="center"
            bg=""
            onClick={() => {
              nav("/r");
            }}
          >
            결과
          </Button>
        </Stack>
        <Stack
          direction="row"
          spacing={5}
          align="center"
          justify="flex-end"
          paddingRight={20}
        >
          <Button
            size="xs"
            onClick={() => {
              nav("/n");
            }}
          >
            공지사항
          </Button>
          <Button
            size="xs"
            onClick={() => {
              nav("/st");
            }}
          >
            상점
          </Button>
          {user !== "logout" ? (
            user.role === "user" ? (
              <Button
                size="xs"
                onClick={() => {
                  nav("/mypage");
                }}
              >
                마이페이지
              </Button>
            ) : (
              <Button
                size="xs"
                onClick={() => {
                  nav("/mypage");
                }}
              >
                관리자페이지
              </Button>
            )
          ) : (
            ""
          )}
          {user !== "logout" ? (
            <Button
              type="submit"
              size="xs"
              onClick={() => {
                logout();
                setUser("logout");
              }}
            >
              로그아웃
            </Button>
          ) : (
            <Button size="xs" onClick={onOpen}>
              로그인
            </Button>
          )}
        </Stack>
      </Grid>
      <UserModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
