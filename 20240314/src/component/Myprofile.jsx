import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Center, Flex, Grid, HStack, Input, Stack, VStack, Image, GridItem, Text } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { UserContext } from '../hook/User';

import Mypost from './Mypost';
import Mycomment from './Mycomment';
import MyStore from '../pages/MyStore';


export default () => {
    const [userData, setUserData] = useState([]);
    const { setUser } = useContext(UserContext);

    let nav = useNavigate();
    useEffect((e) => {
        try {
            fetch('/api/mypage')
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
                        setUserData(data);
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



    return <Box bg='#f7f7f8'>
        <Grid
            width={'65%'} margin={'auto'}
            templateRows='repeat(2, 1fr)'

            templateColumns='repeat(2, 1fr)'
        >

            <GridItem rowSpan={2} colSpan={1}>
                <Stack margin="100px 0" padding="50px 50px 60px" border="1px solid #e6e6ea" boxShadow='base' borderRadius="10px" width="500px" bg='#fff'>
                    <Box fontSize='30px' padding="0 30px" textAlign="center" fontWeight='bold' marginBottom="20px">내 정보</Box>
                    <Grid templateColumns="1fr 1fr" width="70%" margin="auto">
                        <Box borderRadius="50%" width="50px" height="50px" margin="auto" overflow="hidden" ><Image
                            src={userData.images}
                            boxSize='100%'
                            objectFit='cover'
                            alt="유저 이미지"
                            m='auto'
                        /></Box>
                        <Box>
                            <Box textAlign="center" borderBottom="1px solid #e6e6ea" marginBottom="5px" h={"25px"} color="black" >{userData.name}</Box>
                            <Box textAlign="center" borderBottom="1px solid #e6e6ea" marginBottom="5px" h={"25px"} color="black">{userData.nickname}</Box>
                        </Box>
                    </Grid>
                    <Grid templateRows="1fr 1fr 1fr 1fr" gap="20px" margin="30px 0" >
                        <Box textAlign="center" borderBottom="1px solid #e6e6ea" marginBottom="5px" h={"25px"} color="black" width="50%" margin="auto">{userData.email}</Box>
                        <Box textAlign="center" borderBottom="1px solid #e6e6ea" marginBottom="5px" h={"25px"} color="black" width="50%" margin="auto">{userData.team}</Box>
                        <Box textAlign="center" borderBottom="1px solid #e6e6ea" marginBottom="5px" h={"25px"} color="black" width="50%" margin="auto">포인트 {userData.point}</Box>
                        <Box textAlign="center" borderBottom="1px solid #e6e6ea" marginBottom="5px" h={"25px"} color="black" width="50%" margin="auto">전체승률</Box>
                    </Grid>
                    <Grid justifyContent="center" gap="10px">

                        <Button width="100px" border="1px solid #e6e6ea"
                            // border="1px solid black"
                            boxShadow='base' borderRadius="10px" onClick={() => {
                                nav('/mypage/modify')
                            }}>정보수정</Button>
                    </Grid>

                </Stack>
            </GridItem>
            <GridItem colSpan={1} marginTop={'80px'}>
                <Mypost />
            </GridItem>

            <GridItem colSpan={1}>
                <Mycomment />
            </GridItem>

            <Text fontWeight={'bold'}>내 아이템</Text>
            <GridItem colSpan={2} border={'1px solid e6e6ea'} boxShadow='base' borderRadius="10px" mb='10'>
                <MyStore />
            </GridItem>

        </Grid >
    </Box>
}; 