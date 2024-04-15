import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Grid, List, ListItem } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export default () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(10);

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
  const Adminwritedelete = (writeId, writeEmail)=>{
    let body={
        id:writeId,
        email:writeEmail
    }
    try{
        fetch('/api/adminwritedelete',{method:"post", body:JSON.stringify(body)})
        .then(res =>{
            if(res){
                return res.json();
            }else{
                throw new Error()
            }
        })
        .then(data=>{
            if(data){
                setUserData(data);
                console.log('게시글을 삭제하였습니다.');
            }else{
                alert('게시글 삭제에 실패하였습니다.')
            }
        }) 
    }catch(error){
        console.log(error);
    }
}

  return (
    <Flex justifyContent="center" flexDir={'column'}  padding="50px 50px 10px" border="1px solid #0B0B0D" borderRadius="10px" width="640px">
       <Box height={"480px"}>
         <Box fontSize='30px' padding="0 30px" textAlign="center" fontWeight='bold' marginBottom="20px">내 게시글</Box>
               <List >
            <Grid templateColumns=" 3fr 2fr 1fr 1fr 2fr" borderBottom="1px solid black" textAlign="center" padding={"8px 0"}>
              <Box>제목</Box>
              <Box>날짜</Box>
              <Box>조회</Box>
              <Box>추천</Box>
              <Box>게시글관리</Box>
            </Grid>
          {currentPosts.map((user) => (
            <ListItem key={user._id} >
                <Grid templateColumns="4fr 1fr" 
                    borderBottom="1px solid rgba(0,0,0,0.3)"
                    textAlign="center"
                    padding={"8px 0"}
                    fontSize={"13px"}>
                  <Link to={`/b/id=${user._id}`}>
                  <Grid
                    templateColumns=" 3fr 2fr 1fr 1fr"
                    textAlign="center"
                    padding={"8px 0"}
                    fontSize={"13px"}
                  >
                    <Box>{user.title}</Box>
                    <Box>{formatDate(user.createdAt)}</Box>
                    <Box>{user.count}</Box>
                    <Box>{user.like}</Box>
                  </Grid>
                  </Link>
                    <Button size={"xs"} border="1px solid black" borderRadius="10px" margin="auto" onClick={()=>{
                      Adminwritedelete(user._id, user.email)
                    }}>게시글삭제</Button>
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
  );
};
