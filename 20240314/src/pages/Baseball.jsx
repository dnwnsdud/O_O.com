import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Img,
  Input,
  Spinner,
  Text
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { io } from "socket.io-client";
import BaBoard from "../component/board/Baboard";
import Vote from "../component/board/Vote";
import { UserContext } from "../hook/User";
const socket = io("http://192.168.6.3:9999", { cors: { origin: "*" } });

const Loading = (align, justify, width, height) => {
  return (
    <Flex alignItems={align || "center"} justifyItems={justify || "center"} width={width || "200%"} height={height || ""}>
      <Spinner
        m={"auto"}
        w={"80px"}
        h={"80px"}
        thickness="10px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
};


export default () => {
  const { user } = useContext(UserContext);
  const [chatList, setChatList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const currentPath = location.pathname;
  let [todayVote, setTodayVote] = useState([]);
  const category = currentPath;
  let [isLoading, setIsLoading] = useState(true);
  let tab = "baseball";
  useEffect(() => {
    const room = currentPath.split("/")[1];
    const chatEvent = room + "_chat";
    const receiveMessage = (data) => {
      setChatList((prevChatList) => [data, ...prevChatList]);
    };


    socket.emit("join_room", room);
    socket.on(chatEvent, (data) => {
      setChatList((prevChatList) => [data, ...prevChatList]);
    });
    fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify({
        category: category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodayVote(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setTodayVote("비었음");
        setIsLoading(false);
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
    if (inputValue.trim() !== "") {
      const currentPath = location.pathname;
      const room = currentPath.split("/")[1];
      const chatEvent = room + "_chat";

      socket.emit(chatEvent, {
        room: room,
        user: user.nickname,
        chat: `${inputValue}`,
      });
      setInputValue("");
    }
  };

  return (
    <>
      <Box maxW="1300px" minH={1300} margin="auto" overflow={"hidden"}>
        <Box overflow="hidden" h={"12rem"} margin="20px 0">
          <Img
            objectFit="cover"
            w="100%"
            h="150%"
            src="/static/img/맨위광고1.jpg"
          ></Img>
        </Box>
        <Grid templateColumns="4fr 1.5fr" gap="20px">
          <Box borderRadius={"10px"} marginBottom="4rem">
            {isLoading && Loading("center","center","100%","20%")}
            {!isLoading && <Vote todayVote={todayVote} location={tab} />}
            <BaBoard user={user} />
          </Box>
          <Flex
            maxW={"350px"}
            w={"100%"}
            direction={"column"}
            justifyContent={"space-between"}
            borderRadius={5}
            bg={"#f7f7f8"}
            overflow={"hidden"}
            h={"100vh"}
          >
            <Flex
              flexDirection={"column"}
              justifyContent={"space-between"}
              h={"95vh"}
              w={"100%"}
            >
              <Box pl={2} color={"black"} fontSize={"xl"}>
                채팅
              </Box>
              <Flex
                className="chat-list"
                maxH={"90vh"}
                color={"black"}
                direction={"column-reverse"}
                pl={2}
                pr={2}
                w={"100%"}
                maxW={"350px"}
                overflowY={"scroll"}
              >
                {chatList.map((chat, index) => (
                  <Box
                    w={"100%"}
                    m={"auto"}
                    _hover={{
                      bg: "#dedee3",
                    }}
                    borderRadius={5}
                    key={index}
                  >
                    {chat.user === user.nickname ? (
                      <Text color="#46a3d2" fontWeight={"bold"}>
                        {chat.user}
                      </Text>
                    ) : (
                      <Text fontWeight={"bold"}>{chat.user}</Text>
                    )}
                    <Text>{chat.message}</Text>
                  </Box>
                ))}
              </Flex>
            </Flex>
            <Box p={2}>
              <Flex border="1px solid #c8c8d0" borderRadius={5}>
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
                    if (e.key === "Enter") {
                      handleSubmit(e);
                      console.log(chatList);
                    }
                  }}
                />
                <Button onClick={handleSubmit}>
                  <ArrowForwardIcon />
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Grid>
      </Box>
    </>
  );
};
