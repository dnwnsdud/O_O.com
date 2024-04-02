import {
  Box,
  Button,
  Grid
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Soboard from "../component/board/Soboard";
import Today from "../component/board/Today";
import { io } from 'socket.io-client';

export default function App() {
  const [chatList, setChatList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const socket = io('http://192.168.6.3:9999', { cors: { origin: '*' } });

  useEffect(() => {
    socket.on('soccer', (data) => {
      setChatList(prevChatList => [data, ...prevChatList].slice(0, 50));
    });
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      socket.emit('soccer', `chat:${inputValue}`);
      setInputValue('');
    }
  };

  return (
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
        <Box border="1px solid red" >
          {
            chatList.map((chat, index) => <Box key={index}>{chat}</Box>)
          }
        </Box>
        <form onSubmit={handleSubmit}>
          <input
            style={{ border: "black 1px solid" }}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
        </form>
      </Grid >
    </Box >
  );
};
