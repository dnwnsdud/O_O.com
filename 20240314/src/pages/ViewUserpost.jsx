import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Grid, List, ListItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [totalPosts, setTotalPosts] = useState(6);
  const [searchParams] = useSearchParams();
  const nickname = searchParams.get("nickname");

  useEffect(() => {
    if (nickname) {
      const encodedNickname = encodeURIComponent(nickname);
      const url = `/api/viewuserpost?nickname=${encodedNickname}`;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .then((data) => {
          if (data) {
            const sortedData = data.data.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setUserData(sortedData);
            setTotalPosts(data.totalCount);
          } else {
            throw new Error("Data is empty");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [nickname]);

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
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <>
      <Box padding={"20px 20px 0 20px"} fontWeight={"bold"}>
        "{nickname}" 님의 게시글
      </Box>
      <Flex
        justifyContent="center"
        flexDir={"column"}
        padding="10px 50px 10px"
        border="1px solid #e6e6ea"
        boxShadow="base"
        borderRadius="10px"
        width="100%"
        height={"350px"}
      >
        <Box height={"100%"}>
          <List>
            <Grid
              templateColumns=" 3fr 2fr 1fr 1fr"
              borderBottom="1px solid #adadb8"
              textAlign="center"
              padding={"8px 0"}
              fontWeight={"bold"}
            >
              <Box>제목</Box>
              <Box>날짜</Box>
              <Box>조회</Box>
              <Box>추천</Box>
            </Grid>
            {currentPosts.map((user) => (
              <ListItem key={user._id}>
                <Link to={`/b/id=${user._id}`}>
                  <Grid
                    templateColumns="3fr 2fr 1fr 1fr"
                    borderBottom="1px solid #e6e6ea"
                    textAlign="center"
                    fontSize={"13px"}
                    padding={"10px 0"}
                  >
                    <Box isTruncated paddingLeft={"20px"}>
                      {user.title}
                    </Box>
                    <Box>{formatDate(user.createdAt)}</Box>
                    <Box>{user.count}</Box>
                    <Box>{user.like}</Box>
                  </Grid>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
        <Flex justifyContent="center" marginTop={"10px"}>
          <Button
            size={"xs"}
            disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            <ArrowLeftIcon />
          </Button>
          {Array.from({ length: pageCount }, (_, idx) => idx + 1).map(
            (number) => (
              <Button
                size={"xs"}
                key={number}
                onClick={() => paginate(number)}
                mx="1"
                bg={currentPage === number ? "#f9f9f9 !important" : "#000000"}
                variant={currentPage === number ? "outline" : "ghost"}
                color={currentPage === number ? "#000000" : "#999999"}
              >
                {number}
              </Button>
            )
          )}
          <Button
            size={"xs"}
            disabled={currentPage === pageCount}
            onClick={handleNextPage}
          >
            <ArrowRightIcon />
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
