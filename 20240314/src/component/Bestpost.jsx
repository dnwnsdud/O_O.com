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
            <Grid templateColumns="1fr 2fr 1fr 1fr">
                <Box margin={"auto"}>카테고리</Box>
                <Box margin={"auto"}>제목</Box>
                <Box margin={"auto"}>추천수</Box>
                <Box margin={"auto"}>조회수</Box>
            </Grid>
            <Divider orientation="horizontal" />

            {
                bestpost.map((posts) => {
                    return (<ListItem key={posts._id}>
                        <Grid templateColumns="1fr 2fr 1fr 1fr" paddingBottom={"3px"}>
                            <Box margin={"auto"} borderRadius={"5px"} backgroundColor={"#999"} color={"black"} fontSize={"13px"} padding={"5px 10px"}>{posts.tap}</Box>
                            <Flex margin={"auto"} alignItems={"center"} gap={"5px"}>
                                <Box _hover={{ textDecoration: "underline" }}><Link to={`/b/id=${posts._id}`}>{posts.title}</Link></Box>
                                <Box fontSize="10px" opacity={0.7} >[{posts.comment.length}]</Box>
                            </Flex>
                            <Box margin={"auto"}>{posts.like}</Box>
                            <Box margin={"auto"}>{posts.count}</Box>
                        </Grid>
                        <Divider orientation="horizontal" />

                    </ListItem>)

                })
            }
            <Box opacity={0.5} fontSize={"10px"} marginLeft={"83%"}>인기글 = 추천수 * 2 + 조회수</Box>
        </List>
    )
}