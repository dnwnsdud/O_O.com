import React, { useEffect, useState } from "react"
import { Box, Button, Center, Divider, Flex, Grid, Heading, Stack } from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom";

export default()=>{
    const location = useLocation();
    let id = location.pathname.slice(location.pathname.indexOf("=") + 1);
    let nav = useNavigate();

    const [requestData, setRequestData] = useState([]);
    const [requestleftData, setRequestleftData] = useState([]);
    const [requestrightData, setRequestrightData] = useState([]);

    let body={
        id:id
    }

    const submit = (requestId, state)=>{
        let submitBody ={
            requestId : requestId,
            state : state
        }
        try{
            fetch('/api/requestsubmit',{
                method:"post",
                headers: {
                    "Content-Type": "application/json",
                        },
                body: JSON.stringify(submitBody)
            })
            .then((res)=>{
                if(res){
                    return res.json();
                }else{
                    throw new Error("Network response was not ok")
                }
            })
            .then((data)=>{
                if(data.success == true){
                    nav("/requestlist")
                }else{
                    throw new Error("Data is empty")
                }
            })
        }catch (error) {
            console.error("Error fetching data:", error);
          }
    }
    useEffect(()=>{
        try{
            fetch('/api/requestdetail',{
                method:"post",
                headers: {
                    "Content-Type": "application/json",
                        },
                body: JSON.stringify(body)
            })
            .then((res)=>{
                if(res){
                    return res.json();
                }else{
                    throw new Error("Network response was not ok")
                }
            })
            .then((data)=>{
                if(data){
                    setRequestData(data)
                    setRequestleftData(data.leftSide)
                    setRequestrightData(data.rightSide)

                }else{
                    throw new Error("Data is empty")
                }
            })
        }catch (error) {
            console.error("Error fetching data:", error);
          }
    },[])
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(date.getDate()).padStart(2, "0")}`;
      };
    return <>
        <Center>
            <Stack gap={6}>
                <Heading>오늘의 O_O 작성</Heading>
                    <Box>카테고리</Box>
                    <Box>{requestData.category}</Box>
                    <Box>주제</Box>
                    <Box>{requestData.title}</Box>
                    <Box>닉네임</Box>
                    <Box>{requestData.user}</Box>
                    <Box>날짜</Box>
                    <Box>{formatDate(requestData.date)}</Box>
                <Flex gap={4} justifyContent={"space-between"} alignItems={"center"}>
                    <Stack gap={4}>
                            <Box>왼쪽 제목</Box>
                            <Box>{requestleftData.title}</Box>
                            <Box>왼쪽 내용</Box>
                            <Box>{requestleftData.content}</Box>
                            <Box>왼쪽 이미지</Box>
                            <Box>{requestleftData.images}</Box>
                    </Stack>
                    <Divider borderColor={"#eaeaea"} borderWidth={"1px"} orientation="vertical" h={"240px"} />
                    <Stack gap={4}>
                            <Box>오른쪽 제목</Box>
                            <Box>{requestrightData.title}</Box>
                            <Box>오른쪽 내용</Box>
                            <Box>{requestrightData.content}</Box>
                            <Box>오른쪽 이미지</Box>
                            <Box>{requestrightData.images}</Box>
                    </Stack>
                </Flex>
                <Grid templateColumns={"1fr 1fr"}>
                    <Button onClick={()=>{
                        submit(requestData._id, "reject")
                    }}>요청반려</Button>
                    <Button onClick={()=>{
                        submit(requestData._id, "approval")
                    }}>요청승인</Button>
                </Grid>
            </Stack>
        </Center>
    </>
}