import React, { useEffect, useState, useContext } from "react";
import {
    Box, Flex, Badge, Text, HStack, Button, border,
    Image, Tabs, TabList, Tab, TabIndicator, TabPanel, TabPanels, Grid, GridItem, SimpleGrid, Card, CardHeader, Heading, CardBody, CardFooter, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, useDisclosure
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
    const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure()
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()
    const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure()
    const [alert, setAlert] = useState("");
    const cancelRef = React.useRef()

    const swiperStyle = {
        position: "relative",
        width: "90%",
        height: "300px",
        margin: "auto",
    };

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

    const buyStore = (e, price, title, images) => {
        if (user == "logout") {
            setAlert("login")
            onOpen()
        } else {
            console.log('구매 가격' + price);
            console.log(title);
            console.log(images);
            console.log(user.email);
            let body = {
                title: title,
                price: price,
                images: images,
                email: user.email
            }
            console.log("body:", body);

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
                        return response.json().then(data => {
                            alert(`구매 실패: ${data.message}`);
                            throw new Error(`Server responded with status ${response.status}`);
                        });
                    }
                    setAlert("buy")
                    onOpen2()

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


    return <>
        <Swiper
            style={swiperStyle}
            modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
            spaceBetween={10}
            slidesPerView={5}
            navigation
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            onSlideChange={() => console.log('slide change')}
        >
            {stores.map((store, index) => (
                <SwiperSlide key={index} >
                    <Card maxH={'20rem'}>
                        <CardBody>

                            <Box>
                                <Box borderRadius={'8px'} overflow={'hidden'} onClick={() => {
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
                                <Text textAlign={'center'} fontSize={'14'} fontWeight={'bold'}
                                    minH={'3rem'} alignContent={'center'}>{store.title}</Text>
                                <Text textAlign={'center'} fontSize={'13'}>{store.price}원</Text>
                                <Flex justifyContent={'right'}>
                                    {
                                        user.role === "admin" ?
                                            ''
                                            :
                                            <Button fontSize={10} w='100%' h='5' border='1px solid #ddd'
                                                onClick={(e) => buyStore(e, store.price, store.title, store.images)}
                                            >구매</Button>
                                    }
                                </Flex>
                            </Box>

                        </CardBody>
                    </Card>
                </SwiperSlide>
            )
            )}
        </Swiper >
        <AlertDialog
            motionPreset='slideInBottom'
            leastDestructiveRef={cancelRef}
            onClose={alert == "login" ? onClose : alert == "buy" ? onClose2 : ""}
            isOpen={alert == "login" ? isOpen : alert == "buy" ? isOpen2 : ""}
            isCentered
        >
            <AlertDialogOverlay />

            <AlertDialogContent>
                <AlertDialogHeader>{alert == "login" ? "로그인 오류" : "구매확인"}</AlertDialogHeader>
                <AlertDialogBody>
                    {alert == "login" ? "로그인이 필요합니다!" : "구매가 완료되었습니다."}
                </AlertDialogBody>
                <AlertDialogFooter>
                    {alert == "login" ? <Button
                        sx={{
                            backgroundColor: "red !important",
                            color: "#ffffff",
                        }}
                        onClick={onClose}
                        ml={3}
                    >
                        돌아가기
                    </Button> : <Button
                        sx={{
                            backgroundColor: "blue !important",
                            color: "#ffffff",
                        }}
                        onClick={onClose2}
                        ml={3}
                    >
                        확인
                    </Button>}

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
}