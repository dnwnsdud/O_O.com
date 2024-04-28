import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import emailjs from "emailjs-com";
import React, { useState } from "react";

export default () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => setInput(e.target.value);

  const sendVerificationEmail = () => {
    const templateParams = {
      to_email: input,
      from_name: "test",
      message: "인증되었습니다.",
    };

    emailjs
      .send(
        "service_qv4lsho",
        "template_5e82pqg",
        templateParams,
        "fZOCwLMoKiRXbyBVQ"
      )
      .then((response) => {
        setIsEmailSent(true);
      })
      .catch((error) => {
        console.error("이메일 보내기 실패:", error);
      });
  };

  const handleVerification = () => {
    sendVerificationEmail();
  };
  return (
    <Center>
      <Stack padding="50px 50px 60px" borderRadius="10px" width="500px">
        <Box
          fontSize="30px"
          padding="0 30px"
          textAlign="center"
          fontWeight="bold"
          marginBottom="20px"
        >
          회원가입
        </Box>
        <Box>이메일로 회원가입</Box>
        <Flex>
          <Input
            type="email"
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleVerification();
              }
            }}
          />
          <Box>
            <Button
              w="100px"
              border="1px solid #0B0B0D"
              borderRadius="10px"
              onClick={handleVerification}
            >
              {isEmailSent ? <Text>재전송</Text> : <Text>회원가입</Text>}
            </Button>
          </Box>
        </Flex>
        {isEmailSent ? (
          <Text>
            회원가입 이메일이 성공적으로 발송되었습니다. <br />
            메일함을 확인해주세요!
          </Text>
        ) : (
          <Text>이메일을 입력해주세요!</Text>
        )}
      </Stack>
    </Center>
  );
};
