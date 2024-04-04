import {
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  Input,
  Stack,
  Text
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import Soboard from "../component/board/Soboard";
import Today from "../component/board/Today";
import { io } from 'socket.io-client';

export default function App() {
  const [chatList, setChatList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [userData, setUserData] = useState([]);
  const socket = io('http://192.168.6.3:9999', { cors: { origin: '*' } });


  useEffect(() => {
    try {
      fetch('/api/mypage')
        .then(response => {
          if (response) {
            console.log(response);
            return response.json();
          }
          else {
            throw new Error(e);
          }
        })
        .then(data => {
          if (data) {
            console.log("☆이게 먼저오는거면 나는 어쩌라는건데 진짜 다 죽자★");
            setUserData(data);
          } else {
            alert(`사용자를 저장하는 동안 오류 발생:${data.error}`);
          }
        })
        .catch(error => {
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    socket.on('soccer', (data) => {
      setChatList(prevChatList => [data, ...prevChatList].slice(0, 50));
    });
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

        <Flex
          direction={"column"}
          justifyContent={"space-between"}
          borderRadius={5}
          bg={"#0b0b0d"}
          overflow={"hidden"}
        >
          <Flex flexDirection={"column"} justifyContent={"space-between"}>
            <Box pl={2} color={"white"} fontSize={"xl"}>채팅</Box>
            <Stack className="chat-list"
              // maxH={"50vh"}
              h={"50vh"}
              color={"white"}
              direction={"column-reverse"}
              pl={2}
              pr={2}
              overflowY={"scroll"}
            >
              {
                chatList.map((chat, index) =>
                  <Box _hover={{
                    bg: "gray.700"
                  }} borderRadius={5} key={index}><Text>{userData.nickname}</Text>{chat}</Box>
                )
              }
            </Stack>
          </Flex>
          <Box p={2} bg={"#555"}>
            <Flex bg={"#999"} borderRadius={20}>
              <Input
                pl={2}
                variant={"unstyled"}
                outline={"none"}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="메시지를 입력하세요"
                _placeholder={{ color: "white" }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e);
                  }
                }}
              />
              <Button onClick={handleSubmit}><ArrowForwardIcon /></Button>
            </Flex>
          </Box>
        </Flex>
      </Grid >
    </Box >
  );
};