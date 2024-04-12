import React, { useEffect, useState , useContext} from "react";
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
import Payment from "./Payment";
import { UserContext } from "../hook/User";

export default () => {

  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);
  const { user } = useContext(UserContext);
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
            alert(`상품을 출력하는 동안 오류 발생:${data.error}`);
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


  const deleteSubmit = (e, id) => {
    e.preventDefault();
    console.log('삭제');
    console.log('내 아이디다' + id);
    alert('삭제하시겠습니까?');
    fetch('/api/storedelete', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ _id: id }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.success) {
          alert('삭제되었습니다.')
          nav("/");
        } else {
          alert('오류가 발생했습니다.')
          console.log('삭제 실패얌')
        }
      })
      .catch(error => {
        console.error('아이템 삭제 실패 : ', error);
      })
  }


  const buyStore = (e, price, title, images) => {
    if(user == "logout"){
      alert("로그인이 필요합니다!");
    }else{
    console.log('구매 가격' + price);
    console.log(title);
    console.log(images);
    console.log(user.email);
    let body = {
        title:title,
        price:price,
        images:images,
        email: user.email
      }
    console.log("body:", body);
    alert('구매하시겠습니까?');
    fetch(
      "/api/storebuy",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
      console.log(body)
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        alert("구매가 완료되었습니다.");
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          nav("/");
          // 나중에 경로 생각좀
        } else {
          console.log(data.error);
          alert(`사용자를 저장하는 동안 오류 발생:${data.error}`);
        }
      })
      .catch((error) => { });
    }
  }


  return <Box width={'45%'} margin={'auto'}>
    <Box border={'1px solid black'} h='8rem'>
      광고
    </Box>
    {
      user.role === "admin" ?
    <Button
      onClick={() => {
        nav("/stsubmit")
      }}
      border={'1px solid #ddd'}
    >아이템등록</Button>
     : null
    }
    {/* 관리자만 버튼 뜨게 */}

    <SimpleGrid spacing={4} templateColumns={'repeat(auto-fill, minmax(30%, 1fr))'} my='2'>
      <Card h='10rem'>
        <CardHeader h='3rem'>
          <Heading size={'md'}>5000 포인트</Heading>
        </CardHeader>
        <CardBody pb='0'>
          <Text>
            5000원
          </Text>
        </CardBody>
        <CardFooter>
          <Payment price={5000} title={'5000포인트'} id={5555555555} />
        </CardFooter>
      </Card>

      <Card h='10rem'>
        <CardHeader h='3rem'>
          <Heading size={'md'}>10000 포인트</Heading>
        </CardHeader>
        <CardBody pb='0'>
          <Text>
            10000원
          </Text>
        </CardBody>
        <CardFooter>
          <Payment price={10000} title={'10000포인트'} id={1111111} />
        </CardFooter>
      </Card>

      <Card h='10rem'>
        <CardHeader h='3rem'>
          <Heading size={'md'}>50000 포인트</Heading>
        </CardHeader>
        <CardBody py='0' >
          <Badge variant='outline' colorScheme="blue">
            할인
          </Badge>
          <Flex>
            <Text as='del' fontSize={'sm'}>
              50000원
            </Text>
            <Text>
              48000원
            </Text>
          </Flex>
        </CardBody>
        <CardFooter>
          <Payment t price={48000} title={'50000포인트'} id={5555555} />
        </CardFooter>
      </Card>
    </SimpleGrid>


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
                      {
                        user.role === "admin" ?
                      <Button fontSize={10} w='100%' h='5' border='1px solid #ddd'
                        onClick={(e) => deleteSubmit(e, store.price)}
                      >삭제</Button>
                      :
                      <Button fontSize={10} w='100%' h='5' border='1px solid #ddd'
                        onClick={(e) => buyStore(e, store.price, store.title, store.images)}
                      >구매</Button>
                      }
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

                    <Box w='100%' h='7rem' borderRadius={'8px'} overflow={'hidden'}>
                      <Image
                        src={store.images}
                        boxSize='100%'
                        objectFit='cover'
                        alt="아이템 이미지"
                        m='auto'
                        name='images'
                      />
                    </Box>
                    <Text textAlign={'center'} fontSize={'14'} fontWeight={'bold'} name='title'>{store.title}</Text>
                    <Text textAlign={'center'} fontSize={'13'} name='price'>{store.price}원</Text>
                    <Flex justifyContent={'right'}>
                     {
                        user.role === "admin" ?
                      <Button fontSize={10} w='100%' h='5' border='1px solid #ddd'
                        onClick={(e) => deleteSubmit(e, store.price)}
                      >삭제</Button>
                      :
                      <Button fontSize={10} w='100%' h='5' border='1px solid #ddd'
                        onClick={(e) => buyStore(e, store.price, store.title, store.images)}
                      >구매</Button>
                      }
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
                      {
                        user.role === "admin" ?
                      <Button fontSize={10} w='100%' h='5' border='1px solid #ddd'
                        onClick={(e) => deleteSubmit(e, store.price)}
                      >삭제</Button>
                      :
                      <Button fontSize={10} w='100%' h='5' border='1px solid #ddd'
                        onClick={(e) => buyStore(e, store.price, store.title, store.images)}
                      >구매</Button>
                      }
                </Flex>
              </GridItem>
            )
            )}
          </Grid>
        </TabPanel>
      </TabPanels>
    </Tabs>




  </Box >
}