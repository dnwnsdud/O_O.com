import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../hook/User";
import {
  Box,
  Button,
  Flex,
  Grid,
  List,
  ListItem,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(10);

  const nav = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    try {
      fetch("/api/notices")
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
    } catch (error) {
      console.error("Error fetching data:", error);
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
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <Box bg={"#f7f7f8"}>
      <Stack w={"50%"} m={"auto"} direction={"column"} justifyContent={"center"} >
        <Stack
          height={"80%"}
          direction={"column"}
          justifyContent={"space-around"}
          borderRadius={"10px"}
          bg={"white"}
          boxShadow={"base"}
          p={10}
          my='10'
        >
          <Box height={"480px"}>
            <Box
              fontSize="30px"
              padding="0 30px"
              textAlign="center"
              fontWeight="bold"
              marginBottom="20px"
            >
              공지사항
            </Box>
            <Flex justifyContent={"end"}>
              {user.role === "admin" && (
                <Button
                  onClick={() => {
                    nav(`/n/write`);
                  }}
                >
                  작성
                </Button>
              )}
            </Flex>
            <Divider
              orientation="horizontal"
              borderBottomWidth={"2px"}
              borderColor={"#0b0b0d"}
              marginTop={"5px"}
              marginBottom={"5px"}
            />
            <List>
              {currentPosts.map((user) => (
                <ListItem key={user._id}>
                  <Link to={`/n/id=${user._id}`}>
                    <Grid
                      templateColumns=" 1fr 5fr 1fr "
                      textAlign="center"
                      padding={"8px 0"}
                      fontSize={"13px"}
                      borderBottom={"1px solid #e0e0e0"}
                    >
                      <Box
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        whiteSpace={"nowrap"}
                        color={'darkblue'}
                        fontWeight={"bold"}
                      >
                        [공지]
                      </Box>
                      <Box
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        whiteSpace={"nowrap"}
                      >
                        {user.title}
                      </Box>
                      <Box
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        whiteSpace={"nowrap"}
                      >
                        {formatDate(user.createdAt)}
                      </Box>
                    </Grid>
                  </Link>
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
            {Array.from({ length: pageCount }, (_, idx) => idx + 1).map(
              (number) => (
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
              )
            )}
            <Button
              size={'xs'} disabled={currentPage === pageCount} onClick={handleNextPage}>
              <ArrowRightIcon />
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </Box>
  );
};
