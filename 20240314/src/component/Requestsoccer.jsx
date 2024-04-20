import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Divider,
  Grid,
  List,
  ListIcon,
  ListItem,
  Stack,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default ({soccerData , soccerPosts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = soccerData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageCount = Math.ceil(soccerPosts / postsPerPage);
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pageCount));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };
  let nav = useNavigate();

  
  return (
    <Center>
      <Stack w="100%">
        <Box
          paddingTop="10px"
          fontWeight="bold"
          fontSize="1.2rem"
          textAlign="center"
        >
          축구
        </Box>
        <List w="100%">
          <Grid
            fontWeight="bold"
            bgColor="#ffffff"
            templateColumns={"3fr 2fr 2fr 1fr"}
            padding="10px 0"
            borderBottom={'1px solid #dedee3'}
          >
            <Box textAlign="center">주제</Box>
            <Box textAlign="center">닉네임</Box>
            <Box textAlign="center">날짜</Box>
            <Box></Box>
          </Grid>
          {currentPosts.map((data) => {
            return (
              <ListItem key={data._id} 
              borderBottom={'1px solid #dedee3'}>
                <Grid templateColumns={"3fr 2fr 2fr 1fr"} padding="10px 10px">
                  <Box
                    textAlign="center"
                    isTruncated
                    maxWidth="100%"
                    paddingRight="10px"
                  >
                    {data.title}
                  </Box>
                  <Box
                    textAlign="center"
                    isTruncated
                    maxWidth="100%"
                    paddingRight="10px"
                  >
                    {data.user}
                  </Box>
                  <Box textAlign="center">{formatDate(data.date)}</Box>
                  <Flex alignContent="center" justifyContent="center">
                    <Button
                      size="xs"
                      bgColor="#6c839f !important"
                      color="#ffffff"
                      onClick={() => {
                        nav(`/requestlist/id=${data._id}`);
                      }}
                    >
                      보기
                    </Button>
                  </Flex>
                </Grid>
              </ListItem>
            );
          })}
        </List>
        <Flex justifyContent="center" marginTop={"30px"} paddingBottom="30px">
          <Button
            disabled={currentPage === 1} // 첫 페이지에서는 이전 버튼 비활성화
            onClick={handlePrevPage}
            size="xs"
          >
            <ArrowLeftIcon />
          </Button>
          {Array.from({ length: pageCount }, (_, idx) => idx + 1).map(
            (number) => (
              <Button
                key={number}
                onClick={() => paginate(number)}
                mx="1"
                size="xs"
                bg={currentPage === number ? "#f9f9f9 !important" : "#000000"}
                variant={currentPage === number ? "outline" : "ghost"}
                color={currentPage === number ? "#000000" : "#999999"}
              >
                {number}
              </Button>
            )
          )}
          <Button
            size="xs"
            disabled={currentPage === pageCount}
            onClick={handleNextPage}
          >
            <ArrowRightIcon />
          </Button>
        </Flex>
      </Stack>
    </Center>
  );
};
