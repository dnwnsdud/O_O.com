import React from "react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Heading,
    Center,
    Flex,
    Box,
    Select,
    Stack,
    Input,
    Textarea,
    Button,
    Divider
} from "@chakra-ui/react";

export default () => {
    return <>
        <Center>
            <Stack gap={6}>
                <Heading>오늘의 O_O 작성</Heading>
                <FormControl>
                    <FormLabel>카테고리</FormLabel>
                    <Select defaultValue={"main"}>
                        <option value='main'>메인</option>
                        <option value='baseball'>야구</option>
                        <option value='lol'>LoL</option>
                        <option value='soccer'>축구</option>
                        <option value='society'>사회</option>
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>주제</FormLabel>
                    <Input type='text' />
                </FormControl>
                <Flex gap={4} justifyContent={"space-between"} alignItems={"center"}>
                    <Stack gap={4}>
                        <FormControl isRequired>
                            <FormLabel>왼쪽 제목</FormLabel>
                            <Input type='text' />
                            <FormLabel>왼쪽 내용</FormLabel>
                            <Textarea resize={"none"} />
                        </FormControl>
                        <FormLabel>왼쪽 이미지</FormLabel>
                        <Input type='file' />
                    </Stack>
                    <Divider borderColor={"#eaeaea"} borderWidth={"1px"} orientation="vertical" h={"240px"} />
                    <Stack gap={4}>
                        <FormControl isRequired>
                            <FormLabel>오른쪽 제목</FormLabel>
                            <Input type='text' />
                            <FormLabel>오른쪽 내용</FormLabel>
                            <Textarea resize={"none"} />
                        </FormControl>
                        <FormLabel>오른쪽 이미지</FormLabel>
                        <Input type='file' />
                    </Stack>
                </Flex>
                <Button>작성</Button>
            </Stack>
        </Center>
    </>
}