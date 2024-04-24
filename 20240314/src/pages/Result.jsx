import {
  Box,
  Flex,
  Grid,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Button,
  Img
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../hook/User";
import Calender from "./Calender";

export default () => {
  const { day, setDay } = useContext(UserContext);
  const [main, setMain] = useState([]);
  const [baseball, setBaseball] = useState([]);
  const [lol, setLol] = useState([]);
  const [soccer, setSoccer] = useState([]);
  const [society, setSociety] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: day,
        }),
      });
      const data = await response.json();
      setMain(data.data.main);
      setBaseball(data.data.baseball);
      setLol(data.data.lol);
      setSoccer(data.data.soccer);
      setSociety(data.data.society);
      console.log(data.data, "data.data");
    };
    fetchData();
  }, [day]);

  console.log(main, "main");
  const WalkthroughPopover = ({ props, index }) => {
    const initialFocusRef = useRef();
    return (
      <Popover
        initialFocusRef={initialFocusRef}
        placement="bottom"
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <Button
            onClick={() => {
              console.log(props.leftSide);
            }}
          >
            {index + 1}회 차
          </Button>
        </PopoverTrigger>
        <PopoverContent color="black" bg="#f7f7f8" borderColor="#f5f7f8">
          <PopoverArrow bg="#f5f7f8" />
          <PopoverCloseButton />
          <PopoverHeader fontWeight="bold" minH='7rem' alignContent={'center'}>{props.title}</PopoverHeader>
          <PopoverBody minH={'8rem'}>
            <Box>
              {props.leftSide.participants.length >
                props.rightSide.participants.length
                ? "left win"
                : props.leftSide.participants.length <
                  props.rightSide.participants.length
                  ? "right win"
                  : "draw"}
            </Box>
            <Flex fontWeight={'normal'} h='8rem' gap='1'>
              <Box fontSize={'15px'} w='50%' border='1px solid #dedee3'
                alignContent={'center'}>
                <Text>{props.leftSide.title}</Text>
                <Text>{props.leftSide.content}</Text>
              </Box>
              <Box w='50%' border='1px solid #dedee3' alignContent={'center'}>
                <Text>{props.rightSide.title}</Text>
                <Text>{props.rightSide.content}</Text>
              </Box>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover >
    );
  };

  return (
    <Box bg='#f7f7f8'>
      <Box maxW="1280px" margin="auto" bg='#f7f7f8' py='10' >
        <Box maxW="800px" margin="auto" >
          <Calender
            defaultDate={
              new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate() - 1
              )
            }
            onChange={(date) => {
              setDay(
                `${date.getFullYear()}-${date.getMonth() + 1 >= 10
                  ? date.getMonth() + 1
                  : `0${date.getMonth() + 1}`
                }-${date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`
                }`
              );
            }}
          />
        </Box>
        <Grid templateColumns="1fr 4fr 1fr" gap="20px" w="100%">
          <Box marginTop="100px" h="450px" w="100%" position={"relative"}>
            <Img
              objectFit="cover"
              w="100%"
              h="100%"
              src="/static/img/세로.jpg"
            ></Img>
            <Box position={"absolute"} fontSize="3rem" color="#ffffff" fontWeight={"bold"} top="50%" left={"50%"} transform="translate(-50%, -50%)" >광고</Box>
          </Box>
          <Box margin="20px 0" w="100%">
            <Box
              border="1px solid #dedee3"
              borderRadius={'10px'}
              shadow={'base'}
              w="100%"
              h="200px"
              marginBottom="10px"
              textAlign="center"
              fontWeight="bold"
              fontSize="1.5 rem"
              bg='#fff'
            >
              <Heading>O_O</Heading>
              {main.length == 0 ? (
                <Heading size={"m"}>경기 결과가 없습니다</Heading>
              ) : main.length > 0 && main.length == 1 ? (
                <Box>
                  <Heading size={"m"}>{main[0].title}</Heading>
                  <Box>
                    {main[0].leftSide.participants.length >
                      main[0].rightSide.participants.length ? (
                      <Box>
                        <Text>왼쪽 진영 승</Text>
                        <Text>{main[0].leftSide.title}</Text>
                      </Box>
                    ) : main[0].rightSide.participants.length >
                      main[0].leftSide.participants.length ? (
                      <Box>
                        <Text>오른쪽 진영 승</Text>
                        <Text>{main[0].rightSide.title}</Text>
                      </Box>
                    ) : (
                      "무승부"
                    )}
                  </Box>
                </Box>
              ) : (
                main.map((item, index) => {
                  return (
                    <Box key={index} border="1px solid black" w="100%" h="50px">
                      <Heading size={"m"}>{item.title}</Heading>
                      <Box>
                        {item.leftSide.participants.length >
                          item.rightSide.participants.length ? (
                          <Box>
                            <Text>왼쪽 진영 승</Text>
                            <Text>{item.leftSide.title}</Text>
                          </Box>
                        ) : item.rightSide.participants.length >
                          item.leftSide.participants.length ? (
                          <Box>
                            <Text>오른쪽 진영 승</Text>
                            <Text>{item.rightSide.title}</Text>
                          </Box>
                        ) : (
                          "무승부"
                        )}
                      </Box>
                    </Box>
                  );
                })
              )}
            </Box>
            <Flex gap="10px" padding="10px" >
              <Box
                border="1px solid #dedee3"
                borderRadius={'10px'}
                w="100%"
                h="150px"
                textAlign="center"

                bg='#fff'
              >
                <Heading size={"m"}>야구</Heading>
                {baseball.length == 0 ? (
                  <Heading size={"m"}>경기 결과가 없습니다</Heading>
                ) : (
                  baseball.map((item, index) => {
                    return (
                      <Box
                        key={index}
                        border="1px solid #dedee3"
                        w="80%"
                        h="40px"
                        margin={'auto'}
                      >
                        <Heading size={"m"}>
                          <WalkthroughPopover props={item} index={index} />
                        </Heading>
                      </Box>
                    );
                  })
                )}
              </Box>
              <Box
                border="1px solid #dedee3"
                borderRadius={'10px'}
                w="100%"
                h="150px"
                textAlign="center"

                bg='#fff'
              >
                <Heading size={"m"}>LOL</Heading>
                {lol.length == 0 ? (
                  <Heading size={"m"}>경기 결과가 없습니다</Heading>
                ) : (
                  lol.map((item, index) => {
                    return (
                      <Box
                        key={index}
                        border="1px solid #dedee3"
                        w="80%"
                        h="40px"
                        margin={'auto'}
                      >
                        <WalkthroughPopover props={item} index={index} />
                      </Box>
                    );
                  })
                )}
              </Box>
              <Box
                border="1px solid #dedee3"
                borderRadius={'10px'}
                w="100%"
                h="150px"
                textAlign="center"

                bg='#fff'
              >
                <Heading size={"m"}>축구</Heading>
                {soccer.length == 0 ? (
                  <Heading size={"m"}>경기 결과가 없습니다</Heading>
                ) : (
                  soccer.map((item, index) => {
                    return (
                      <Box
                        key={index}
                        border="1px solid #dedee3"
                        w="80%"
                        h="40px"
                        m='auto'
                      >
                        <Heading size={"m"}>
                          <WalkthroughPopover props={item} index={index} />
                        </Heading>
                      </Box>
                    );
                  })
                )}
              </Box>
              <Box
                border="1px solid #dedee3"
                borderRadius={'10px'}
                w="100%"
                h="150px"
                textAlign="center"

                bg='#fff'
              >
                <Heading size={"m"}>사회</Heading>
                {society.length == 0 ? (
                  <Heading size={"m"}>경기 결과가 없습니다</Heading>
                ) : (
                  society.map((item, index) => {
                    return (
                      <Box
                        key={index}
                        border="1px solid #dedee3"
                        w="80%"
                        h="40px"
                        m='auto'
                      >
                        <WalkthroughPopover props={item} index={index} />
                      </Box>
                    );
                  })
                )}
              </Box>
            </Flex>
          </Box>
          <Box marginTop="100px" h="450px" w="100%" position={"relative"}>
            <Img
              objectFit="cover"
              w="100%"
              h="100%"
              src="/static/img/세로2.jpg"
            ></Img>
            <Box position={"absolute"} fontSize="3rem" color="#ffffff" fontWeight={"bold"} top="50%" left={"50%"} transform="translate(-50%, -50%)" >광고</Box>
          </Box>
        </Grid>
      </Box >
    </Box >
  );
};
