import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Center, Flex, Grid, HStack, Input, Stack, VStack, Image, List, ListItem } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../hook/User";

export default () => {
    const { user } = useContext(UserContext);
    const [userData, setUserData] = useState([]);
    const [writeData, setwriteData] = useState([]);
    const [commentData, setcommentData] = useState([]);
    let nav = useNavigate();
    if (user.role === 'user') {
        nav('/')
    }
    useEffect((e) => {
        try {
            fetch('/api/admin')
                .then(response => {
                    if (response) {
                        return response.json();
                    }
                    else {
                        throw new Error(e);
                    }
                })
                .then(data => {
                    if (data) {
                        setUserData(data.userdata);
                        setwriteData(data.writedata);
                        setcommentData(data.comments);
                        if (user.role == 'user' || user == 'logout') {
                            nav('/')
                        }
                        console.log(user, '페이지 시작시');


                    } else {
                        alert(`사용자를 저장하는 동안 오류 발생:${data.error}`);
                    }
                })
                .catch(error => {
                });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [user]);
    const Adminuserdelete = (userId, userEmail) => {
        let body = {
            id: userId,
            email: userEmail
        }
        try {
            fetch('/api/adminuserdelete', { method: "post", body: JSON.stringify(body) })
                .then(res => {
                    if (res) {
                        return res.json();
                    } else {
                        throw new Error()
                    }
                })
                .then(data => {
                    console.log(data);
                    if (data) {
                        setUserData(data);
                        console.log('유저를 삭제하였습니다.');
                    } else {
                        alert('유저정보 삭제에 실패하였습니다.')
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }
    const Adminwritedelete = (writeId, writeEmail) => {
        let body = {
            id: writeId,
            email: writeEmail
        }
        try {
            fetch('/api/adminwritedelete', { method: "post", body: JSON.stringify(body) })
                .then(res => {
                    if (res) {
                        return res.json();
                    } else {
                        throw new Error()
                    }
                })
                .then(data => {
                    console.log(data, 123123);
                    if (data) {
                        setwriteData(data);
                        console.log('게시글을 삭제하였습니다.');
                    } else {
                        alert('게시글 삭제에 실패하였습니다.')
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }
    const Admincommentdelete = (writeId, writePostId) => {
        let body = {
            id: writeId,
            postId: writePostId
        }
        try {
            fetch('/api/admincommentdelete', { method: "post", body: JSON.stringify(body) })
                .then(res => {
                    if (res) {
                        return res.json();
                    } else {
                        throw new Error()
                    }
                })
                .then(data => {
                    if (data) {
                        setcommentData(data);
                        console.log('게시글을 삭제하였습니다.');
                    } else {
                        alert('게시글 삭제에 실패하였습니다.')
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }
    return <Center>
        <Stack margin="100px 0" padding="50px 50px 60px" border="1px solid #0B0B0D" borderRadius="10px" width="1280px">
            <Box fontSize='30px' padding="0 30px" textAlign="center" fontWeight='bold' marginBottom="20px">관리자페이지</Box>
            <Flex w="100%" justifyContent="right"   >
                <Grid templateColumns="1fr 1fr" w="200px" gap="10px">
                    <Button border="1px solid black" borderRadius="10px" >공지작성</Button>
                    <Button border="1px solid black" borderRadius="10px" >서버관리</Button>
                    <Link to="/admin/black"><Button border="1px solid black" borderRadius="10px" >블랙리스트</Button></Link>
                </Grid>
            </Flex>
            <Box>유저관리</Box>
            <Box border="1px solid black">
                <Grid templateColumns="1fr 1fr 1fr" borderBottom="1px solid black" textAlign="center">
                    <Box>아이디</Box>
                    <Box>닉네임</Box>
                    <Box>유저관리</Box>
                </Grid>
                <List height="100px" overflowX='auto'>
                    {
                        userData.map((user) => {
                            return (<ListItem key={user._id}>
                                <Grid templateColumns="1fr 1fr 1fr" textAlign="center" alignItems="center" padding="5px 0">
                                    <Box>{user.email}</Box>
                                    <Box>{user.nickname}</Box>
                                    <Button w="100px" border="1px solid black" borderRadius="10px" margin="auto" onClick={() => {
                                        Adminuserdelete(user._id, user.email)
                                    }}>유저탈퇴</Button>
                                </Grid>
                            </ListItem>)
                        })
                    }
                </List>
            </Box>
            <Box>게시글관리</Box>
            <Box border="1px solid black">
                <Grid templateColumns="1fr 1fr 1fr" borderBottom="1px solid black" textAlign="center">
                    <Box>아이디</Box>
                    <Box>게시글제목</Box>
                    <Box >게시글관리</Box>
                </Grid>
                <List height="100px" overflowX='auto'>
                    {
                        writeData.map((write) => {
                            return (<ListItem key={write._id}>
                                <Grid templateColumns="1fr 1fr 1fr" textAlign="center" alignItems="center" padding="5px 0">
                                    <Box>{write.nickname}</Box>
                                    <Link to={`/b/id=${write._id}`}>
                                        <Box>{write.title}</Box>
                                    </Link>
                                    <Button w="100px" border="1px solid black" borderRadius="10px" margin="auto" onClick={() => {
                                        Adminwritedelete(write._id, write.email)
                                    }}>게시글삭제</Button>
                                </Grid>
                            </ListItem>)
                        })
                    }
                </List>
            </Box>
            <Box>댓글관리</Box>
            <Box border="1px solid black">
                <Grid templateColumns="1fr 1fr 1fr" borderBottom="1px solid black" textAlign="center">
                    <Box>아이디</Box>
                    <Box>댓글내용</Box>
                    <Box >댓글관리</Box>
                </Grid>
                <List height="100px" overflowX='auto'>
                    {
                        commentData.map((write) => {
                            return (<ListItem key={write._id}>
                                <Grid templateColumns="1fr 1fr 1fr" textAlign="center" alignItems="center" padding="5px 0">
                                    <Box>{write.nickname}</Box>
                                    <Link to={`/b/id=${write.postId}`}>
                                        <Box>{write.content}</Box>
                                    </Link>
                                    <Button w="100px" border="1px solid black" borderRadius="10px" margin="auto" onClick={() => {
                                        Admincommentdelete(write._id, write.postId)
                                    }}>댓글삭제</Button>
                                </Grid>
                            </ListItem>)
                        })
                    }
                </List>
            </Box>
            <Box>블랙리스트관리</Box>
            <Box border="1px solid black">
                <Grid templateColumns="1fr 1fr 1fr" borderBottom="1px solid black" textAlign="center">
                        <Box>아이디</Box>
                        <Box>댓글내용</Box>
                    <Box >댓글관리</Box>
                </Grid>
                <List height="100px" overflowX='auto'>
                    {
                        commentData.map((write) => {
                            return (<ListItem key={write._id}>
                                <Grid templateColumns="1fr 1fr 1fr" textAlign="center" alignItems="center" padding="5px 0">
                                    <Box>{write.nickname}</Box>
                                    <Link to={`/b/id=${write.postId}`}>
                                        <Box>{write.content}</Box>
                                    </Link>
                                    <Button w="100px" border="1px solid black" borderRadius="10px" margin="auto" onClick={()=>{
                                        Admincommentdelete(write._id, write.postId)
                                    }}>댓글삭제</Button>
                                </Grid>
                            </ListItem>)
                        })
                    }
                </List>
            </Box>
            <Box>토픽요청</Box>
            <Box border="1px solid black">
                <Grid templateColumns="1fr 1fr 1fr" borderBottom="1px solid black" textAlign="center">
                    <Box>아이디</Box>
                    <Box>요청내용</Box>
                    <Box>승인여부</Box>
                </Grid>
                <List height="100px" >
                    <Grid templateColumns="1fr 1fr 1fr" textAlign="center" alignItems="center" padding="5px 0">
                        <Box>1</Box>
                        <Box>1</Box>
                        <Flex justifyContent="center" gap="5px">
                            <Button w="100px" border="1px solid black" borderRadius="10px" >요청승인</Button>
                            <Button w="100px" border="1px solid black" borderRadius="10px" >요청반려</Button>
                        </Flex>
                    </Grid>
                    <Box>1</Box>
                    <Box>1</Box>
                </List>
            </Box>
            <Box>사용량</Box>
            <Grid templateColumns="1fr 1fr 1fr" textAlign="center" gap="15px">
                <Box width="382px" height="200px" border="1px solid black">유저수</Box>
                <Box width="382px" height="200px" border="1px solid black">회원수</Box>
                <Box width="382px" height="200px" border="1px solid black">토픽 요청 수</Box>
            </Grid>
            <Flex border="1px solid black" height="300px" >
                <Box margin="auto" border="1px solid black">
                    <Flex justifyContent="space-between" alignItems="center" width="300px" >
                        <Box>일별 아이템 판매량</Box>
                        <Button border="1px solid black">전체보기</Button>
                    </Flex>
                    <Box height="200px">그래프</Box>
                </Box>
            </Flex>
        </Stack>
    </Center>
}