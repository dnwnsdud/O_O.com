import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Center, Flex, Grid, HStack, Input, Stack, VStack, Image } from '@chakra-ui/react';
import {FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useNavigate, useOutletContext } from 'react-router-dom';

export default ()=>{
    const [userData, setUserData] = useState([]);
    
    let nav = useNavigate();
    useEffect((e) => {
        try {
            fetch('/api/mypage')
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
        if (data) {
            console.log("이게 먼저오는거면 나는 어쩌라는건데 진짜 다 죽자");
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

return <Center>
    <Stack margin="100px 0" padding="50px 50px 60px" border="1px solid #0B0B0D" borderRadius="10px" width="500px">
        <Box fontSize='30px' padding="0 30px" textAlign="center" fontWeight='bold' marginBottom="20px">내 정보</Box>
        <Grid templateColumns="1fr 1fr" width="70%" margin="auto">
            <Box border="1px solid black" borderRadius="50%" width="50px" height="50px" margin="auto" ><Image /></Box>
            <Box>
                <Box textAlign="center" border="1px solid black" borderRadius="15px" marginBottom="5px" h={"25px"}>{userData.name}</Box>
                <Box textAlign="center" border="1px solid black" borderRadius="15px" h={"25px"}>{userData.nickname}</Box>
            </Box>
        </Grid>
        <Grid templateRows="1fr 1fr 1fr 1fr" gap="20px" margin="30px 0" >
            <Box textAlign="center" border="1px solid black" borderRadius="15px" margin="auto" width="70%" h={"25px"}>{userData.email}</Box>
            <Box textAlign="center" border="1px solid black" borderRadius="15px" margin="auto" width="70%">{userData.team}</Box>
            <Box textAlign="center" border="1px solid black" borderRadius="15px" margin="auto" width="70%">전체승률</Box>
        </Grid>
        <Grid templateRows="1fr 1fr" justifyContent="center" gap="10px">
            <Button width="100px" border="1px solid black" borderRadius="10px">실명인증</Button>
            <Button width="100px" border="1px solid black" borderRadius="10px" onClick={()=>{
                nav('/mypage/modify')
            }}>정보수정</Button>
        </Grid>
    </Stack>
</Center>
}