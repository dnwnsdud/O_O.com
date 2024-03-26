import { Box, Button, Center, FormControl, FormLabel, Grid, HStack, Input, Stack } from "@chakra-ui/react";
import React from "react";

export default ()=>{
    return <Center  >
        <Stack margin="100px 0" padding="50px 50px 60px" border="1px solid #0B0B0D" borderRadius="10px" width="500px">
            <Box fontSize='30px' padding="0 30px" textAlign="center" fontWeight='bold' marginBottom="20px">로그인</Box>
            <FormControl>
                <FormLabel>아이디</FormLabel>
                <Input type='text' />
            </FormControl>
            <FormControl marginBottom="20px">
                <FormLabel>비밀번호</FormLabel>
                <Input type='password' />
            </FormControl>
            <Grid templateColumns="1fr 1fr" gap="5px">
                <Button border="1px solid #0B0B0D" borderRadius="10px">취소</Button>
                <Button border="1px solid #0B0B0D" borderRadius="10px">로그인</Button>
            </Grid>
            <Button border="1px solid #0B0B0D" borderRadius="10px">회원가입</Button>
        </Stack>
    </Center>
}