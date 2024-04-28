import { Box, Center, Stack } from "@chakra-ui/react";
import React from "react";

export default () => {
  return (
    <Center>
      <Stack
        margin="100px 0"
        padding="50px 50px 60px"
        border="1px solid #0B0B0D"
        borderRadius="10px"
        width="1280px"
      >
        <Box
          fontSize="30px"
          padding="0 30px"
          textAlign="center"
          fontWeight="bold"
          marginBottom="20px"
        >
          아이템판매관리
        </Box>
        <Box
          border="1px solid black"
          borderRadius="10px"
          width="800px"
          height="600px"
          margin="auto"
        >
          다양한 표
        </Box>
      </Stack>
    </Center>
  );
};
