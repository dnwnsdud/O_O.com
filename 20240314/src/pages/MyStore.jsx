import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
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

  const swiperStyle = {
    position: "relative",
    width: "90%",
    height: "100%",
    margin: "20px auto",
  };
  const [stores, setStores] = useState([]);
  const [usestores, setuseStores] = useState([]);

  const {
    isOpen: isOpen,
    onOpen: onOpen,
    onClose: onClose,
    cancelRef,
  } = useDisclosure();

  useEffect(() => {
    try {
      fetch("/api/showitems", { method: "get" })
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

  useEffect(() => {
    try {
      fetch("/api/showuseitems", { method: "get" })
        .then((response) => {
          if (response) {
            return response.json();
          } else {
            throw new Error(e);
          }
        })
        .then((data) => {
          if (data) {
            setuseStores(data);
          } else {
            alert(`상품을 출력하는 동안 오류 발생:${data.error}`);
          }
        })
        .catch((error) => {});
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const usemyitem = (e, title, id) => {
    e.preventDefault();
    fetch("/api/usemyitem", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id, title: title }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          onOpen();
        } else {
          alert("오류가 발생했습니다.");
        }
      })
      .catch((error) => {
        console.error("아이템 사용 실패 : ", error);
      });
  };

  return (
    <Box bg="#fff" 
    // minH={"30rem"}
     alignContent={"center"}>
      {stores.length > 0 ? (
        <Swiper
          style={swiperStyle}
          modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
          spaceBetween={10}
          slidesPerView={7}
          pagination={{ clickable: true }}
        >
          {stores.map((store, index) => (
            <SwiperSlide key={index}>
              <Box
                bg="#fff"
                border={"1px solid #f7f7f8"}
                minH="13rem"
                alignContent={"center"}
                borderRadius={"10px"}
                shadow={"base"}
              >
                <Box
                  w="100%"
                  h="7rem"
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
                  name="title"
                >
                  {store.title}
                </Text>
                <Button
                  size="sm"
                  margin={"auto"}
                  w="100%"
                  border="1px solid #e6e6ea"
                  onClick={(e) =>
                    usemyitem(
                      e,
                      store.title,
                      store._id,
                      store.images,
                      store.price
                    )
                  }
                >
                  사용하기
                </Button>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Box>구매하신 상품이 없습니다.</Box>
      )}

      {usestores.length > 0 ? (
        <Swiper
          style={swiperStyle}
          modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
          spaceBetween={10}
          slidesPerView={7}
          pagination={{ clickable: true }}
        >
          {usestores.map((store, index) => (
            <SwiperSlide key={index}>
              <Box
                bg="#fff"
                border={"1px solid #f7f7f8"}
                minH="13rem"
                alignContent={"center"}
                borderRadius={"10px"}
                shadow={"base"}
              >
                <Box
                  w="100%"
                  h="7rem"
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
                  name="title"
                >
                  {store.title}
                </Text>
                <Button
                  size="sm"
                  margin={"auto"}
                  w="100%"
                  border="1px solid #e6e6ea"
                  onClick={() => {
                    nav("/topicrequest/:category");
                  }}
                  color="darkblue"
                >
                  사용중
                </Button>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        ""
      )}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fillontSize="lg" fontWeight="bold">
              아이템 사용 확인
            </AlertDialogHeader>
            <AlertDialogBody>아이템이 사용되었습니다.</AlertDialogBody>
            <AlertDialogFooter>
              <Button
                bg={"#53535f !important"}
                color={"#ffffff"}
                onClick={() => {
                  onClose();
                  nav("/topicrequest/:category");
                }}
                ml={3}
              >
                확인
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};
