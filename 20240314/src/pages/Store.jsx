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

  const swiperStyle = {
    position: "relative",
    width: "100%",
    height: "250px",
  };




  return <Box width={'45%'} margin={'auto'}>
    <Box border={'1px solid black'} h='8rem'>
      광고
    </Box>
    <Button
      onClick={() => {
        nav("/stsubmit")
      }}
      border={'1px solid #ddd'}
    >아이템등록</Button>
    {/* 관리자만 버튼 뜨게 */}

    <Tabs position="relative" variant="unstyled" my={'5rem'}>
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
          <Swiper style={swiperStyle}
            modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
            onSwiper={setFirstSwiper}
            controller={{ control: secondSwiper }}
            spaceBetween={40}
            slidesPerView={5}
            onSlideChange={() => console.log('slide change')}
          >
            {stores.map((store, index) => (
              index % 2 !== 0 && (
                <SwiperSlide key={index} >
                  <Box height='10rem' width='100%'>
                    {/* <Box>{store.images}</Box> */}

                    <Box w='100%' h='7rem' borderRadius={'8px'} overflow={'hidden'}>
                      <Image
                        src={store.images}
                        boxSize='100%'
                        objectFit='cover'
                        alt="아이템 이미지"
                        m='auto'
                      />
                    </Box>
                    <Text textAlign={'center'} fontSize={'14'} fontWeight={'bold'}>{store.title}</Text>
                    <Text textAlign={'center'} fontSize={'13'}>{store.price}원</Text>
                    <Flex justifyContent={'right'}>
                      <Button fontSize={10} w='10' h='5' border='1px solid #ddd'>삭제</Button>

                      <Button fontSize={10} w='10' h='5' border='1px solid #ddd'>구매</Button>
                      {/* 관리자는 삭제버튼 뜨게 일반 유저는 구매 버튼 뜨게 */}
                    </Flex>
                  </Box>
                </SwiperSlide>
              )
            ))}
          </Swiper>

          <Swiper style={swiperStyle}
            modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
            spaceBetween={40}
            slidesPerView={5}
            navigation
            pagination={{ clickable: true }}
            onSwiper={setSecondSwiper}
            controller={{ control: firstSwiper }}
            // scrollbar={{ draggable: true }}
            onSlideChange={() => console.log('slide change')}
          >
            {stores.map((store, index) => (
              index % 2 === 0 && (
                <SwiperSlide key={index} >
                  <Box height='10rem' width='100%' >
                    {/* <Box>{store.images}</Box> */}

                    <Box w='100%' h='7rem'>
                      <Image
                        src={store.images}
                        boxSize='100%'
                        objectFit='cover'
                        alt="아이템 이미지"
                        m='auto'
                      />
                    </Box>
                    <Text textAlign={'center'} fontSize={'14'}>{store.title}</Text>
                    <Text textAlign={'center'} fontSize={'13'}>{store.price}포인트</Text>
                    <Flex justifyContent={'right'}>
                      <Button fontSize={10} w='100%' h='5' border='1px solid #ddd'>구매</Button>
                      {/* 관리자는 삭제버튼 뜨게 일반 유저는 구매 버튼 뜨게 */}
                    </Flex>
                  </Box>
                </SwiperSlide>
              )
            ))}
          </Swiper>
        </TabPanel>
        <TabPanel>
          <Grid templateColumns='repeat(5, 1fr)' gap={19}>
            {stores.map((store, index) => (
              <GridItem
                height='10rem' width='90%' key={index}>
                {/* <Box>{store.images}</Box> */}
                <Box w='100%' h='7rem'>
                  <Image
                    src={store.images}
                    boxSize='100%'
                    objectFit='cover'
                    alt="아이템 이미지"
                    m='auto'
                  />
                </Box>
                <Text textAlign={'center'}>{store.title}</Text>
                <Text textAlign={'center'}>{store.price}</Text>
              </GridItem>
            )
            )}
          </Grid>
        </TabPanel>
      </TabPanels>
    </Tabs>




  </Box >
}