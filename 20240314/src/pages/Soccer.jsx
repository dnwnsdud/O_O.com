import {
  Box,
  Button,
  Grid
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import Today from "../component/board/Today";
import Soboard from "../component/board/Soboard";
import { io } from "socket.io-client";

export default () => {
  const [Chatting, ChattingChanger] = useState({});
  useCallback(() => {
    ChattingChanger({
      ...Chatting,
      io: io('http://localhost:9999', { cors: { origin: '*' } }),
      soccer: { chatList: [] }
    });
    Chatting.io.on('soccer', (data) => {
      Chatting.soccer.chatList.push(data);
      Chatting.soccer.chatList = Chatting.soccer.chatList.reverse().slice(50).reverse();
      ChattingChanger({ ...Chatting });
    })
  }, [])();
  return (
    <>
      <Box maxW="1280px" margin="auto">
        <Box h={20} bg="red" margin="20px 0"></Box>
        <Grid templateColumns="1fr 4fr 1fr" gap="20px">
          <Box>
            <Grid
              templateColumns="repeat(1 , 1fr)"
              gap="10px"
              padding="10px 30px"
            >
              <Button size="xs" color="#000">
                EPL
              </Button>
              <Button size="xs" color="#000">
                라리가
              </Button>
              <Button size="xs" color="#000">
                분데스리가
              </Button>
              <Button size="xs" color="#000">
                세리에
              </Button>
              <Button size="xs" color="#000">
                K리그
              </Button>
              <Button size="xs" color="#000">
                국대
              </Button>
            </Grid>
          </Box>
          <Box border="1px solid red">
            <Today />
            <Soboard />
          </Box>
          <Box border="1px solid red">
            {
              Chatting?.soccer?.chatList?.map(chat => <span>{chat}</span>)
            }
          </Box>
          <input type="text" onChange={(e) => {
            Chatting?.io.emit('soccer', `chat:${e.currentTarget.value}`);
          }} />
        </Grid >
      </Box >
    </>
  );
};