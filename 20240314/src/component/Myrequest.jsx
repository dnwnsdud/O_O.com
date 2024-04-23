import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Center, Flex, Grid, HStack, Input, Stack, VStack, Image, List } from '@chakra-ui/react';
import { UserContext } from "../hook/User";

export default () => {
    const { user } = useContext(UserContext);
    const [request,setRequest] = useState([]);

    useEffect(()=>{
        fetch("/api/myrequest", {
            method: "post",
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
                setRequest(data.myrequest)
              } else {
                console.log("데이터를 불러오는데 실패하였습니다.");
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
            {request.map((req)=>{ 
              return (
                <Grid key={req._id} templateColumns="1fr 3fr 1fr" borderBottom="1px solid black" textAlign="center">
                  <Box>{req.category == "baseball"? "야구" : req.category == "lol" ? "lol" : req.category == "soccer" ? "축구" : req.category == "society" ? "사회" : "오류가 발생했습니다." }</Box>
                  <Box>{req.title}</Box>
                  <Box>{req.state}</Box>
                </Grid>)
            }
            )}
            </List>
        </Stack>
    </Center>
}