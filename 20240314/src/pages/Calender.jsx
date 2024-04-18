import { Box, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
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

moment.locale("ko");

export default () => {
  const swiperStyle = {
    position: "relative",
    width: "90%",
    height: "200px",
    margin: "auto",
  };
  return (
    <>
      <Swiper
        style={swiperStyle}
        modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
        spaceBetween={20}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <Box height="10rem" width="100%">
            <Text textAlign={"center"} fontSize={"14"} fontWeight={"bold"}>
              1
            </Text>
            <Text textAlign={"center"} fontSize={"13"}>
              2
            </Text>
            <Text textAlign={"center"} fontSize={"13"}>
              2
            </Text>
            <Text textAlign={"center"} fontSize={"13"}>
              2
            </Text>
            <Text textAlign={"center"} fontSize={"13"}>
              2
            </Text>
            <Text textAlign={"center"} fontSize={"13"}>
              2
            </Text>
          </Box>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
