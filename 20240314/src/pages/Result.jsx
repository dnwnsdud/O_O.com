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
  const WalkthroughPopover = ({ props }) => {
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
              console.log(props);
            }}
          >
            {props.title}
          </Button>
        </PopoverTrigger>
        <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
          <PopoverHeader pt={4} fontWeight="bold" border="0">
            Manage Your Channels
          </PopoverHeader>
          <PopoverArrow bg="blue.800" />
          <PopoverCloseButton />
          <PopoverBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </PopoverBody>
          <PopoverFooter
            border="0"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            pb={4}
          >
            <Box fontSize="sm">Step 2 of 4</Box>
            <ButtonGroup size="sm">
              <Button colorScheme="green">Setup Email</Button>
              <Button colorScheme="blue" ref={initialFocusRef}>
                Next
              </Button>
            </ButtonGroup>
          </PopoverFooter>
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
                ) : baseball.length > 0 && baseball.length == 1 ? (
                  <Box>
                    <Heading size={"m"}>{baseball[0].title}</Heading>
                    <Box>
                      {baseball[0].leftSide.participants.length >
                      baseball[0].rightSide.participants.length ? (
                        <Box>
                          <Text>왼쪽 진영 승</Text>
                          <Text>{baseball[0].leftSide.title}</Text>
                        </Box>
                      ) : baseball[0].rightSide.participants.length >
                        baseball[0].leftSide.participants.length ? (
                        <Box>
                          <Text>오른쪽 진영 승</Text>
                          <Text>{baseball[0].rightSide.title}</Text>
                        </Box>
                      ) : (
                        "무승부"
                      )}
                    </Box>
                  </Box>
                ) : (
                  baseball.map((item, index) => {
                    return (
                      <Box
                        key={index}
                        border="1px solid black"
                        w="100%"
                        h="50px"
                      >
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
              <Box
                border="1px solid black"
                w="100%"
                h="150px"
                textAlign="center"
              >
                <Heading size={"m"}>LOL</Heading>
                {lol.length == 0 ? (
                  <Heading size={"m"}>경기 결과가 없습니다</Heading>
                ) : lol.length > 0 && lol.length == 1 ? (
                  <Box>
                    <Heading size={"m"}>{lol[0].title}</Heading>
                    <Box>
                      {lol[0].leftSide.participants.length >
                      lol[0].rightSide.participants.length ? (
                        <Box>
                          <Text>왼쪽 진영 승</Text>
                          <Text>{lol[0].leftSide.title}</Text>
                        </Box>
                      ) : lol[0].rightSide.participants.length >
                        lol[0].leftSide.participants.length ? (
                        <Box>
                          <Text>오른쪽 진영 승</Text>
                          <Text>{lol[0].rightSide.title}</Text>
                        </Box>
                      ) : (
                        "무승부"
                      )}
                    </Box>
                  </Box>
                ) : (
                  lol.map((item, index) => {
                    return (
                      <Box
                        key={index}
                        border="1px solid black"
                        w="100%"
                        h="50px"
                      >
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
              <Box
                border="1px solid black"
                w="100%"
                h="150px"
                textAlign="center"
              >
                <Heading size={"m"}>축구</Heading>
                {soccer.length == 0 ? (
                  <Heading size={"m"}>경기 결과가 없습니다</Heading>
                ) : soccer.length > 0 && soccer.length == 1 ? (
                  <Box>
                    <Heading size={"m"}>{soccer[0].title}</Heading>
                    <Box>
                      {soccer[0].leftSide.participants.length >
                      soccer[0].rightSide.participants.length ? (
                        <Box>
                          <Text>왼쪽 진영 승</Text>
                          <Text>{soccer[0].leftSide.title}</Text>
                        </Box>
                      ) : soccer[0].rightSide.participants.length >
                        soccer[0].leftSide.participants.length ? (
                        <Box>
                          <Text>오른쪽 진영 승</Text>
                          <Text>{soccer[0].rightSide.title}</Text>
                        </Box>
                      ) : (
                        "무승부"
                      )}
                    </Box>
                  </Box>
                ) : (
                  soccer.map((item, index) => {
                    return (
                      <Box
                        key={index}
                        border="1px solid black"
                        w="100%"
                        h="50px"
                      >
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
              <Box
                border="1px solid black"
                w="100%"
                h="150px"
                textAlign="center"
              >
                <Heading size={"m"}>사회</Heading>
                {society.length == 0 ? (
                  <Heading size={"m"}>경기 결과가 없습니다</Heading>
                ) : society.length > 0 && society.length == 1 ? (
                  <Box>
                    <Heading size={"m"}>
                      <WalkthroughPopover props={society[0]} />
                    </Heading>
                  </Box>
                ) : (
                  society.map((item, index) => {
                    return (
                      <Box
                        key={index}
                        border="1px solid black"
                        w="100%"
                        h="50px"
                      >
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
