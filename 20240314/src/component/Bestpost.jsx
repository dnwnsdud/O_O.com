import { Divider, ListItem, List, Text, Grid, Box, textDecoration, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default () => {
    const [bestpost, setBestpost] = useState([]);
    useEffect(() => {
        fetch('/api/bestpost')
            .then((res) => {
                if (res) {
                    return res.json();
                } else {
                    throw new Error();
                }
            })
            .then((data) => {
                setBestpost(data);
            })
    }, [])
    return (
        <List
            bg={"white"}
            borderRadius={"10px"}
            spacing={0.5}
            paddingLeft={6}
            paddingRight={6}
            paddingTop={3}
            paddingBottom={3}
            boxShadow={"md"}
        >
            <Text fontSize={"xl"} fontWeight={"bold"} paddingBottom={"10px"}>
                실시간 인기글
            </Text>
            <Grid templateColumns="1fr 2fr 1fr 0.5fr 0.5fr">
                <Box margin={"auto"}>카테고리</Box>
                <Box margin={"auto"}>제목</Box>
                <Box margin={"auto"}>작성자</Box>
                <Box margin={"auto"}>추천수</Box>
                <Box margin={"auto"}>조회수</Box>
            </Grid>
            <Divider orientation="horizontal" />

            {
                bestpost.length === 0 ?
                    <Box textAlign={"center"} padding={"10px"}>아직 게시글이 없습니다.</Box>
                    :
                    bestpost.map((posts) => (
                        <ListItem key={posts._id}>
                            <Grid key={`grid_${posts._id}`} templateColumns="1fr 2fr 1fr 0.5fr 0.5fr" paddingBottom={"3px"}>
                                <Box key={`box_${posts._id}`} margin={"auto"} borderRadius={"10px"} backgroundColor={"#c8c8d0"} color={"#3b3b44"} fontSize={"13px"} padding={"5px 10px"} h='80%' lineHeight={"80%"} width={"43px"} textAlign={"center"}>{posts.tap}</Box>
                                <Flex key={`flex_${posts._id}`} margin={"auto"} alignItems={"center"} gap={"5px"}>
                                    <Box key={`title_${posts._id}`} _hover={{ textDecoration: "underline" }}><Link to={`/b/id=${posts._id}`}>{posts.title}</Link></Box>
                                    <Box key={`comment_${posts._id}`} fontSize="10px" opacity={0.7} >[{posts.comment.length}]</Box>
                                </Flex>
                                <Box key={`nickname_${posts._id}`} margin={"auto"} fontSize={"13px"}>{posts.nickname}</Box>
                                <Box key={`like_${posts._id}`} margin={"auto"} fontSize={"13px"}>{posts.like}</Box>
                                <Box key={`count_${posts._id}`} margin={"auto"} fontSize={"13px"}>{posts.count}</Box>
                            </Grid>
                            <Divider orientation="horizontal" />
                        </ListItem>
                    ))
            }


            <Box opacity={0.5} fontSize={"10px"} marginLeft={"83%"}>인기글 = 추천수 * 2 + 조회수</Box>
        </List>
    )
}