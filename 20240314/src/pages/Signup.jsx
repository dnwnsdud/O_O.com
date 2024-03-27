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
    return <Center  >
        <Stack margin="100px 0" padding="50px 50px 60px" borderRadius="10px" width="500px">
            <Box fontSize='30px' padding="0 30px" textAlign="center" fontWeight='bold' marginBottom="10px">회원가입</Box>
            <FormControl isInvalid={isError}>
                <FormLabel>아이디</FormLabel>
                <Input type='text' isRequired />
            </FormControl>
            <FormControl>
                <FormLabel>비밀번호</FormLabel>
                <Input type='password' isRequired />
            </FormControl>
            <FormControl>
                <FormLabel>비밀번호확인</FormLabel>
                <Input type='password' isRequired />
            </FormControl>
            <FormControl isInvalid={isError4}>
                <FormLabel>닉네임</FormLabel>
                <Input type='text' isRequired />
            </FormControl>
            <FormControl isInvalid={isError5}>
                <FormLabel>이메일</FormLabel>
                <Input type='email' isRequired />
            </FormControl>
            <Grid templateColumns="1fr 1fr" gap="5px" marginTop="20px">
                <Button border="1px solid #0B0B0D" borderRadius="10px">취소</Button>
                <Button type="submit" border="1px solid #0B0B0D" borderRadius="10px">회원가입</Button>
            </Grid>
            <Link width="100%" border="1px solid #0B0B0D" borderRadius="10px" textAlign="center" fontWeight="bold" padding="10px 0 " href='#'>로그인 이동</Link>
        </Stack>
    </Center>
  );
};
