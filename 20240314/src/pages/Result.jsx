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
  Divider,
  Spinner
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../hook/User";
import Calender from "./Calender";

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

  const [main, setMain] = useState([]);
  const [baseball, setBaseball] = useState([]);
  const [lol, setLol] = useState([]);
  const [soccer, setSoccer] = useState([]);
  const [society, setSociety] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  const { day, setDay } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [day]);

  const win = (color) => (
    <Flex position={"absolute"} top={0} left={"10px"} w={"15%"}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={"100%"}
        viewBox="0 0 576 512"
        fill={color || "#f5bf42"}
      >
        <path d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z" />
      </svg>
    </Flex>
  );
  const lose = (color) => (
    <Flex position={"absolute"} top={0} left={"10px"} w={"15%"}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={"100%"}
        fill={color || "#676d78"}
        viewBox="0 0 512 512"
      >
        <path d="M426.8 14.2C446-5 477.5-4.6 497.1 14.9s20 51 .7 70.3c-14.8 14.8-65.7 23.6-88.3 26.7c-5.6 .9-10.3-3.9-9.5-9.5C403.3 79.9 412 29 426.8 14.2zM75 75C158.2-8.3 284.5-22.2 382.2 33.2c-1.5 4.8-2.9 9.6-4.1 14.3c-3.1 12.2-5.5 24.6-7.3 35c-80.8-53.6-190.7-44.8-261.9 26.4C37.7 180.1 28.9 290 82.5 370.8c-10.5 1.8-22.9 4.2-35 7.3c-4.7 1.2-9.5 2.5-14.3 4.1C-22.2 284.5-8.2 158.2 75 75zm389.6 58.9c4.7-1.2 9.5-2.5 14.3-4.1C534.2 227.5 520.2 353.8 437 437c-83.2 83.2-209.5 97.2-307.2 41.8c1.5-4.8 2.8-9.6 4-14.3c3.1-12.2 5.5-24.6 7.3-35c80.8 53.6 190.7 44.8 261.9-26.4c71.2-71.2 80-181.1 26.4-261.9c10.5-1.8 22.9-4.2 35-7.3zm-105.4 93c10.1-16.3 33.9-16.9 37.9 1.9c9.5 44.4-3.7 93.5-39.3 129.1s-84.8 48.8-129.1 39.3c-18.7-4-18.2-27.8-1.9-37.9c25.2-15.7 50.2-35.4 73.6-58.8s43.1-48.4 58.8-73.6zM92 265.3l97.4-29.7c11.6-3.5 22.5 7.3 19 19l-29.7 97.4c-2.6 8.6-13.4 11.3-19.8 4.9c-2-2-3.2-4.6-3.4-7.3l-5.1-56.1-56.1-5.1c-2.8-.3-5.4-1.5-7.3-3.4c-6.3-6.3-3.6-17.2 4.9-19.8zm193-178.2c2 2 3.2 4.6 3.4 7.3l5.1 56.1 56.1 5.1c2.8 .3 5.4 1.5 7.3 3.4c6.3 6.3 3.6 17.2-4.9 19.8l-97.4 29.7c-11.6 3.5-22.5-7.3-19-19L265.3 92c2.6-8.6 13.4-11.3 19.8-4.9zM14.9 497.1c-19.6-19.6-20-51-.7-70.3C29 412 79.8 403.2 102.4 400.1c5.6-.9 10.3 3.9 9.5 9.5c-3.2 22.5-11.9 73.5-26.7 88.3C66 517 34.5 516.6 14.9 497.1z" />
      </svg>
    </Flex>
  );
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
        <PopoverContent color="black" bg="#f5f7f8" borderColor="#f5f7f8">
          <PopoverArrow bg="#f5f7f8" />
          <PopoverCloseButton />
          <PopoverHeader fontWeight="bold" minH="7rem" alignContent={"center"}>
            {props.title}
          </PopoverHeader>
          <PopoverBody minH={"8rem"}>
            <Box>
              {props.leftSide.participants.length >
                props.rightSide.participants.length
                ? "left win"
                : props.leftSide.participants.length <
                  props.rightSide.participants.length
                  ? "right win"
                  : "draw"}
            </Box>
            <Flex fontWeight={"normal"} h="8rem" gap="1">
              <Box
                fontSize={"15px"}
                w="50%"
                border="1px solid #dedee3"
                alignContent={"center"}
              >
                <Text>{props.leftSide.title}</Text>
                <Text>{props.leftSide.content}</Text>
              </Box>
              <Box w="50%" border="1px solid #dedee3" alignContent={"center"}>
                <Text>{props.rightSide.title}</Text>
                <Text>{props.rightSide.content}</Text>
              </Box>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <Box bg="#f7f7f8">
      {isLoading && Loading("center", "center", "100%", "100%")}
      {!isLoading && <Box maxW="1280px" margin="auto" bg="#f7f7f8" py="10">
        <Box maxW="800px" margin="auto">
          <Calender
            color={main.map((item) => {
              return item.leftSide.participants.length >
                item.rightSide.participants.length
                ? "red"
                : item.leftSide.participants.length <
                  item.rightSide.participants.length
                  ? "blue"
                  : "#f5f7f8";
            })}
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
          <Box marginTop="100px" border="1px solid black" h="450px" w="100%">
            광고
          </Box>
          <Box margin="20px 0" w="100%">
            <Box
              overflow={"hidden"}
              border="1px solid #dedee3"
              borderRadius={"10px"}
              shadow={"base"}
              w="100%"
              maxH="350px"
              h={"100%"}
              marginBottom="10px"
              textAlign="center"
              fontWeight="bold"
              fontSize="1.5 rem"
              bg="#fff"
            >
              <Heading my={2}>O_O</Heading>
              {main.length == 0 ? (
                <Heading mt={"30px"} size={"2xl"}>
                  경기 결과가 없습니다
                </Heading>
              ) : (
                main.map((item, index) => {
                  return (
                    <Flex
                      direction={"column"}
                      key={index}
                      w="100%"
                      h="100%"
                      bg={
                        item.leftSide.participants.length >
                          item.rightSide.participants.length
                          ? "crimson"
                          : item.leftSide.participants.length <
                            item.rightSide.participants.length
                            ? "#3b82f6d9"
                            : "#f5f7f8"
                      }
                      borderTop={"1px solid #E2E8F0"}
                      p={4}
                      gap={4}
                    >
                      <Heading size={"lg"}>{item.title}</Heading>
                      <Divider borderColor={"#E2E8F0"} borderWidth={"medium"} />
                      <Box h={"60%"}>
                        <Flex h={"100%"}>
                          <Flex
                            w="50%"
                            direction={"column"}
                            justifyContent={"space-evenly"}
                            position={"relative"}
                          >
                            {item.leftSide.participants.length >
                              item.rightSide.participants.length
                              ? win("#f5bf42")
                              : item.leftSide.participants.length <
                                item.rightSide.participants.length
                                ? lose("#676d78")
                                : "draw"}
                            <Heading size={"md"}>{item.leftSide.title}</Heading>
                            <Text>{item.leftSide.content}</Text>
                          </Flex>
                          <Divider
                            orientation="vertical"
                            borderColor={"#E2E8F0"}
                            borderWidth={"medium"}
                            borderStyle={"dashed"}
                          />
                          <Flex
                            w="50%"
                            direction={"column"}
                            justifyContent={"space-evenly"}
                            position={"relative"}
                          >
                            {item.leftSide.participants.length <
                              item.rightSide.participants.length
                              ? win("#f5bf42")
                              : item.leftSide.participants.length >
                                item.rightSide.participants.length
                                ? lose("#676d78")
                                : "draw"}
                            <Heading size={"md"}>
                              {item.rightSide.title}
                            </Heading>
                            <Text>{item.rightSide.content}</Text>
                          </Flex>
                        </Flex>
                      </Box>
                    </Flex>
                  );
                })
              )}
            </Box>
            <Flex gap="10px" padding="10px">
              <Box
                border="1px solid #dedee3"
                borderRadius={"10px"}
                w="100%"
                h="150px"
                textAlign="center"
                bg="#fff"
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
                        margin={"auto"}
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
                borderRadius={"10px"}
                w="100%"
                h="150px"
                textAlign="center"
                bg="#fff"
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
                        margin={"auto"}
                      >
                        <WalkthroughPopover props={item} index={index} />
                      </Box>
                    );
                  })
                )}
              </Box>
              <Box
                border="1px solid #dedee3"
                borderRadius={"10px"}
                w="100%"
                h="150px"
                textAlign="center"
                bg="#fff"
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
                        m="auto"
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
                borderRadius={"10px"}
                w="100%"
                h="150px"
                textAlign="center"
                bg="#fff"
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
                        m="auto"
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
      </Box>}
    </Box>
  );
};
