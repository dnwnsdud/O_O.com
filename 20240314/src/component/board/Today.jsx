import { Box, Button, Center, Flex } from '@chakra-ui/react';
import React from "react";

export default () => {
  return (
    <>
      <Box border="1px solid blue" marginBottom="10px">
        <Center fontSize={20}>오늘의 O_O</Center>
        <Center>2024년 시즌 꼴등은 누가 할 거 같나요?</Center>
        <Flex gap="10px" padding="10px" justify="end">
          <Button size="xs">자세히 보기</Button>
          <Button size="xs">요청하기</Button>
        </Flex>
      </Box>
    </>
  )
}