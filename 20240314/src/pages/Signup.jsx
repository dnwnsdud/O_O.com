import { Box, Button, Center, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, HStack, Input, Link, Stack } from "@chakra-ui/react";
import React, { useState } from "react";

export default ()=>{
    const [input, setInput] = useState('')
    const [input2, setInput2] = useState('')
    const [input3, setInput3] = useState('')
    const [input4, setInput4] = useState('')
    const [input5, setInput5] = useState('')

    const handleInputChange = (e) => setInput(e.target.value)
    const handleInputChange2 = (e) => setInput2(e.target.value)
    const handleInputChange3 = (e) => setInput3(e.target.value)
    const handleInputChange4 = (e) => setInput4(e.target.value)
    const handleInputChange5 = (e) => setInput5(e.target.value)

    const isError = input === ''
    const isError2 = input2 === ''
    const isError3 = input3 === ''
    const isError4 = input4 === ''
    const isError5 = input5 === ''
    
    return <Center  >
        <Stack margin="100px 0" padding="50px 50px 60px" border="1px solid #0B0B0D" borderRadius="10px" width="500px">
            <Box fontSize='30px' padding="0 30px" textAlign="center" fontWeight='bold' marginBottom="10px">회원가입</Box>
            <FormControl isInvalid={isError}>
                <FormLabel>아이디</FormLabel>
                <Input type='text' value={input} onChange={handleInputChange} />
                    {!isError ? (
                        <FormHelperText>
                        사용가능한 아이디 입니다.
                        </FormHelperText>
                                ) : (
                        <FormErrorMessage>아이디를 입력하세요</FormErrorMessage>
                     )}
            </FormControl>
            <FormControl isInvalid={isError2}>
                <FormLabel>패스워드</FormLabel>
                <Input type='password' value={input2} onChange={handleInputChange2} />
                    {!isError2 ? (
                        <FormHelperText>
                        사용가능한 패스워드 입니다.
                        </FormHelperText>
                                ) : (
                        <FormErrorMessage>패스워드를 입력하세요</FormErrorMessage>
                     )}
            </FormControl>
            <FormControl isInvalid={isError3}>
                <FormLabel>패스워드 확인</FormLabel>
                <Input type='password' value={input3} onChange={handleInputChange3} />
                    {!isError3 ? (
                        input2 === input3 ? (
                        <FormHelperText>
                            패스워드가 일치합니다.
                        </FormHelperText>
                        ):(<FormHelperText>
                            패스워드가 일치하지않습니다.
                        </FormHelperText>)
                                ) : (
                        <FormErrorMessage>패스워드를 재입력하세요</FormErrorMessage>
                     )}
            </FormControl>
            <FormControl isInvalid={isError4}>
                <FormLabel>닉네임</FormLabel>
                <Input type='text' value={input4} onChange={handleInputChange4} />
                    {!isError4 ? (
                        <FormHelperText>
                            사용가능한 닉네임입니다.
                        </FormHelperText>
                                ) : (
                        <FormErrorMessage>닉네임을 입력하세요</FormErrorMessage>
                     )}
            </FormControl>
            <FormControl isInvalid={isError5}>
                <FormLabel>이메일</FormLabel>
                <Input type='email' value={input5} onChange={handleInputChange5} />
                    {!isError5 ? (
                        <FormHelperText>

                        </FormHelperText>
                                ) : (
                        <FormErrorMessage>이메일을 입력하세요</FormErrorMessage>
                     )}
            </FormControl>
            <Grid templateColumns="1fr 1fr" gap="5px" marginTop="20px">
                <Button border="1px solid #0B0B0D" borderRadius="10px">취소</Button>
                <Button type="submit" border="1px solid #0B0B0D" borderRadius="10px">회원가입</Button>
            </Grid>
            <Link width="100%" border="1px solid #0B0B0D" borderRadius="10px" textAlign="center" fontWeight="bold" padding="10px 0 " href='#'>로그인 이동</Link>
        </Stack>
    </Center>
}