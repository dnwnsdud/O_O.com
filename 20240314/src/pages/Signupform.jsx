import { Box, Button, Center, FormControl, FormLabel, Grid, Input, Stack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";



export default () => {
    let nav = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nickname, setnickname] = useState("");
    

  const onEmailHandler = (e) => {
    setEmail(e.target.value);
  };
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
      email: email,
      name: name,
      nickname: nickname,
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        navigate("/");
      } else {
        alert("Failed to sign up");
      }
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
                <Input type='email' isRequired />
            </FormControl>
            <FormControl>
                <FormLabel>닉네임</FormLabel>
                <Input type='text' onChange={onNicknameHandler} />
            </FormControl>
          
            <Grid templateColumns="1fr 1fr" gap="5px" marginTop="20px">
                <Button border="1px solid #0B0B0D" borderRadius="10px" onClick={()=>{
                    nav('/')
                }}>취소</Button>
                <Button type="submit" border="1px solid #0B0B0D" borderRadius="10px" onClikck={onSubmitHandler}>회원가입</Button>
            </Grid>
        </Stack>
    </Center>
}