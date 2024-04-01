import React, { useEffect, useState } from "react";
import { Box, Flex, Badge, Text, HStack, Button, border } from '@chakra-ui/react';
import { Swiper, SwiperSlide,  } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Grid, Controller } from 'swiper/modules';
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
        fetch('/api/showstore',{method:'get'})
        .then(response => {
            if (response) {
                console.log(response);
                return response.json();
              } 
              else{
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
    border:"1px solid black",
    borderBottom:'none',
  };
  
  const swiperStyle2 = {
    position: "relative",
    width: "100%",
    height: "200px",
    border:"1px solid black",
    borderTop:'none'
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
              <Box>{store.images}</Box>
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
              <Box>{store.images}</Box>
              <Box>{store.title}</Box>
              <Box>{store.price}</Box>
            </Box>
        </Box>
      </SwiperSlide>
    )
  ))}
</Swiper>


  </Box>
}