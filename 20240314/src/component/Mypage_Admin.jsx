import React from 'react';
import { Box, Button, ButtonGroup, Center, Flex, Grid, HStack, Input, Stack, VStack, Image, List } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default () => {
    return <Center>
        <Stack margin="100px 0" padding="50px 50px 60px" border="1px solid #0B0B0D" borderRadius="10px" width="1280px">
            <Box fontSize='30px' padding="0 30px" textAlign="center" fontWeight='bold' marginBottom="20px">관리자페이지</Box>
            <Flex w="100%" justifyContent="right"   >
                <Grid templateColumns="1fr 1fr" w="200px" gap="10px">
                    <Button border="1px solid black" borderRadius="10px" >공지작성</Button>
                    <Button border="1px solid black" borderRadius="10px" >서버관리</Button>
                </Grid>
            </Flex>
            <Box>유저관리</Box>
            <Box border="1px solid black">
                <Grid templateColumns="1fr 1fr 1fr" borderBottom="1px solid black" textAlign="center">
                    <Box>아이디</Box>
                    <Box>닉네임</Box>
                    <Box>유저관리</Box>
                </Grid>
                <List height="100px" >
                    <Grid templateColumns="1fr 1fr 1fr" textAlign="center" alignItems="center" padding="5px 0">
                        <Box>1</Box>
                        <Box>1</Box>
                        <Button w="100px" border="1px solid black" borderRadius="10px" margin="auto">유저탈퇴</Button>
                    </Grid>
                    <Box>1</Box>
                    <Box>1</Box>
                </List>
            </Box>
            <Box>게시글관리</Box>
            <Box border="1px solid black">
                <Grid templateColumns="1fr 1fr 1fr" borderBottom="1px solid black" textAlign="center">
                    <Box>아이디</Box>
                    <Box>게시글제목</Box>
                    <Box >게시글관리</Box>
                </Grid>
                <List height="100px" >
                    <Grid templateColumns="1fr 1fr 1fr" textAlign="center" alignItems="center" padding="5px 0">
                        <Box>1</Box>
                        <Box>1</Box>
                        <Button w="100px" border="1px solid black" borderRadius="10px" margin="auto">게시글삭제</Button>
                    </Grid>
                    <Box>1</Box>
                    <Box>1</Box>
                </List>
            </Box>
            <Box>토픽요청</Box>
            <Box border="1px solid black">
                <Grid templateColumns="1fr 1fr 1fr" borderBottom="1px solid black" textAlign="center">
                    <Box>아이디</Box>
                    <Box>요청내용</Box>
                    <Box>승인여부</Box>
                </Grid>
                <List height="100px" >
                    <Grid templateColumns="1fr 1fr 1fr" textAlign="center" alignItems="center" padding="5px 0">
                        <Box>1</Box>
                        <Box>1</Box>
                        <Flex justifyContent="center" gap="5px">
                            <Button w="100px" border="1px solid black" borderRadius="10px" >요청승인</Button>
                            <Button w="100px" border="1px solid black" borderRadius="10px" >요청반려</Button>
                        </Flex>
                    </Grid>
                    <Box>1</Box>
                    <Box>1</Box>
                </List>
            </Box>
            <Box>사용량</Box>
            <Grid templateColumns="1fr 1fr 1fr" textAlign="center" gap="15px">
                <Box width="382px" height="200px" border="1px solid black">유저수</Box>
                <Box width="382px" height="200px" border="1px solid black">회원수</Box>
                <Box width="382px" height="200px" border="1px solid black">토픽 요청 수</Box>
            </Grid>
            <Flex border="1px solid black" height="300px" >
                <Box margin="auto" border="1px solid black">
                    <Flex justifyContent="space-between" alignItems="center" width="300px" >
                        <Box>일별 아이템 판매량</Box>
                        <Button border="1px solid black">전체보기</Button>
                    </Flex>
                    <Box height="200px">그래프</Box>
                </Box>
            </Flex>
        </Stack>
    </Center>
}