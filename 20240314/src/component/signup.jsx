import { Box, Button, Center, FormControl, FormHelperText, FormLabel, Grid, HStack, Input, Stack } from "@chakra-ui/react";
import React from "react";

export default ()=>{
    return <Center  >
        <Stack margin="100px 0" padding="50px 50px 60px" border="1px solid #0B0B0D" borderRadius="10px" width="500px">
            <Box fontSize='30px' padding="0 30px" textAlign="center" fontWeight='bold' marginBottom="10px">회원가입</Box>
            <FormControl>
                <FormLabel>아이디</FormLabel>
                <Input type='text' isRequired/>
            </FormControl>
            <FormControl>
                <FormLabel>비밀번호</FormLabel>
                <Input type='password' isRequired/>
            </FormControl>
            <FormControl>
                <FormLabel>비밀번호확인</FormLabel>
                <Input type='password' isRequired/>
            </FormControl>
            <FormControl>
                <FormLabel>닉네임</FormLabel>
                <Input type='text' isRequired/>
            </FormControl>
            <FormControl>
                <FormLabel>이메일</FormLabel>
                <Input type='email' isRequired/>
            </FormControl>
            <Grid templateColumns="1fr 1fr" gap="5px" marginTop="20px">
                <Button border="1px solid #0B0B0D" borderRadius="10px">취소</Button>
                <Button type="submit" border="1px solid #0B0B0D" borderRadius="10px">회원가입</Button>
            </Grid>
            <Button border="1px solid #0B0B0D" borderRadius="10px">로그인</Button>
        </Stack>
    </Center>
}