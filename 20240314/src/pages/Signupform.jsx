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
  FormControl,
  FormLabel,
  Grid,
  Input,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default () => {
  let nav = useNavigate();
  const [name, setName] = useState("");
  const [nickname, setnickname] = useState("");
  const [state, setState] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("email");

  const onNamedHandler = (e) => {
    setName(e.target.value);
  };
  const onNicknameHandler = (e) => {
    setnickname(e.target.value);
  };

  let body = {
    name: name,
    email: paramValue,
    nickname: nickname,
  };
  const onSubmitHandler = (e) => {
    //새로고침 방지
    e.preventDefault();

    fetch("/api/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        if (data.success === true) {
          nav("/");
        } else onOpen();
      })
      .catch((error) => {});
  };
  useEffect(() => {
    fetch("/api/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        if (data == "reject") {
          nav("/");
        } else if (data == "check") {
          setState(data);
          onOpen();
        }
      })
      .catch((error) => {});
  }, []);

  return (
    <Center>
      <Stack
        margin="100px 0"
        padding="50px 50px 60px"
        borderRadius="10px"
        width="500px"
      >
        <Box
          fontSize="30px"
          padding="0 30px"
          textAlign="center"
          fontWeight="bold"
          marginBottom="10px"
        >
          회원가입
        </Box>
        <FormControl>
          <FormLabel>이름</FormLabel>
          <Input type="text" onChange={onNamedHandler} maxLength={5} />
        </FormControl>
        <FormControl>
          <FormLabel>이메일</FormLabel>
          <Input type="email" placeholder={paramValue} readOnly={true} />
        </FormControl>
        <FormControl>
          <FormLabel>닉네임</FormLabel>
          <Input type="text" onChange={onNicknameHandler} maxLength={10} />
        </FormControl>

        <Grid templateColumns="1fr 1fr" gap="5px" marginTop="20px">
          <Button
            border="1px solid #0B0B0D"
            borderRadius="10px"
            onClick={() => {
              nav("/");
            }}
          >
            취소
          </Button>
          <Button
            type="submit"
            border="1px solid #0B0B0D"
            borderRadius="10px"
            onClick={onSubmitHandler}
          >
            회원가입
          </Button>
        </Grid>
      </Stack>

      {state === "check" ? (
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fillontSize="lg" fontWeight="bold">
                회원가입정보 확인
              </AlertDialogHeader>
              <AlertDialogBody>이미 가입된 회원입니다.</AlertDialogBody>
              <AlertDialogFooter>
                <Button
                  sx={{
                    backgroundColor: "#53535f !important",
                    color: "#ffffff",
                  }}
                  onClick={() => {
                    onClose();
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
      ) : (
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                기입정보 확인
              </AlertDialogHeader>
              <AlertDialogBody>
                회원가입 정보를 정확히 기입해주세요
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  sx={{
                    backgroundColor: "#53535f !important",
                    color: "#ffffff",
                  }}
                  onClick={onClose}
                  ml={3}
                >
                  돌아가기
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </Center>
  );
};
