import { Divider, ListItem, List, Text, Grid, Box, textDecoration, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default () => {
  const [noticepost, setnoticepost] = useState([]);
  useEffect(() => {
    fetch('/api/noticepost')
      .then((res) => {
        if (res) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => {
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
        setnoticepost(sortedData);
      })
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };
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
        <Link to="/n" fontSize={"xl"} fontWeight={"bold"}>
          공지사항
        </Link >
      </Text >
      <Divider orientation="horizontal" />
      {
        noticepost.map((posts) => {
          return (<ListItem key={posts._id}>
            <Link to={`/n/id=${posts._id}`}>
              <Grid templateColumns="1fr 5fr 1fr" paddingBottom={"3px"} fontSize="13px">
                <Box color={"darkblue"} fontWeight={'bold'}>[공지]</Box>
                <Box _hover={{ textDecoration: "underline" }}>{posts.title}</Box>
                <Box margin={"auto"} fontSize={"13px"}>{formatDate(posts.createdAt)}</Box>
                <Box margin={"auto"} fontSize={"13px"}></Box>
              </Grid>
            </Link>
            <Divider orientation="horizontal" />

          </ListItem>)

        })
      }
    </List >
  )
}