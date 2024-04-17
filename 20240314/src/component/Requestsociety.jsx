import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Divider, Grid, List, ListIcon, ListItem, Stack, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";



export default()=>{
    const [societyData, setSocietyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = societyData.slice(indexOfFirstPost, indexOfLastPost);

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
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };
  let nav = useNavigate();

  useEffect(()=>{
    try{
        fetch("/api/requestlist")
            .then((res)=>{
                if(res){
                    return res.json();
                }else{
                    throw new Error("Network response was not ok")
                }
            })
            .then((data)=>{
                if(data){
                    setSocietyData(data.society);
                    setTotalPosts(data.societyCount);
                }else{
                    throw new Error("Data is empty")
                }
            })
    }catch (error) {
        console.error("Error fetching data:", error);
      }
  },[])
    return (
        <Center>
            <Stack>
                <Box>사회</Box>
                <List>
                    <Divider /> 
                {
                    currentPosts.map((data)=>{
                        return <ListItem key={data._id}>
                            <Grid templateColumns={"1fr 1fr 1fr 1fr"}>
                                <Box>{data.title}</Box>
                                <Box>{data.user}</Box>
                                <Box>{data.date}</Box>
                                <Button onClick={()=>{
                                    nav(`/requestlist/id=${data._id}`)
                                }}>자세히보기</Button>
                            </Grid>
                        </ListItem>
                    })
                }
                </List>
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
            </Stack>

        </Center>
    )
}