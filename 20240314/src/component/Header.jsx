import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hook/User";
import Logo from "./Logo";
import UserModal from "./UserModal";

export default () => {
  const { user, setUser } = useContext(UserContext);
  const [fill, fillChange] = useState("#0B0B0D");
  const [cl, clChange] = useState(true);
  let nav = useNavigate();
  const [isRotated, setIsRotated] = useState(false);
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

  let [error, setError] = useState("");

  const handleMenuClick = () => {
    setIsRotated(!isRotated);
  };
  const logout = () => {
    fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response) {
          return response.json();
        } else {
          throw new Error(e);
        }
      })
      .then((data) => {
        if (data) {
          setError("success");
          openAlert();
          a;
        } else {
          setError("fail");
          openAlert();
        }
      });
  };

  useEffect((e) => {
    fetch("/api/logincheck")
      .then((res) => {
        if (res) {
          return res.json();
        } else {
          throw new Error(e);
        }
      })
      .then((data) => {
        if (data.role == "user" || data.role == "admin") {
          setUser(data);
        }
      });
  }, []);
  return (
    <Box w="100%" position={"fixed"} bg="#fff" zIndex={"9999"} top="0">
      <Grid maxWidth="55%" margin="auto" templateColumns="1fr 3fr 2fr">
        <Flex
          w="60px"
          h={20}
          cursor={"pointer"}
          justifyContent={"center"}
          alignItems={"center"}
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
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  size="xs"
                  onClick={handleMenuClick}
                >
                  마이페이지
                </MenuButton>
                <MenuList minW={0}>
                  <MenuItem
                    onClick={() => {
                      nav("/profile");
                    }}
                    fontSize="xs"
                    width="150px"
                  >
                    내 프로필
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      nav("/request");
                    }}
                    fontSize="xs"
                    width="150px"
                  >
                    내 요청사항
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                size="xs"
                onClick={() => {
                  nav("/admin");
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
            <Button size="xs" onClick={openModal}>
              로그인
            </Button>
          )}
        </Stack>
      </Grid>
      <UserModal isOpen={isModal} onClose={closeModal} />
      <AlertDialog
        isOpen={isAlert}
        leastDestructiveRef={cancelRef}
        onClose={closeAlert}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fillontSize="lg" fontWeight="bold">
              {error == "success" ? "로그아웃 성공" : "로그아웃 실패"}
            </AlertDialogHeader>
            <AlertDialogBody>
              {error == "success"
                ? "로그아웃에 성공하였습니다."
                : "로그아웃 실패하였습니다"}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                sx={{
                  backgroundColor: "#53535f !important",
                  color: "#ffffff",
                }}
                onClick={() => {
                  closeAlert();
                  nav("/");
                }}
                ml={3}
              >
                돌아가기
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};
