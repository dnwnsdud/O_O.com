import React from "react";
import {
  Flex,
  Spacer,
  Grid,
  Box,
  Stack,
  Button,
  ButtonGroup,
  Cneter,
  Image
} from "@chakra-ui/react";

export default () => {

  return (
    <Box borderBottom="3px solid #0B0B0D">
      <Grid maxWidth="1280px" margin="auto" templateColumns='1fr 3fr 2fr'>
        <Box w="150px" h={20} marginLeft="20px"><Image w="100%" h="100%" src='/static/img/logo.png' /></Box>

        <Stack direction="row" spacing={10} align="center" >
          <Button
            w="70px"
            h="10"
            display="flex"
            justifyContent="center"
            bg=""
          >
            야구
          </Button>
          <Button
            w="70px"
            h="10"
            display="flex"
            justifyContent="center"
            bg=""
          >
            LOL
          </Button>
          <Button
            w="70px"
            h="10"
            display="flex"
            justifyContent="center"
            bg=""
          >
            축구
          </Button>
          <Button
            w="70px"
            h="10"
            display="flex"
            justifyContent="center"
            bg=""
          >
            사회
          </Button>
          <Button
            w="70px"
            h="10"
            display="flex"
            justifyContent="center"
            bg=""
          >
            결과
          </Button>
        </Stack>

        <Stack direction="row" spacing={5} align="center" justify="flex-end" paddingRight={20}>
          <Button size="xs">
            공지사항
          </Button>
          <Button size="xs">
            상점
          </Button>
          <Button size="xs">
            회원가입
          </Button>
          <Button size="xs">
            로그인
          </Button>
        </Stack>
      </Grid>
    </Box>
  )
}