import React from 'react';
import { Box, Button, ButtonGroup, Center, Flex, Grid, HStack, Input, Stack, VStack, Image } from '@chakra-ui/react';
import {FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default ()=>{
    return <Center>
    <Stack margin="100px 0" padding="50px 50px 60px" border="1px solid #0B0B0D" borderRadius="10px" width="500px">
        <Box fontSize='30px' padding="0 30px" textAlign="center" fontWeight='bold' marginBottom="20px">내 정보</Box>
        <Grid templateColumns="1fr 1fr" width="70%" margin="auto">
            <Box border="1px solid black" borderRadius="50%" width="50px" height="50px" margin="auto" ><Image /></Box>
            <Box>
                <Box textAlign="center" border="1px solid black" borderRadius="15px" marginBottom="5px">id</Box>
                <Box textAlign="center" border="1px solid black" borderRadius="15px">nickname</Box>
            </Box>
        </Grid>
        <Grid templateRows="1fr 1fr 1fr 1fr" gap="20px" margin="30px 0" >
            <Box textAlign="center" border="1px solid black" borderRadius="15px" margin="auto" width="70%">이메일</Box>
            <Box textAlign="center" border="1px solid black" borderRadius="15px" margin="auto" width="70%">응원팀</Box>
            <Box textAlign="center" border="1px solid black" borderRadius="15px" margin="auto" width="70%">전체승률</Box>
            <Box textAlign="center" border="1px solid black" borderRadius="15px" margin="auto" width="70%">실명인증</Box>
        </Grid>
        <Grid templateRows="1fr 1fr" justifyContent="center" gap="10px">
            <Button width="100px" border="1px solid black" borderRadius="10px">실명인증</Button>
            <Button width="100px" border="1px solid black" borderRadius="10px">정보수정</Button>
        </Grid>
    </Stack>
</Center>
}