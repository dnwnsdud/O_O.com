import React, { useEffect, useState } from "react";
import {
  Box, Flex, Badge, Text, HStack, Button, border,
  Image, Tabs, TabList, Tab, TabIndicator, TabPanel, TabPanels, Grid, GridItem
} from '@chakra-ui/react';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Controller } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useNavigate } from "react-router-dom";

export default () => {

  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);
  let nav = useNavigate();

  const [stores, setStores] = useState([]);

  useEffect(() => {
    try {
      fetch('/api/showstore', { method: 'get' })
        .then(response => {
          if (response) {
            console.log(response);
            return response.json();
          }
          else {
            throw new Error(e);
          }
        })
        .then(data => {
          console.log("hi")
          if (data) {
            setStores(data);
          } else {
            alert(`사용자를 저장하는 동안 오류 발생:${data.error}`);
          }
        })
        .catch(error => {
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);




  // const maxBoxes=15;

  // const boxesPerRow = 5;
  // const rows = Math.ceil(maxBoxes / boxesPerRow);


  const swiperStyle = {
    position: "relative",
    width: "100%",
    height: "200px",
    border: "1px solid black",
    borderBottom: 'none',
  };

  const swiperStyle2 = {
    position: "relative",
    width: "100%",
    height: "200px",
    border: "1px solid black",
    borderTop: 'none'
  };



  return <Box width={'45%'} margin={'auto'}>
    <Box border={'1px solid black'} h='8rem'>
      광고
    </Box>
    <Button
      onClick={() => {
        nav("/stsubmit")
      }}
    >아이템입력</Button>

    <Tabs position="relative" variant="unstyled">
      <TabList>
        <Tab>슬라이더</Tab>
        <Tab>리스트</Tab>
      </TabList>
      <TabIndicator
        mt="-1.5px"
        height="2px"
        bg="blue.500"
        borderRadius="1px"
      />
      <TabPanels>
        <TabPanel>
          <Swiper style={swiperStyle}
            modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
            onSwiper={setFirstSwiper}
            controller={{ control: secondSwiper }}
            spaceBetween={10}
            slidesPerView={4}
            onSlideChange={() => console.log('slide change')}
          >
            {stores.map((store, index) => (
              index % 2 !== 0 && (
                <SwiperSlide key={index} >
                  <Box height='10rem' width='100%' border={'1px solid black'}>
                    <Box height='10rem' width='100%' border={'1px solid pink'}>
                      {/* <Box>{store.images}</Box> */}
                      <Image
                        src={store.images}
                        boxSize='100px'
                        objectFit='cover'
                        alt="아이템 이미지"
                      />
                      <Box>{store.title}</Box>
                      <Box>{store.price}</Box>
                    </Box>
                  </Box>
                </SwiperSlide>
              )
            ))}
          </Swiper>

          <Swiper style={swiperStyle2}
            modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
            spaceBetween={10}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
            onSwiper={setSecondSwiper}
            controller={{ control: firstSwiper }}
            scrollbar={{ draggable: true }}
            onSlideChange={() => console.log('slide change')}
          >
            {stores.map((store, index) => (
              index % 2 === 0 && (
                <SwiperSlide key={index} >
                  <Box height='10rem' width='100%' border={'1px solid black'}>
                    <Box height='10rem' width='100%' border={'1px solid pink'}>
                      {/* <Box>{store.images}</Box> */}
                      <Image
                        src={store.images}
                        boxSize='100px'
                        objectFit='cover'
                        alt="아이템 이미지"
                      />
                      <Box>{store.title}</Box>
                      <Box>{store.price}</Box>
                    </Box>
                  </Box>
                </SwiperSlide>
              )
            ))}
          </Swiper>
        </TabPanel>
        <TabPanel>
          <Grid templateColumns='repeat(5, 1fr)' gap={2}>
            {stores.map((store, index) => (
              <GridItem
                height='10rem' width='100%' border={'1px solid black'} key={index}>
                <Box height='10rem' width='100%' border={'1px solid pink'}>
                  {/* <Box>{store.images}</Box> */}
                  <Image
                    src={store.images}
                    boxSize='100px'
                    objectFit='cover'
                    alt="아이템 이미지"
                  />
                  <Box>{store.title}</Box>
                  <Box>{store.price}</Box>
                </Box>
              </GridItem>
            )
            )}
          </Grid>
        </TabPanel>
      </TabPanels>
    </Tabs>




  </Box >
}