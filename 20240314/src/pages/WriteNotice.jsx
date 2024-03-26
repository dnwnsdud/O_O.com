import { Box, Button, Center, Divider, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Stack, Text, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';

export default () => {
    const [input, setInput] = useState('')
    const [input2, setInput2] = useState('')
    const handleInputChange = (e) => setInput(e.target.value)
    const handleInputChange2 = (e) => setInput2(e.target.value)

    const isError = input === ''
    const isError2 = input2 === ''

    return (<Stack w={"35%"} m={"auto"} height={"100vh"} direction={'column'} justifyContent={"center"}>
        <Stack height={"80%"} direction={"column"} justifyContent={"space-around"} borderRadius={"10px"} bg={"white"} boxShadow={"md"} p={10}>
            <Center><Text fontSize={"4xl"} color={"#0b0b0d"} fontWeight={"bold"}>공지작성</Text></Center>
            <Box>
                <FormControl isInvalid={isError} isRequired>
                    <FormLabel>제목</FormLabel>
                    <Input type='text' value={input} onChange={handleInputChange} />
                    {!isError ? (
                        <FormHelperText color={"#3182ce"}>
                            입력하신 내용으로 요청이 됩니다.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>해당 칸을 입력해주세요</FormErrorMessage>
                    )}
                </FormControl>
                <Divider orientation='horizontal' borderBottomWidth={"2px"} borderColor={"#0b0b0d"} marginTop={"5px"} marginBottom={"5px"} />
                <FormControl isInvalid={isError2} isRequired >
                    <FormLabel>내용</FormLabel>
                    <Textarea value={input2} onChange={handleInputChange2} size={"lg"} resize={"none"} h={"200px"} />
                    {!isError2 ? (
                        <FormHelperText color={"#3182ce"}>
                            입력하신 내용으로 요청이 됩니다.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>해당 칸을 입력해주세요</FormErrorMessage>
                    )}
                </FormControl>
            </Box>
            <Flex justifyContent={"end"} gap={3}>
                <Button border={"2px solid"} borderColor={'rgba(11,11,13,.6)'}>취소</Button>
                <Button border={"2px solid"} borderColor={'rgba(11,11,13,.6)'}>작성</Button>
            </Flex>
        </Stack>
    </Stack>
    )
}