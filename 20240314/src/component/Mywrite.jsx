import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Grid, List, ListItem } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

export default () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(10);
  const [commentData, setCommentdata] = useState([]);

  useEffect(() => {
    try {
      fetch('/api/mywrite')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .then(data => {
          if (data) {
            setUserData(data.data);
            setTotalPosts(data.totalCount);
            setCommentdata(data.comment)
            // console.log(data.comment,1111);
          } else {
            throw new Error('Data is empty');
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageCount = Math.ceil(totalPosts / postsPerPage);
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pageCount));
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <Grid templateColumns="1fr 1fr">
    <Flex justifyContent="center" flexDir={'column'} margin="100px 0 100px 100px" padding="50px 50px 60px" border="1px solid #0B0B0D" borderRadius="10px" width="640px">
       <Box height={"480px"}>
         <Box fontSize='30px' padding="0 30px" textAlign="center" fontWeight='bold' marginBottom="20px">내 게시글</Box>
               <List >
            <Grid templateColumns=" 2fr 3fr 2fr 1fr 1fr" borderBottom="1px solid black" textAlign="center" padding={"8px 0"}>
              <Box>제목</Box>
              <Box>글쓴이</Box>
              <Box>날짜</Box>
              <Box>조회</Box>
              <Box>추천</Box>
            </Grid>
          {currentPosts.map((user) => (
            <ListItem key={user._id} >
              <Grid
                templateColumns=" 2fr 3fr 2fr 1fr 1fr"
                borderBottom="1px solid rgba(0,0,0,0.3)"
                textAlign="center"
                padding={"8px 0"}
                fontSize={"13px"}
              >
                <Box>{user.title}</Box>
                <Box>{user.nickname}</Box>
                <Box>{formatDate(user.createdAt)}</Box>
                <Box>{user.count}</Box>
                <Box>{user.like}</Box>
              </Grid>
            </ListItem>
          ))}
               </List>
       </Box>
      <Flex justifyContent="center" marginTop={"30px"}>
        <Button
          disabled={currentPage === 1} // 첫 페이지에서는 이전 버튼 비활성화
          onClick={handlePrevPage}
        >
          <ArrowLeftIcon />
        </Button>
        {Array.from({ length: pageCount }, (_, idx) => idx + 1).map((number) => (
          <Button
            key={number}
            onClick={() => paginate(number)}
            mx="1"
            bg={currentPage === number ? "#f9f9f9 !important" : "#000000"}
            variant={currentPage === number ? "outline" : "ghost"}
            color={currentPage === number ? "#000000" : "#999999"}
          >
            {number}
          </Button>
        ))}
        <Button disabled={currentPage === pageCount} onClick={handleNextPage}>
          <ArrowRightIcon />
        </Button>
      </Flex>
    </Flex>
    <Flex justifyContent="center" flexDir={'column'} margin="100px 0 100px 100px" padding="50px 50px 60px" border="1px solid #0B0B0D" borderRadius="10px" width="640px">
       <Box height={"480px"}>
         <Box fontSize='30px' padding="0 30px" textAlign="center" fontWeight='bold' marginBottom="20px">내 게시글</Box>
               <List >
            <Grid templateColumns=" 2fr 3fr 2fr 1fr 1fr" borderBottom="1px solid black" textAlign="center" padding={"8px 0"}>
              <Box>제목</Box>
              <Box>글쓴이</Box>
              <Box>날짜</Box>
              <Box>조회</Box>
              <Box>추천</Box>
            </Grid>
          {currentPosts.map((user) => (
            <ListItem key={user._id} >
              <Grid
                templateColumns=" 2fr 3fr 2fr 1fr 1fr"
                borderBottom="1px solid rgba(0,0,0,0.3)"
                textAlign="center"
                padding={"8px 0"}
                fontSize={"13px"}
              >
                <Box>{user.title}</Box>
                <Box>{user.nickname}</Box>
                <Box>{formatDate(user.createdAt)}</Box>
                <Box>{user.count}</Box>
                <Box>{user.like}</Box>
              </Grid>
            </ListItem>
          ))}
               </List>
       </Box>
      <Flex justifyContent="center" marginTop={"30px"}>
        <Button
          disabled={currentPage === 1} // 첫 페이지에서는 이전 버튼 비활성화
          onClick={handlePrevPage}
        >
          <ArrowLeftIcon />
        </Button>
        {Array.from({ length: pageCount }, (_, idx) => idx + 1).map((number) => (
          <Button
            key={number}
            onClick={() => paginate(number)}
            mx="1"
            bg={currentPage === number ? "#f9f9f9 !important" : "#000000"}
            variant={currentPage === number ? "outline" : "ghost"}
            color={currentPage === number ? "#000000" : "#999999"}
          >
            {number}
          </Button>
        ))}
        <Button disabled={currentPage === pageCount} onClick={handleNextPage}>
          <ArrowRightIcon />
        </Button>
      </Flex>
    </Flex>
    </Grid>
  );
};
