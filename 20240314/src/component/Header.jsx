import {
  Box,
  Button,
  Flex,
  Grid,
  Stack,
  useDisclosure
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import UserModal from "./UserModal";

export default () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [fill, fillChange] = useState("#0B0B0D");
  const [cl, clChange] = useState(true);
  let nav = useNavigate()
  return (
    <Box borderBottom="3px solid #0B0B0D">
      <Grid maxWidth="55%" margin="auto" templateColumns='1fr 3fr 2fr'>
        <Flex w="150px" h={20} cursor={"pointer"}
          justifyContent={"center"}
          onClick={() => { nav("/") }}
          onMouseEnter={() => { fillChange(""); clChange(!cl) }}
          onMouseLeave={() => { fillChange("#0B0B0D"); clChange(!cl) }}
        >
          <Logo width="100%" height="100%" fill={fill} cl={cl} />
        </Flex>
        <Stack direction="row" spacing={5} align="center">
          <Button
            w="50px"
            h="10"
            display="flex"
            justifyContent="center"
            bg=""
            onClick={() => {
              nav("/b")
            }}
          >
            야구
          </Button>
          <Button
            w="50px"
            h="10"
            display="flex"
            justifyContent="center"
            bg=""
            onClick={() => {
              nav("/l")
            }}
          >
            LOL
          </Button>
          <Button
            w="50px"
            h="10"
            display="flex"
            justifyContent="center"
            bg=""
            onClick={() => {
              nav("/s")
            }}
          >
            축구
          </Button>
          <Button
            w="50px"
            h="10"
            display="flex"
            justifyContent="center"
            bg=""
            onClick={() => {
              nav("/c")
            }}
          >
            사회
          </Button>
          <Button
            w="50px"
            h="10"
            display="flex"
            justifyContent="center"
            bg=""
            onClick={() => {
              nav("/r")
            }}
          >
            결과
          </Button>
        </Stack>
        <Stack direction="row" spacing={5} align="center" justify="flex-end" paddingRight={20}>
          <Button size="xs"
            onClick={() => {
              nav("/n")
            }}
          >
            공지사항
          </Button>
          <Button size="xs"
            onClick={() => {
              nav("/st")
            }}
          >
            상점
          </Button>
          <Button size="xs" onClick={onOpen}>
            로그인
          </Button>
        </Stack>
      </Grid>
      <UserModal isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}