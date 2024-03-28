import { AbsoluteCenter, Box, Button, Center, Divider, FormControl, FormLabel, Grid, HStack, Input, Link, Stack, Image, Flex } from "@chakra-ui/react";
import React from "react";

export default () => {
    return <Center  >
        <Stack margin="100px 0" padding="50px 50px 60px" borderRadius="10px" width="500px">
            <Box fontSize='30px' padding="0 30px" textAlign="center" fontWeight='bold' marginBottom="20px">로그인</Box>
            <FormControl>
                <FormLabel>아이디</FormLabel>
                <Input type='text' />
            </FormControl>
            <FormControl marginBottom="20px">
                <FormLabel>비밀번호</FormLabel>
                <Input type='password' />
            </FormControl>
            <Box position='relative' padding='5'>
                <Divider width="100%" />
                <AbsoluteCenter bg='gray.50' px='4'>
                    OR
                </AbsoluteCenter>
            </Box>
            <Box  padding="15px 0 30px" >
                <Box textAlign="center" padding="0 0 30px" fontWeight="bold">SNS 간편 로그인</Box>
                <Flex gap="100px" justifyContent="center">
                        <Box  w="50px">
                            <Image w="100%" h="100%" src="/static/img/kakao.png"/>
                        </Box>
                        <Box  w="50px">
                            <Image w="100%" h="100%" src="/static/img/naver.png"/>
                        </Box>
                </Flex>
            </Box>
            <Grid templateColumns="1fr 1fr" gap="5px">
                <Button border="1px solid #0B0B0D" borderRadius="10px">로그인</Button>
            </Grid>
            <Link width="100%" border="1px solid #0B0B0D" borderRadius="10px" textAlign="center" fontWeight="bold" padding="10px 0 " href='#'>회원가입</Link>
        </Stack>
    </Center>
}