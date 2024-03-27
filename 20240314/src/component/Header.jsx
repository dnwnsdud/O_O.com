import React from "react";
import {
  Flex,
  Spacer,
  Grid,
  Box,
  Stack,
  Button,
  ButtonGroup,
  Center,
  Image,
  ModalOverlay,
  Modal,
  useDisclosure
} from "@chakra-ui/react";
import UserModal from "./UserModal";
import { useNavigate } from "react-router-dom";

export default () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  let nav = useNavigate()
  return (
    <Box borderBottom="3px solid #0B0B0D">
      <Grid maxWidth="1280px" margin="auto" templateColumns='1fr 3fr 2fr'>
        <Box w="150px" h={20} marginLeft="20px" cursor={"pointer"} onClick={() => {
          nav("/")
        }}><Image w="100%" h="100%" src='/static/img/logo.png' /></Box>
        <Stack direction="row" spacing={10} align="center" >
          <Button
            w="70px"
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
            w="70px"
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
            w="70px"
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
            w="70px"
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
            w="70px"
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