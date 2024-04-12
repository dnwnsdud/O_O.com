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
import React from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Today from "../component/board/Today";
import BaBoard from "../component/board/Baboard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useContext } from "react";
import { UserContext } from "../hook/User";
import { useLocation } from "react-router";
import { io } from 'socket.io-client';
const socket = io('http://192.168.6.3:9999', { cors: { origin: '*' } });


export default () => {

  const [selectedTeam, setSelectedTeam] = useState('모든 팀');
  const { user } = useContext(UserContext);
  const [chatList, setChatList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname;
    const room = currentPath.split('/')[1];
    const chatEvent = room + '_chat';
    const receiveMessage = (data) => {
      setChatList(prevChatList => [data, ...prevChatList]);
      console.log(data);
    };

    socket.emit('join_room', room);
    socket.on(chatEvent, (data) => {
      setChatList(prevChatList => [data, ...prevChatList]);

    });

    return () => {
      socket.off(chatEvent, receiveMessage);
    };
  }, [location.pathname]);


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const currentPath = location.pathname;
      const room = currentPath.split('/')[1];
      const chatEvent = room + '_chat';

      socket.emit(chatEvent, { room: room, user: user.nickname, chat: `${inputValue}` });
      setInputValue('');
    }
  };


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
              <Button
                sx={{
                  backgroundColor: "#C30452 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTeam('LG')}
              >
                LG
              </Button>
              <Button
                sx={{
                  backgroundColor: "#041E42 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTeam('롯데')}
              >
                롯데
              </Button>
              <Button
                sx={{
                  backgroundColor: "#EA0029 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTeam('기아')}
              >
                기아
              </Button>
              <Button
                sx={{
                  backgroundColor: "#CE0E2D !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTeam('SSG')}
              >
                SSG
              </Button>
              <Button
                sx={{
                  backgroundColor: "#000000 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTeam('KT')}
              >
                KT
              </Button>
              <Button
                sx={{
                  backgroundColor: "#FF6600 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTeam('한화')}
              >
                한화
              </Button>
              <Button
                sx={{
                  backgroundColor: "#074CA1 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTeam('삼성')}
              >
                삼성
              </Button>
              <Button
                sx={{
                  backgroundColor: "#131230 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTeam('두산')}
              >
                두산
              </Button>
              <Button
                sx={{
                  backgroundColor: "#570514 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTeam('키움')}
              >
                키움
              </Button>
              <Button
                sx={{
                  backgroundColor: "#315288 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTeam('NC')}
              >
                NC
              </Button>
            </Grid>
          </Box>
          <Box marginBottom="4rem">
            <Today />
            <BaBoard selectedTeam={selectedTeam} user={user} />
          </Box >
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
                    }} borderRadius={5} key={index}>
                      {chat.user === user.nickname ? <Text color="#46a3d2" fontWeight={"bold"}>{chat.user}</Text> : <Text fontWeight={"bold"}>{chat.user}</Text>}
                      <Text>{chat.message}</Text>
                    </Box>
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
                      console.log(chatList);
                    }
                  }}
                />
                <Button onClick={handleSubmit}><ArrowForwardIcon /></Button>
              </Flex>
            </Box>
          </Flex>
        </Grid >
      </Box >
    </>
  );
};
