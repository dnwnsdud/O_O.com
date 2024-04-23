import React, { useContext, useEffect } from 'react';
import { Box, Button, ButtonGroup, Center, Flex, Grid, HStack, Input, Stack, VStack, Image, List } from '@chakra-ui/react';
import { UserContext } from "../hook/User";

export default () => {
    const { user } = useContext(UserContext);

    let body={
        user:user
    };
    useEffect(()=>{
        fetch("/api/myrequest", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify(body)
          })
            .then((res) => {
              if (res) {
                return res.json();
              } else {
                throw new Error(e);
              }
            })
            .then((data) => {
              if (data) {
              
              } else {
            
              }
            });
    },[])
    return <Center>
        <Stack margin="100px 0" padding="50px 50px 60px" border="1px solid #0B0B0D" borderRadius="10px" width="1280px">
            <Box fontSize='30px' padding="0 30px" textAlign="center" fontWeight='bold' marginBottom="20px">내 요청목록</Box>
            <Grid templateColumns="1fr 3fr 1fr" borderBottom="1px solid black" textAlign="center">
                <Box>게시판</Box>
                <Box>요청내용</Box>
                <Box>승인여부</Box>
            </Grid>
            <List height="500px">
                <Box>1</Box>
                <Box>1</Box>
                <Box>1</Box>
                <Box>1</Box>
                <Box>1</Box>
                <Box>1</Box>
                <Box>1</Box>
            </List>
        </Stack>
    </Center>
}