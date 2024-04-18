import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Grid, List, ListItem, Text } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { FaTrashCan } from "react-icons/fa6";

export default () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [totalPosts, setTotalPosts] = useState(6);

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
            setUserData(data.mycomments);
            setTotalPosts(data.commentCount);
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
            setUserData(data);
            console.log('게시글을 삭제하였습니다.');
          } else {
            alert('게시글 삭제에 실패하였습니다.')
          }
        })
    } catch (error) {
      console.log(error);
    }
  }

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
  console.log(userData, "이게 왜 안되는거야 형????? 이거 형문제잖아");

  const [isListHover, setIsListHover] = useState(false);

  return (
    <>
      <Text fontWeight={'bold'}>내 댓글</Text>
      <Flex justifyContent="center" flexDir={'column'} padding="10px 50px 10px" boxShadow='base' border="1px solid #e6e6ea" borderRadius="10px" width="640px" height={'250px'}>
        <Box height={"100%"}>
          {/* <Box fontSize='30px' padding="0 30px" textAlign="center" fontWeight='bold' marginBottom="20px">내 댓글</Box> */}
          <List >
            <Grid templateColumns=" 1fr 1fr 1fr 1fr" borderBottom="1px solid #adadb8" textAlign="center" padding={"8px 0"}>
              <Box>카테고리</Box>
              <Box>내용</Box>
              <Box>날짜</Box>
              <Box>댓글관리</Box>
            </Grid>
            {currentPosts.map((user) => (
              <ListItem key={user._id} >
                <Grid
                  templateColumns="3fr 1fr"
                  borderBottom="1px solid #e6e6ea"
                  textAlign="center"
                  // padding={"8px 0"}
                  fontSize={"13px"}
                >
                  <Link to={`/b/id=${user.postId}`}>
                    <Grid
                      templateColumns=" 1fr 1fr 1fr"
                      textAlign="center"
                      // padding={"8px 0"}
                      fontSize={"13px"}

                    >
                      <Box overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"}>{user.tap}</Box>
                      <Box overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"}>{user.content}</Box>
                      <Box overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"}>{formatDate(user.createdAt)}</Box>
                    </Grid>
                  </Link>
                  <Button size={"xs"} border="none" color='crimson' borderRadius="10px" margin="auto" onClick={() => {
                    Admincommentdelete(user._id, user.postId)
                  }}
                    onMouseOver={() => setIsListHover(true)}
                    onMouseOut={() => setIsListHover(false)}>
                    {isListHover ? <FaTrashCan /> : '댓글삭제'}
                  </Button>

                </Grid>
              </ListItem>
            ))}
          </List>
        </Box>
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
      </Flex>
    </>
  );
};
