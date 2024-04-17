import {
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  Input,
  Stack,
  Text,
  Img
} from "@chakra-ui/react";
import React from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Vote from "../component/board/Vote";
import BaBoard from "../component/board/Baboard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useContext } from "react";
import { UserContext } from "../hook/User";
import { useLocation } from "react-router";
import { io } from 'socket.io-client';
const socket = io('http://localhost:9999', { cors: { origin: '*' } });

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2761297661062301"
  crossorigin="anonymous"></script>

export default () => {

  const [selectedTeam, setSelectedTeam] = useState('모든 팀');
  const { user } = useContext(UserContext);
  const [chatList, setChatList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();
  const currentPath = location.pathname;
  let [todayVote, setTodayVote] = useState([]);
  const category = currentPath
  useEffect(() => {
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
    fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify({
        category: category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
        setTodayVote(data);
      }).catch((e) => {
        setTodayVote("비었음")
      })
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
      <Box maxW="1300px" minH={1200} margin="auto">
        <Box overflow="hidden" h={'12rem'} margin="20px 0">
          <Img objectFit="cover" w="100%" h="150%" src="/static/img/맨위광고1.jpg"></Img>
        </Box>
        <Grid templateColumns="0.7fr 4fr 1.5fr" gap="20px" >
          <Box
          // position={'relative'}
          >
            <Grid
              templateColumns="repeat(1 , 1fr)"
              gap="1px"
              padding="10px 30px"
              // bg='#f7f7f8'
              // borderRadius={10}
              // position={'fixed'}
              // width={'7%'}
              // top={400}
              marginTop={200}
            >
              <Button
                sx={{
                  backgroundColor: "#5181e3 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTeam('모든 팀')}
              >
                전체
              </Button>
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
          <Box borderRadius={"10px"} marginBottom="4rem" >
            <Vote todayVote={todayVote} />
            <BaBoard selectedTeam={selectedTeam} user={user} />
          </Box >
          <Flex
            w={"15%"}
            position={'fixed'}
            right={"15%"}
            direction={"column"}
            justifyContent={"space-between"}
            borderRadius={5}
            bg={"#f7f7f8"}
            overflow={"hidden"}
            h={550}
          >
            <Flex flexDirection={"column"} justifyContent={"space-between"} h={500}>
              <Box pl={2} color={"black"} fontSize={"xl"}>채팅</Box>
              <Stack className="chat-list"
                maxH={450}
                color={"black"}
                direction={"column-reverse"}
                pl={2}
                pr={2}
                overflowY={"scroll"}
              >
                {
                  chatList.map((chat, index) =>
                    <Box _hover={{
                      bg: "#dedee3"
                    }} borderRadius={5} key={index}>
                      {chat.user === user.nickname ? <Text color="#46a3d2" fontWeight={"bold"}>{chat.user}</Text> : <Text fontWeight={"bold"}>{chat.user}</Text>}
                      <Text>{chat.message}</Text>
                    </Box>
                  )
                }
              </Stack>
            </Flex>
            <Box
              p={2}
            >
              <Flex border='1px solid #c8c8d0' borderRadius={5}>
                <Input
                  pl={2}
                  variant={"unstyled"}
                  outline={"none"}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="메시지를 입력하세요"
                  _placeholder={{ color: "black" }}
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
