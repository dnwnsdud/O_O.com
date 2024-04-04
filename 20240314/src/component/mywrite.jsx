import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Center, Flex, Grid, HStack, Input, Stack, VStack, Image, List, OrderedList, ListItem } from '@chakra-ui/react';

export default ()=>{
    const [userData, setUserData] = useState([]);

    useEffect((e) => {
        try {
            fetch('/api/mywrite')
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
            console.log(data);
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
    <Stack margin="100px 0" padding="50px 50px 60px" border="1px solid #0B0B0D" borderRadius="10px" width="1280px">
        <Box fontSize='30px' padding="0 30px" textAlign="center" fontWeight='bold' marginBottom="20px">내 게시글</Box>
        <Grid templateColumns="1fr 3fr 1fr 2fr 1fr 1fr" borderBottom="1px solid black" textAlign="center">
            <Box>팀</Box>
            <Box>제목</Box>
            <Box>글쓴이</Box>
            <Box>날짜</Box>
            <Box>조회</Box>
            <Box>추천</Box>
        </Grid>
          <List List height="500px" >
      {userData.map((user) => (
            <ListItem key={user._id}>
              <Grid
                templateColumns="1fr 3fr 1fr 2fr 1fr 1fr"
                borderBottom="1px solid black"
                textAlign="center"
              >
                <Box>{user.title}</Box>
                <Box>{user.content}</Box>
                <Box>{user.updatedAt}</Box>
                <Box>날짜</Box>
                <Box>조회</Box>
                <Box>추천</Box>
              </Grid>
            </ListItem>
      ))}
      </List>
    </Stack>
</Center>
}