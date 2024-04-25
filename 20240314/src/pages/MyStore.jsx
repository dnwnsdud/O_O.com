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
        height: "100%",
        margin: "auto",
    };
    const [stores, setStores] = useState([]);
    const [usestores, setuseStores] = useState([]);

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
                        console.log('data', data);
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

    useEffect(() => {
        try {
            fetch('/api/showuseitems', { method: 'get' })
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
                        setuseStores(data);
                        console.log('data', data);
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

    const usemyitem = (e, title, id) => {
        e.preventDefault();
        alert('아이템을 사용합니다.');
        // console.log(title);
        fetch('/api/usemyitem', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: id, title: title }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    nav('/topicrequest/:category');
                } else {
                    alert('오류가 발생했습니다.')
                    console.log('사용 실패')
                }
            })
            .catch(error => {
                console.error('아이템 사용 실패 : ', error);
            })

    }


    return (
        <Box bg='#fff'>
            {stores.length > 0 ? (
                <Swiper
                    style={swiperStyle}
                    modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
                    spaceBetween={3}
                    slidesPerView={4}
                    // navigation
                    pagination={{ clickable: true }}
                    // scrollbar={{ draggable: true }}
                    onSlideChange={() => console.log('slide change')}
                >
                    {stores.map((store, index) => (
                        <SwiperSlide key={index}>
                            <Box height='60%' width='60%' >
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
                                <Text textAlign={'center'} fontSize={'14'} fontWeight={'bold'} name='title'>{store.title}</Text>
                                <Button
                                    size='sm'
                                    margin={'auto'}
                                    w='100%'
                                    border='1px solid #e6e6ea'
                                    onClick={(e) => usemyitem(e, store.title, store._id, store.images, store.price)}
                                >사용하기</Button>

                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper >
            ) : (
                <div>상품이 없습니다.</div>
            )}

            {usestores.length > 0 ? (
                <Swiper
                    style={swiperStyle}
                    modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
                    spaceBetween={3}
                    slidesPerView={4}
                    // navigation
                    pagination={{ clickable: true }}
                    // scrollbar={{ draggable: true }}
                    onSlideChange={() => console.log('slide change')}
                >
                    {usestores.map((store, index) => (
                        <SwiperSlide key={index}>
                            <Box height='60%' width='60%' >

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
                                <Text textAlign={'center'} fontSize={'14'} fontWeight={'bold'} name='title'>{store.title}</Text>
                                <Button
                                    size='sm'
                                    margin={'auto'}
                                    w='100%'
                                    border='1px solid #e6e6ea'
                                    onClick={() => {
                                        nav('/topicrequest/:category')
                                    }
                                    }
                                    color='darkblue'
                                >사용중</Button>

                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper >
            ) : (
                ""
            )}

        </Box>
    );
}    
