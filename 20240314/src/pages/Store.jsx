import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Img,
  SimpleGrid,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  A11y,
  Controller,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { UserContext } from "../hook/User";
import Payment from "./Payment";

export default () => {
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);
  const { user } = useContext(UserContext);
  let nav = useNavigate();
  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const [alert, setAlert] = useState("");
  const cancelRef = React.useRef();

  const [stores, setStores] = useState([]);

  useEffect(() => {
    try {
      fetch("/api/showstore", { method: "get" })
        .then((response) => {
          if (response) {
            return response.json();
          } else {
            throw new Error(e);
          }
        })
        .then((data) => {
          if (data) {
            setStores(data);
          } else {
            alert(`상품을 출력하는 동안 오류 발생:${data.error}`);
          }
        })
        .catch((error) => {});
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const swiperStyle = {
    position: "relative",
    width: "100%",
    height: "250px",
  };

  const deleteSubmit = (e, id) => {
    e.preventDefault();
    alert("삭제하시겠습니까?");
    fetch("/api/storedelete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("삭제되었습니다.");
          nav("/");
        } else {
          alert("오류가 발생했습니다.");
        }
      })
      .catch((error) => {
        console.error("아이템 삭제 실패 : ", error);
      });
  };

  const buyStore = (e, price, title, images) => {
    if (user == "logout") {
      setAlert("login");
      onOpen();
    } else {
      let body = {
        title: title,
        price: price,
        images: images,
        email: user.email,
      };
      fetch("/api/storebuy", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              alert(`구매 실패: ${data.message}`);
              throw new Error(
                `Server responded with status ${response.status}`
              );
            });
          }
          return response.json();
        })
        .then((data) => {
          if (data.success && data.message) {
            setAlert(data.message);
            onOpen2();
          } else if (!data.success && data.message) {
            setAlert(data.message);
            onOpen2();
          }
        })
        .catch((error) => {});
    }
  };

  return (
    <Box bg="#f7f7f8">
      <Box width={"45%"} margin={"auto"}>
        <Box overflow="hidden" h={"12rem"} pt="10">
          <Img
            objectFit="cover"
            w="100%"
            h="150%"
            src="/static/img/광고2.jpg"
          ></Img>
        </Box>
        {user.role === "admin" ? (
          <Button
            onClick={() => {
              nav("/stsubmit");
            }}
            border={"1px solid #ddd"}
          >
            아이템등록
          </Button>
        ) : null}

        <SimpleGrid
          spacing={4}
          templateColumns={"repeat(auto-fill, minmax(30%, 1fr))"}
          my="20"
        >
          <Card h="10rem">
            <CardHeader h="3rem">
              <Heading size={"md"}>5000 포인트</Heading>
            </CardHeader>
            <CardBody pb="0">
              <Text>5000원</Text>
            </CardBody>
            <CardFooter>
              <Payment price={5000} title={"5000포인트"} id={5555555555} />
            </CardFooter>
          </Card>

          <Card h="10rem">
            <CardHeader h="3rem">
              <Heading size={"md"}>10000 포인트</Heading>
            </CardHeader>
            <CardBody pb="0">
              <Text>10000원</Text>
            </CardBody>
            <CardFooter>
              <Payment price={10000} title={"10000포인트"} id={1111111} />
            </CardFooter>
          </Card>

          <Card h="10rem">
            <CardHeader h="3rem">
              <Heading size={"md"}>50000 포인트</Heading>
            </CardHeader>
            <CardBody py="0">
              <Badge variant="outline" colorScheme="blue">
                할인
              </Badge>
              <Flex gap={1} alignItems={"center"}>
                <Text as="del" fontSize={"sm"}>
                  50000원
                </Text>
                <Text>48000원</Text>
              </Flex>
            </CardBody>
            <CardFooter>
              <Payment t price={48000} title={"50000포인트"} id={5555555} />
            </CardFooter>
          </Card>
        </SimpleGrid>

        <Tabs position="relative" variant="unstyled" mt={"5rem"}>
          <TabList>
            <Tab>슬라이드</Tab>
            <Tab>리스트</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="3px"
            bg="black"
            borderRadius="2px"
          />
          <TabPanels>
            <TabPanel>
              <Swiper
                style={swiperStyle}
                modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
                onSwiper={setFirstSwiper}
                controller={{ control: secondSwiper }}
                spaceBetween={40}
                slidesPerView={5}
              >
                {stores.map(
                  (store, index) =>
                    index % 2 !== 0 && (
                      <SwiperSlide key={index}>
                        <Card minH={"15rem"}>
                          <CardBody>
                            <Box width="100%" bg="white">
                              <Box
                                w="100%"
                                h="7rem"
                                borderRadius={"8px"}
                                overflow={"hidden"}
                              >
                                <Image
                                  src={store.images}
                                  boxSize="100%"
                                  objectFit="cover"
                                  alt="아이템 이미지"
                                  m="auto"
                                />
                              </Box>
                              <Text
                                textAlign={"center"}
                                fontSize={"14"}
                                fontWeight={"bold"}
                              >
                                {store.title}
                              </Text>
                              <Text textAlign={"center"} fontSize={"13"}>
                                {store.price}원
                              </Text>
                              <Flex justifyContent={"right"}>
                                {user.role === "admin" ? (
                                  <Button
                                    fontSize={10}
                                    w="100%"
                                    h="5"
                                    border="1px solid #ddd"
                                    onClick={(e) => deleteSubmit(e, store._id)}
                                  >
                                    삭제
                                  </Button>
                                ) : (
                                  <Button
                                    fontSize={10}
                                    w="100%"
                                    h="5"
                                    border="1px solid #ddd"
                                    onClick={(e) =>
                                      buyStore(
                                        e,
                                        store.price,
                                        store.title,
                                        store.images
                                      )
                                    }
                                  >
                                    구매
                                  </Button>
                                )}
                              </Flex>
                            </Box>
                          </CardBody>
                        </Card>
                      </SwiperSlide>
                    )
                )}
              </Swiper>

              <Swiper
                style={swiperStyle}
                modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
                spaceBetween={40}
                slidesPerView={5}
                navigation
                pagination={{ clickable: true }}
                onSwiper={setSecondSwiper}
                controller={{ control: firstSwiper }}
              >
                {stores.map(
                  (store, index) =>
                    index % 2 === 0 && (
                      <SwiperSlide key={index}>
                        <Card minH={"15rem"}>
                          <CardBody>
                            <Box width="100%" bg="white">
                              <Box
                                w="100%"
                                h="7rem"
                                borderRadius={"8px"}
                                overflow={"hidden"}
                              >
                                <Image
                                  src={store.images}
                                  boxSize="100%"
                                  objectFit="cover"
                                  alt="아이템 이미지"
                                  m="auto"
                                  name="images"
                                />
                              </Box>
                              <Text
                                textAlign={"center"}
                                fontSize={"14"}
                                fontWeight={"bold"}
                                name="title"
                              >
                                {store.title}
                              </Text>
                              <Text
                                textAlign={"center"}
                                fontSize={"13"}
                                name="price"
                              >
                                {store.price}원
                              </Text>
                              <Flex justifyContent={"right"}>
                                {user.role === "admin" ? (
                                  <Button
                                    fontSize={10}
                                    w="100%"
                                    h="5"
                                    border="1px solid #ddd"
                                    onClick={(e) => deleteSubmit(e, store._id)}
                                  >
                                    삭제
                                  </Button>
                                ) : (
                                  <Button
                                    fontSize={10}
                                    w="100%"
                                    h="5"
                                    border="1px solid #ddd"
                                    onClick={(e) =>
                                      buyStore(
                                        e,
                                        store.price,
                                        store.title,
                                        store.images
                                      )
                                    }
                                  >
                                    구매
                                  </Button>
                                )}
                              </Flex>
                            </Box>
                          </CardBody>
                        </Card>
                      </SwiperSlide>
                    )
                )}
              </Swiper>
            </TabPanel>
            <TabPanel>
              <Grid templateColumns="repeat(5, 1fr)" gap={19}>
                {stores.map((store, index) => (
                  <GridItem width="90%" key={index}>
                    {/* <Box>{store.images}</Box> */}
                    <Card bg="white" minH={"15rem"}>
                      <CardBody>
                        <Box
                          w="100%"
                          h="7rem"
                          borderRadius={"8px"}
                          overflow={"hidden"}
                        >
                          <Image
                            src={store.images}
                            boxSize="100%"
                            objectFit="cover"
                            alt="아이템 이미지"
                            m="auto"
                          />
                        </Box>
                        <Text
                          textAlign={"center"}
                          fontSize={"14"}
                          fontWeight={"bold"}
                        >
                          {store.title}
                        </Text>
                        <Text textAlign={"center"} fontSize={"13"}>
                          {store.price}원
                        </Text>
                        <Flex justifyContent={"right"}>
                          {user.role === "admin" ? (
                            <Button
                              fontSize={10}
                              w="100%"
                              h="5"
                              border="1px solid #ddd"
                              onClick={(e) => deleteSubmit(e, store._id)}
                            >
                              삭제
                            </Button>
                          ) : (
                            <Button
                              fontSize={10}
                              w="100%"
                              h="5"
                              border="1px solid #ddd"
                              onClick={(e) =>
                                buyStore(
                                  e,
                                  store.price,
                                  store.title,
                                  store.images
                                )
                              }
                            >
                              구매
                            </Button>
                          )}
                        </Flex>
                      </CardBody>
                    </Card>
                  </GridItem>
                ))}
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={alert == "login" ? onClose : onClose2}
        isOpen={alert == "login" ? isOpen : isOpen2}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>
            {alert == "login" ? "로그인 오류" : "구매확인"}
          </AlertDialogHeader>
          <AlertDialogBody>
            {alert == "login" ? "로그인이 필요합니다!" : alert}
          </AlertDialogBody>
          <AlertDialogFooter>
            {alert == "login" ? (
              <Button
                sx={{
                  backgroundColor: "#53535f !important",
                  color: "#ffffff",
                }}
                onClick={onClose}
                ml={3}
              >
                돌아가기
              </Button>
            ) : (
              <Button
                sx={{
                  backgroundColor: "#53535f !important",
                  color: "#ffffff",
                }}
                onClick={() => {
                  onClose2(), nav("/");
                }}
                ml={3}
              >
                확인
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};
