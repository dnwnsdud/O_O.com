import { Box, Button, Center, Flex, FormControl, FormLabel, Grid, HStack, Input, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import emailjs from 'emailjs-com';


export default () => {
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [input, setInput] = useState('')

    const handleInputChange = (e) => setInput(e.target.value)




    const sendVerificationEmail = () => {
        // 이메일 보내기
        // 여기서 정의해야하는 것은 위에서 만든 메일 템플릿에 지정한 변수({{ }})에 대한 값을 담아줘야한다.
        const templateParams = {
            to_email: input,
            from_name: 'test',
            message: '인증되었습니다.'
        };

        emailjs
            .send(
                'service_9a86cta', // 서비스 ID
                'template_gy8pi7r', // 템플릿 ID
                templateParams,
                'jYpWycEr-Mhf19OyE', // public-key
            )
            .then((response) => {
                console.log('이메일이 성공적으로 보내졌습니다:', response);
                setIsEmailSent(true);
                // 이메일 전송 성공 처리 로직 추가
            })
            .catch((error) => {
                console.error('이메일 보내기 실패:', error);
                // 이메일 전송 실패 처리 로직 추가
            });
    };

    const handleVerification = () => {
        sendVerificationEmail();
    };
    return <Center>
        <Stack padding="50px 50px 60px" borderRadius="10px" width="500px">
            <Box fontSize='30px' padding="0 30px" textAlign="center" fontWeight='bold' marginBottom="20px">회원가입</Box>
            <Box>이메일로 회원가입</Box>
            <Flex>
                <Input type='email' value={input} onChange={handleInputChange} />
                <Box>
                    <Button border="1px solid #0B0B0D" borderRadius="10px" onClick={handleVerification}>
                        {isEmailSent ? (
                            <Text>
                                재전송
                            </Text>
                        ) : (
                            <Text>
                                회원가입
                            </Text>
                        )}
                    </Button>
                </Box>
            </Flex>
            {isEmailSent ? (
                <Text>
                    회원가입 이메일이 성공적으로 발송되었습니다. <br />메일함을
                    확인해주세요!
                </Text>
            ) : (
                <Text>
                    이메일을 입력해주세요!
                </Text>
            )}
        </Stack>

    </Center>

};
