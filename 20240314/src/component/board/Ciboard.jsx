import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  HStack,
  VStack,
  Center,
} from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default () => {
  return (
    <>
      <Box>
        <Box padding="0 10px" fontWeight="bold">
          사회
        </Box>
        <Flex padding="10px" fontWeight="bold" gap="10px" justify="end">
          <Button size="xs">최신순</Button>
          <Button size="xs">인기순</Button>
        </Flex>
        <Grid
          borderTop="1px solid #0B0B0D"
          borderBottom="1px solid #0B0B0D"
          textAlign="center"
          templateColumns="1fr 8fr 2fr 2fr 1fr 1fr"
        >
          <Box>탭</Box>
          <Box>제목</Box>
          <Box>글쓴이</Box>
          <Box>날짜</Box>
          <Box>조회</Box>
          <Box>추천</Box>
        </Grid>
        <Grid
          borderBottom="1px dotted #0B0B0D"
          textAlign="center"
          templateColumns="1fr 8fr 2fr 2fr 1fr 1fr"
        >
          <Box>라리가</Box>
          <Box>메시 어디감?</Box>
          <Box>호동생</Box>
          <Box>24-03-25</Box>
          <Box>1</Box>
          <Box>44</Box>
        </Grid>
        <Flex h={10} padding="10px" justify="end">
          <InputGroup w={200} size="xs">
            <Input pr="4.5rem" />
            <InputRightElement>
              <SearchIcon color="gray.300" />
            </InputRightElement>
          </InputGroup>
        </Flex>
      </Box>
    </>
  );
};