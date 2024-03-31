import React, { useEffect, useState } from "react";
import { Box, Flex, Badge, Text, HStack, Button, border } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useNavigate } from "react-router-dom";

export default () => {
  
  let nav = useNavigate();

  const [stores, setStores] = useState([])

  useEffect(()=> {
    console.log("ddd");
    fetch('/app/storeshow', {
      method:"GET",
      headers: {
          "Content-Type":"application/json; charset=utf-8",
      },
    }).then(res=>
      res.json())
    .then(res=>{
      console.log(res);
      setStores(res);
    });
  }, []);

  const maxBoxes=15;

  const boxesPerRow = 5;
  const rows = Math.ceil(maxBoxes / boxesPerRow);

  const swiperStyle = {
    position: "relative",
    width: "100%",
    height: "500px",
    border:"1px solid black",
  };
  
  const swiperStyle2 = {
    position: "relative",
    width: "100%",
    height: "100px",
    border:"1px solid black",
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
    <Box my='2rem'>
      <Button px='2' color={'black'}>슬라이더</Button>
      <Button px='2' color={'black'}>리스트</Button>
    </Box>
    <Box height='10rem' width='100%' border={'1px solid black'}>
      {stores.map((store)=>(
        <StoreItem key={store.id} store={store}/>
      ))} 
    </Box>
    <Swiper style={swiperStyle}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>
      <HStack spacing='24px' mb={'2rem'}>
      {[...Array(maxBoxes)].map((_, index) => (
        <Box
          key={index}
          maxW='10rem'
          maxH='10rem'
          borderWidth='1px'
          borderRadius='lg'
          overflow='hidden'
          display={index < maxBoxes ? 'block' : 'none'} // 초과된 요소는 숨기기
        >
          <Box>이미지가 들어간답니다</Box>
          <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='teal'>
              New
            </Badge>
            <Text>새로운 아이템이에여오</Text>
          </Box>
        </Box>
      ))}
    </HStack>
      </SwiperSlide>
      <SwiperSlide>
          <Box>
            {[...Array(rows)].map((_, rowIndex) => (
              <Box key={rowIndex} display="flex">
                {[...Array(boxesPerRow)].map((_, colIndex) => {
                  const boxIndex = rowIndex * boxesPerRow + colIndex;
                  if (boxIndex >= maxBoxes) return null;
                  return (
                    <Box
                    my={colIndex < boxesPerRow  ? '24px' : '0'}
                    key={boxIndex}
                      maxW='10rem'
                      maxH='10rem'
                      borderWidth='1px'
                      borderRadius='lg'
                      overflow='hidden'
                      mr={colIndex < boxesPerRow - 1 ? '24px' : '0'}
                    >
                      <Box>이미지가 들어간답니다</Box>
                      <Box display='flex' alignItems='baseline'>
                        <Badge borderRadius='full' px='2' colorScheme='teal'>
                          New
                        </Badge>
                        <Text>새로운 아이템이에여오</Text>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            ))}
          </Box>
        </SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>

    <Swiper style={swiperStyle2}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={6}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>
        <Box >
          <Box fontSize={'0.5rem'}>이미지가 들어간답니다</Box>
          <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='0.2' colorScheme='teal'>
              New
            </Badge>
            <Text fontSize={'0.5rem'}>새로운 아이템이에여오</Text>
          </Box>
        </Box>
        </SwiperSlide>
      <SwiperSlide>`1</SwiperSlide>
      <SwiperSlide>`1</SwiperSlide>
      <SwiperSlide>`1</SwiperSlide>
      <SwiperSlide>`1</SwiperSlide>
      <SwiperSlide>`1</SwiperSlide>
      <SwiperSlide>`1</SwiperSlide>
      <SwiperSlide>`1</SwiperSlide>
      <SwiperSlide>`1</SwiperSlide>
      <SwiperSlide>`1</SwiperSlide>
      <SwiperSlide>`1</SwiperSlide>
    </Swiper>

  </Box>
}