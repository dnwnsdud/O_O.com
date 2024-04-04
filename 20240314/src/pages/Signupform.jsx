import { Box, Button, Center, FormControl, FormLabel, Grid, Input, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";



export default () => {
    let nav = useNavigate()
    const [name, setName] = useState("");
    const [nickname, setnickname] = useState("");

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const paramValue = queryParams.get('email');





  const onNamedHandler = (e) => {
    setName(e.target.value);
  };
  const onNicknameHandler = (e) => {
    setnickname(e.target.value);
  };

  const onSubmitHandler = (e) => {
    //새로고침 방지
    e.preventDefault();
  
    let body = {
      name: name,
      email: paramValue,
      nickname: nickname,
      role:"user",
    };
    
    fetch('/api/signup', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
      )
      .then(response => {
        if (response) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        console.log(data)
        if (data.success) {
          nav("/");
        } else {
          console.log(data.error);
          alert(`사용자를 저장하는 동안 오류 발생:${data.error}`);
        }
      })
      .catch(error => {
      });
  };
  
    return <Center>
        <Stack margin="100px 0" padding="50px 50px 60px" borderRadius="10px" width="500px">
            <Box fontSize='30px' padding="0 30px" textAlign="center" fontWeight='bold' marginBottom="10px">회원가입</Box>
            <FormControl>
                <FormLabel>이름</FormLabel>
                <Input type='text' onChange={onNamedHandler}/>
            </FormControl>
            <FormControl>
                <FormLabel>이메일</FormLabel>
                <Input type='email' onChange={onEmailHandler} placeholder={paramValue} readOnly={true}/>
            </FormControl>
            <FormControl>
                <FormLabel>닉네임</FormLabel>
                <Input type='text' onChange={onNicknameHandler} />
            </FormControl>
          
            <Grid templateColumns="1fr 1fr" gap="5px" marginTop="20px">
                <Button border="1px solid #0B0B0D" borderRadius="10px" onClick={()=>{
                    nav('/')
                }}>취소</Button>
                <Button type="submit" border="1px solid #0B0B0D" borderRadius="10px" onClick={onSubmitHandler}>회원가입</Button>
            </Grid>
        </Stack>
    </Center>
}