import {
  Box,
  Button,
  Grid
} from "@chakra-ui/react";
import React, { useState } from "react";
import Soboard from "../component/board/Soboard";
import Today from "../component/board/Today";
import { io } from 'socket.io-client';
export default function App() {
  const [chatting, setChatting] = useState({ io: io('http://localhost:9999', { cors: { origin: '*' } }), soccer: { chatList: [] } });

  chatting.io.on('soccer', (data) => {
    setChatting(prevState => ({
      ...prevState,
      soccer: {
        ...prevState.soccer,
        chatList: [data, ...prevState.soccer.chatList].slice(0)
      }
    }));
  });

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
              chatting.soccer.chatList.map((chat, index) => <span key={index}>{chat}</span>)
            }
          </Box>
          <input style={{ border: "black 1px solid" }} type="text" onKeyUp={(e) => {
            chatting.io.emit('soccer', `chat:${e.currentTarget.value}`);
          }} />
        </Grid >
      </Box >
    </>
  );
};
