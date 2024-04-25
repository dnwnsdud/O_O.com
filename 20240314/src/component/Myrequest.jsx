import React, { useEffect, useState } from 'react';
import { Box, Button, Center, Flex, Grid, Stack, List } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

export default () => {
  const [request, setRequest] = useState([]);
  let nav = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(10);


  useEffect(() => {
    fetch("/api/myrequest", {
      method: "post",
    })
      .then((res) => {
        if (res) {
          return res.json();
        } else {
          throw new Error(e);
        }
      })
      .then((data) => {
        if (data) {
          setRequest(data.myrequest)
          setTotalPosts(data.totalCount)
        } else {
          console.log("데이터를 불러오는데 실패하였습니다.");
        }
      });
  }, [])
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = request.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageCount = Math.ceil(totalPosts / postsPerPage);
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pageCount));
  };
  return <Center bg='#f7f7f8'>
    <Stack bg='#fff' margin="100px 0" padding="50px 50px 60px" gap='0' border="1px solid #f7f7f8" shadow={'base'} borderRadius="10px" width="1280px">
      <Box fontSize='30px' padding="0 30px" textAlign="center" fontWeight='bold' marginBottom="20px">내 요청목록</Box>
      <Grid templateColumns="1fr 3fr 1fr 1fr" borderBottom="1px solid #dedee3" textAlign="center" fontWeight={'bold'}>
        <Box>게시판</Box>
        <Box>요청내용</Box>
        <Box>승인여부</Box>
        <Box>상세보기</Box>
      </Grid>
      <List height="500px">
        {currentPosts.map((req) => {
          return (
            <Grid key={req._id} h='2rem' alignItems={'center'} templateColumns="1fr 3fr 1fr 1fr" borderBottom="1px solid #dedee3" textAlign="center">
              <Box>{req.category == "baseball" ? "야구" : req.category == "lol" ? "lol" : req.category == "soccer" ? "축구" : req.category == "society" ? "사회" : "오류가 발생했습니다."}</Box>
              <Box>{req.title}</Box>
              {req.state == '승인대기' ? <Box color='gray' fontWeight={'bold'}>{req.state} </Box> : req.state == '반려' ? <Box fontWeight={'bold'} color='crimson'>{req.state} </Box>:<Box fontWeight={'bold'} color='darkblue'>{req.state} </Box>}  

              <Flex justifyContent={'center'} alignItems='center'>
                {req.state == "승인대기" ? <Button onClick={() => {
                  nav(`/requestlist/id=${req.requestId}`);
                }}
                  size='sm'>보기</Button> : <Button isDisabled>보기</Button>}
              </Flex>

            </Grid>)
        }
        )}
      </List>
      <Flex justifyContent="center" marginTop={"30px"}>
        <Button
          size={'xs'}
          disabled={currentPage === 1} // 첫 페이지에서는 이전 버튼 비활성화
          onClick={handlePrevPage}
        >
          <ArrowLeftIcon />
        </Button>
        {Array.from({ length: pageCount }, (_, idx) => idx + 1).map((number) => (
          <Button
            size={'xs'}
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
        <Button
          size={'xs'} disabled={currentPage === pageCount} onClick={handleNextPage}>
          <ArrowRightIcon />
        </Button>
      </Flex>
    </Stack>
  </Center>
}