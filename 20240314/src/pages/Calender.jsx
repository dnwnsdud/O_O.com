import React, { useEffect, useState, useContext } from "react";
import {
  Box, Flex, Badge, Text, HStack, Button, border,
  Image, Tabs, TabList, Tab, TabIndicator, TabPanel, TabPanels, Grid, GridItem, SimpleGrid, Card, CardHeader, Heading, CardBody, CardFooter
} from '@chakra-ui/react';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Controller } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hook/User";
import moment from "moment";
import { momentLocalizer } from "react-big-calendar";

moment.locale("ko");
const localizer = momentLocalizer(moment);

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
        onSlideChange={() => console.log('slide change')}
      >

        <SwiperSlide>
          <Box height='10rem' width='100%' >
            <Text textAlign={'center'} fontSize={'14'} fontWeight={'bold'}>1</Text>
            <Text textAlign={'center'} fontSize={'13'}>2</Text>
            <Text textAlign={'center'} fontSize={'13'}>2</Text>
            <Text textAlign={'center'} fontSize={'13'}>2</Text>
            <Text textAlign={'center'} fontSize={'13'}>2</Text>
            <Text textAlign={'center'} fontSize={'13'}>2</Text>

          </Box>
        </SwiperSlide>

      </Swiper >

    </>
  );
};