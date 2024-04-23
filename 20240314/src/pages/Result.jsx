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
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Button,
  Stack,
  ButtonGroup,
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
        closeOnBlur={false}
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
        <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
          <PopoverArrow bg="blue.800" />
          <PopoverCloseButton />
          <PopoverHeader fontWeight="bold">{props.title}</PopoverHeader>
          <PopoverBody>
            <Box>
              {props.leftSide.participants.length >
              props.rightSide.participants.length
                ? "left win"
                : props.leftSide.participants.length <
                  props.rightSide.participants.length
                ? "right win"
                : "draw"}
            </Box>
            <Flex>
              <Box>
                {props.leftSide.title}
                {props.leftSide.content}
              </Box>
              <Box>
                {props.rightSide.title}
                {props.rightSide.content}
              </Box>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <>
      <Box maxW="1280px" margin="auto">
        <Box maxW="800px" margin="20px auto">
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
                `${date.getFullYear()}-${
                  date.getMonth() + 1 >= 10
                    ? date.getMonth() + 1
                    : `0${date.getMonth() + 1}`
                }-${
                  date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`
                }`
              );
            }}
          />
        </Box>
        <Grid templateColumns="1fr 4fr 1fr" gap="20px" w="100%">
          <Box marginTop="100px" border="1px solid black" h="450px" w="100%">
            광고
          </Box>
          <Box margin="20px 0" w="100%">
            <Box
              border="1px solid black"
              w="100%"
              h="200px"
              marginBottom="10px"
              textAlign="center"
              fontWeight="bold"
              fontSize="1.5 rem"
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
            <Flex gap="10px" padding="10px">
              <Box
                border="1px solid black"
                w="100%"
                h="150px"
                textAlign="center"
              >
                <Heading size={"m"}>야구</Heading>
                {baseball.length == 0 ? (
                  <Heading size={"m"}>경기 결과가 없습니다</Heading>
                ) : (
                  baseball.map((item, index) => {
                    return (
                      <Box
                        key={index}
                        border="1px solid black"
                        w="100%"
                        h="50px"
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
                border="1px solid black"
                w="100%"
                h="150px"
                textAlign="center"
              >
                <Heading size={"m"}>LOL</Heading>
                {lol.length == 0 ? (
                  <Heading size={"m"}>경기 결과가 없습니다</Heading>
                ) : (
                  lol.map((item, index) => {
                    return (
                      <Box
                        key={index}
                        border="1px solid black"
                        w="100%"
                        h="50px"
                      >
                        <WalkthroughPopover props={item} index={index} />
                      </Box>
                    );
                  })
                )}
              </Box>
              <Box
                border="1px solid black"
                w="100%"
                h="150px"
                textAlign="center"
              >
                <Heading size={"m"}>축구</Heading>
                {soccer.length == 0 ? (
                  <Heading size={"m"}>경기 결과가 없습니다</Heading>
                ) : (
                  soccer.map((item, index) => {
                    return (
                      <Box
                        key={index}
                        border="1px solid black"
                        w="100%"
                        h="50px"
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
                border="1px solid black"
                w="100%"
                h="150px"
                textAlign="center"
              >
                <Heading size={"m"}>사회</Heading>
                {society.length == 0 ? (
                  <Heading size={"m"}>경기 결과가 없습니다</Heading>
                ) : (
                  society.map((item, index) => {
                    return (
                      <Box
                        key={index}
                        border="1px solid black"
                        w="100%"
                        h="50px"
                      >
                        <WalkthroughPopover props={item} index={index} />
                      </Box>
                    );
                  })
                )}
              </Box>
            </Flex>
          </Box>
          <Box marginTop="100px" border="1px solid black" h="450px" w="100%">
            광고
          </Box>
        </Grid>
      </Box>
    </>
  );
};
