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
import React from "react";
import Today from "../component/board/Today";
import Ciboard from "../component/board/Ciboard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { io } from 'socket.io-client';
import { useContext } from "react";
import { UserContext } from "../hook/User";
import { useLocation } from "react-router";
const socket = io('http://192.168.6.3:9999', { cors: { origin: '*' } });


export default () => {
  const { user } = useContext(UserContext);
  const [selectedtab, setSelectedTab] = useState("전체");
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
                onClick={() => setSelectedTab("잡담")}
              >
                잡담
              </Button>
              <Button
                sx={{
                  backgroundColor: "#041E42 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTab("정치")}
              >
                정치
              </Button>
              <Button
                sx={{
                  backgroundColor: "#EA0029 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTab("연예")}
              >
                연예
              </Button>
              <Button
                sx={{
                  backgroundColor: "#CE0E2D !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTab("여행")}
              >
                여행
              </Button>
              <Button
                sx={{
                  backgroundColor: "#000000 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTab("취미")}
              >
                취미
              </Button>
              <Button
                sx={{
                  backgroundColor: "#FF6600 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTab("경제")}
              >
                경제
              </Button>
              <Button
                sx={{
                  backgroundColor: "#074CA1 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTab("역사")}
              >
                역사
              </Button>
            </Grid>
          </Box>
          <Box border="1px solid red">
            <Today />
            <Ciboard selectedtab={selectedtab} user={user} />
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
                    }} borderRadius={5} key={index}>{chat.user === user.nickname ? <Text color="#46a3d2" fontWeight={"bold"}>{chat.user}</Text> : <Text fontWeight={"bold"}>{chat.user}</Text>}<Text>{chat.message}</Text></Box>
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
        </Grid>
      </Box>
    </>
  );
};
