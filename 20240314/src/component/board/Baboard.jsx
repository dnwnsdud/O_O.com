import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  HStack,
  VStack,
  Center,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/ko";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../hook/User";

moment.locale("ko");

const getDayMinuteCounter = (date) => {
  if (!date) {
    return "";
  }

  const today = moment();
  const postingDate = moment(date);
  const dayDiff = postingDate.diff(today, "days");
  const hourDiff = postingDate.diff(today, "hours");
  const minutesDiff = postingDate.diff(today, "minutes");

  if (dayDiff === 0 && hourDiff === 0) {
    const minutes = Math.ceil(-minutesDiff);
    return minutes + "분 전";
  }

  if (dayDiff === 0 && hourDiff < 24) {
    const hours = Math.ceil(-hourDiff);
    return hours + "시간 전";
  }

  return Math.abs(dayDiff) + "일 전";
};


export default ({ user }) => {
  const nav = useNavigate();

  const goToPage = () => {
    if (user !== "logout") {
      nav("/create");
    } else {
      alert("로그인이 필요합니다!");
    }
  };

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(10);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/boards");
        const contentType = response.headers.get("Content-type");

        if (contentType && contentType.includes("application/json")) {
          let data = await response.json();
          console.log(data);
          data.posts.sort((a, b) =>
            moment(b.createdAt).diff(moment(a.createdAt))
          );
          setPosts(data.posts);
          setTotalPosts(data.totalCount);
          console.log("확인");
          console.log(data);
        } else {
          throw new Error();
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };
    fetchPosts();
  }, []);

  // 페이지네이션 버튼

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageCount = Math.ceil(posts.length / postsPerPage);
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pageCount));
  };

  //페이지네이션
  const TOTAL_PAGES = Math.ceil(totalPosts / postsPerPage);
  const getPageNumbers = () => {
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = startPage + 4;
    if (endPage > TOTAL_PAGES) {
      endPage = TOTAL_PAGES;
      startPage = Math.max(endPage - 4, 1);
    }
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, idx) => startPage + idx
    );
  };

  const pageNumbers = getPageNumbers();

  return (
    <>
      <Box>
        <Box padding="0 10px" fontWeight="bold">
          야구
        </Box>
        <Flex padding="10px" fontWeight="bold" gap="10px" justify="end">
          <Button size="xs">최신순</Button>
          <Button size="xs">인기순</Button>
        </Flex>
        <Grid
          borderTop="1px solid #0B0B0D"
          borderBottom="1px solid #0B0B0D"
          textAlign="center"
          templateColumns="1fr 1fr 8fr 2fr 2fr 1fr 1fr"
        >
          <Box w="100%" textAlign="center">
            번호
          </Box>
          <Box>팀</Box>
          <Box>제목</Box>
          <Box>글쓴이</Box>
          <Box>작성일</Box>
          <Box>조회</Box>
          <Box>추천</Box>
        </Grid>
        {currentPosts.map((post, i) => (
          <Grid
            key={post._id}
            borderBottom="1px dotted #0B0B0D"
            textAlign="center"
            templateColumns="1fr 1fr 8fr 2fr 2fr 1fr 1fr"
            padding="10px 0"
          >
            <Box>{posts.length - ((currentPage - 1) * postsPerPage + i)}</Box>
            <Box>{post.team}</Box>
            <Box>
              <Link to={`/b/id=${post._id}`}>{post.title}</Link>
            </Box>
            <Box>{post.nickname}</Box>
            <Box>{getDayMinuteCounter(post.createdAt)}</Box>
            <Box>{post.count}</Box>
            <Box>{post.like}</Box>
          </Grid>
        ))}
        <Flex fontWeight="bold" justify="end" marginTop="10px">
          <Button
            sx={{
              backgroundColor: "#6f6dd9 !important",
              color: "white",
              _hover: {
                bg: "#E03F62",
              },
            }}
            onClick={goToPage}
          >
            글쓰기
          </Button>
        </Flex>
        <Flex justifyContent="center">
          <Button
            disabled={currentPage === 1} // 첫 페이지에서는 이전 버튼 비활성화
            onClick={handlePrevPage}
          >
            <ArrowLeftIcon />
          </Button>
          {pageNumbers.map((number) => (
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

        <Flex h={10} padding="10px" justify="end">
          <InputGroup w={200} size="xs">
            <Input pr="4.5rem" />
            <InputRightElement>
              <SearchIcon color="gray.300" />
            </InputRightElement>
          </InputGroup>
        </Flex>
      </Box>
    </>
  );
};
