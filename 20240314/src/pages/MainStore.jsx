import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Image,
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

export default () => {
  let nav = useNavigate();
  const { user } = useContext(UserContext);
  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const [alert, setAlert] = useState("");
  const cancelRef = React.useRef();

  const swiperStyle = {
    position: "relative",
    width: "90%",
    height: "250px",
    margin: "auto",
  };

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
            // 나중에 경로 생각좀
          } else if (!data.success && data.message) {
            setAlert(data.message);
            onOpen2();
          }
        })
        .catch((error) => {});
    }
  };

  return (
    <>
      <Swiper
        style={swiperStyle}
        modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
        spaceBetween={10}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
      >
        {stores.map((store, index) => (
          <SwiperSlide key={index}>
            <Card minH={"20rem"}>
              <CardBody>
                <Box>
                  <Box
                    borderRadius={"8px"}
                    overflow={"hidden"}
                    onClick={() => {
                      nav("/st");
                    }}
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
                    minH={"3rem"}
                    alignContent={"center"}
                  >
                    {store.title}
                  </Text>
                  <Text textAlign={"center"} fontSize={"13"}>
                    {store.price}원
                  </Text>
                  <Flex justifyContent={"right"}>
                    {user.role === "admin" ? (
                      ""
                    ) : (
                      <Button
                        fontSize={10}
                        w="100%"
                        h="5"
                        border="1px solid #ddd"
                        onClick={(e) =>
                          buyStore(e, store.price, store.title, store.images)
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
        ))}
      </Swiper>
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
    </>
  );
};
