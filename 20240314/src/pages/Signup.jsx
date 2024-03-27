import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default () => {
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [Password2, setPassword2] = useState("");
  const [Nickname, setNickname] = useState("");
  const [Email, setEmail] = useState("");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [show2, setShow2] = React.useState(false);
  const handleClick2 = () => setShow2(!show2);
  const [userInfo, setUserInfo] = useState({});

  const handleIdChange = (e) => setId(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePassword2Change = (e) => setPassword2(e.target.value);
  const handleNicknameChange = (e) => setNickname(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const isError = Id === "";
  const isError2 = Password === "";
  const isError3 = Password2 === "";
  const isError4 = Nickname === "";
  const isError5 = Email === "";

  const back = () => {
    window.location.reload();
  };

  const onSubmitHandler = () => {
    if (Password !== Password2) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    let body = {
      id: Id,
      password: Password,
      nickname: Nickname,
      email: Email,
    };
  };
  return (
    <Center>
      <Stack
        margin="100px 0"
        padding="50px 50px 60px"
        border="1px solid #0B0B0D"
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
        <FormControl isInvalid={isError}>
          <FormLabel>아이디</FormLabel>
          <Input type="text" value={Id} onChange={handleIdChange} />
          {!isError ? (
            <FormHelperText>사용가능한 아이디 입니다.</FormHelperText>
          ) : (
            <FormErrorMessage>아이디를 입력하세요</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={isError2}>
          <FormLabel>패스워드</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              value={Password}
              onChange={handlePasswordChange}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {!isError2 ? (
            <FormHelperText>사용가능한 패스워드 입니다.</FormHelperText>
          ) : (
            <FormErrorMessage>패스워드를 입력하세요</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={isError3}>
          <FormLabel>패스워드 확인</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show2 ? "text" : "password"}
              value={Password2}
              onChange={handlePassword2Change}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick2}>
                {show2 ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {!isError3 ? (
            Password === Password2 ? (
              <FormHelperText>패스워드가 일치합니다.</FormHelperText>
            ) : (
              <FormHelperText>패스워드가 일치하지않습니다.</FormHelperText>
            )
          ) : (
            <FormErrorMessage>패스워드를 재입력하세요</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={isError4}>
          <FormLabel>닉네임</FormLabel>
          <Input type="text" value={Nickname} onChange={handleNicknameChange} />
          {!isError4 ? (
            <FormHelperText>사용가능한 닉네임입니다.</FormHelperText>
          ) : (
            <FormErrorMessage>닉네임을 입력하세요</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={isError5}>
          <FormLabel>이메일</FormLabel>
          <Input type="email" value={Email} onChange={handleEmailChange} />
          {!isError5 ? (
            <FormHelperText></FormHelperText>
          ) : (
            <FormErrorMessage>이메일을 입력하세요</FormErrorMessage>
          )}
        </FormControl>
        <Grid templateColumns="1fr 1fr" gap="5px" marginTop="20px">
          <Button onClick={back} border="1px solid #0B0B0D" borderRadius="10px">
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
        <Link
          width="100%"
          border="1px solid #0B0B0D"
          borderRadius="10px"
          textAlign="center"
          fontWeight="bold"
          padding="10px 0 "
          href="#"
        >
          로그인 이동
        </Link>
      </Stack>
    </Center>
  );
};
