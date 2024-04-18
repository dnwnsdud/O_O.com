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

export default () => {
    let nav = useNavigate();
    const { user } = useContext(UserContext);

    const swiperStyle = {
        position: "relative",
        width: "90%",
        height: "200px",
        margin: "auto",
    };
    const [stores, setStores] = useState([]);

    useEffect(() => {
        try {
            fetch('/api/showitems', { method: 'get' })
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
                    if (data) {
                        setStores(data);
                        console.log(data);
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


    return (
        <>
            {stores.length > 0 ? (
                <Swiper
                    style={swiperStyle}
                    modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
                    spaceBetween={20}
                    slidesPerView={5}
                    navigation
                    pagination={{ clickable: true }}
                    // scrollbar={{ draggable: true }}
                    onSlideChange={() => console.log('slide change')}
                >
                    {stores.map((store, index) => (
                        <SwiperSlide key={index}>
                            <Box height='10rem' width='100%' >
                                {/* <Box>{store.images}</Box> */}

                                <Box w='100%' h='7rem' borderRadius={'8px'} overflow={'hidden'} onClick={() => {
                                    nav("/st");
                                }}>
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

                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper >
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}    
