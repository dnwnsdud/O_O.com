import React from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/ko";
import { Link } from "react-router-dom";

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
  const currentTab = "LOL";
  const [sortOrder, setSortOrder] = useState("최신순");
  const [selectedTeam, setSelectedTeam] = useState("전체");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = `/api/boards?tap=${encodeURIComponent(
          currentTab
        )}&team=${selectedTeam}&sortOrder=${sortOrder}`;
        const response = await fetch(url);
        const contentType = response.headers.get("Content-type");

        if (contentType && contentType.includes("application/json")) {
          let data = await response.json();
          switch (sortOrder) {
            case "최신순":
              data.posts.sort((a, b) =>
                moment(b.createdAt).diff(moment(a.createdAt))
              );
              break;
            case "조회순":
              data.posts.sort((a, b) => b.count - a.count);
              break;
            case "추천순":
              data.posts.sort((a, b) => b.like - a.like);
              break;
            default:
              break;
          }

          setPosts(data.posts);
          setTotalPosts(data.totalCount);
        } else {
          throw new Error();
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };
    fetchPosts();
  }, [sortOrder, selectedTeam]);

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

  const teamStyles = {
    T1: { color: "#ffffff", bg: "#e4002b" },
    젠지: { color: "#ffffff", bg: "#aa8a00" },
    한화생명: { color: "#ffffff", bg: "#ff6b01" },
    KT: { color: "#ffffff", bg: "#000" },
    DK: { color: "#ffffff", bg: "#0ec7b5" },
    광동: { color: "#ffffff", bg: "#e73312" },
    피어엑스: { color: "#ffffff", bg: "#FFC900" },
    농심: { color: "#ffffff", bg: "#5a8dff" },
    DRX: { color: "#ffffff", bg: "#5a8dff" },
    브리온: { color: "#ffffff", bg: "#00492b" },
  };

  return (
    <>
      <Box>
        <Box
        // position={'relative'}
        >
          <Grid templateColumns="repeat(11 , 1fr)" gap={2}>
            <Button
              sx={{
                backgroundColor: "#5181e3 !important",
                color: "#ffffff",
              }}
              size="xs"
              onClick={() => setSelectedTeam("전체")}
            >
              전체
            </Button>
            <Button
              sx={{
                backgroundColor: "#e4002b !important",
                color: "#ffffff",
              }}
              size="xs"
              onClick={() => setSelectedTeam("T1")}
            >
              T1
            </Button>
            <Button
              sx={{
                backgroundColor: "#aa8a00 !important",
                color: "#ffffff",
              }}
              size="xs"
              onClick={() => setSelectedTeam("젠지")}
            >
              젠지
            </Button>
            <Button
              sx={{
                backgroundColor: "#ff6b01 !important",
                color: "#ffffff",
              }}
              size="xs"
              onClick={() => setSelectedTeam("한화생명")}
            >
              한화생명
            </Button>
            <Button
              sx={{
                backgroundColor: "#000 !important",
                color: "#ffffff",
              }}
              size="xs"
              onClick={() => setSelectedTeam("KT")}
            >
              KT
            </Button>
            <Button
              sx={{
                backgroundColor: "#0ec7b5 !important",
                color: "#ffffff",
              }}
              size="xs"
              onClick={() => setSelectedTeam("DK")}
            >
              DK
            </Button>
            <Button
              sx={{
                backgroundColor: "#e73312 !important",
                color: "#ffffff",
              }}
              size="xs"
              onClick={() => setSelectedTeam("광동")}
            >
              광동
            </Button>
            <Button
              sx={{
                backgroundColor: "#FFC900 !important",
                color: "#ffffff",
              }}
              size="xs"
              onClick={() => setSelectedTeam("피어엑스")}
            >
              피어엑스
            </Button>
            <Button
              sx={{
                backgroundColor: "#de2027 !important",
                color: "#ffffff",
              }}
              size="xs"
              onClick={() => setSelectedTeam("농심")}
            >
              농심
            </Button>
            <Button
              sx={{
                backgroundColor: "#5a8dff !important",
                color: "#ffffff",
              }}
              size="xs"
              onClick={() => setSelectedTeam("DRX")}
            >
              DRX
            </Button>
            <Button
              sx={{
                backgroundColor: "#00492b !important",
                color: "#ffffff",
              }}
              size="xs"
              onClick={() => setSelectedTeam("브리온")}
            >
              브리온
            </Button>
          </Grid>
        </Box>

        <Flex
          padding="10px"
          fontWeight="bold"
          gap="10px"
          justifyContent="space-between"
          marginTop={"20px"}
        >
          <Box fontSize={"1.5rem"} padding="0 10px" fontWeight="bold">
            LOL
          </Box>
          <Flex
            bg="#efeff1"
            h="2.5rem"
            w="11rem"
            gap="5px"
            justify={"center"}
            align={"center"}
            borderRadius={"10px"}
          >
            <Button
              size="xs"
              padding="15px 10px"
              backgroundColor={
                sortOrder === "최신순" ? "#fff !important" : "inherit"
              }
              color={sortOrder === "최신순" ? "black" : "#3b3b44"}
              onClick={() => {
                setSortOrder("최신순");
              }}
            >
              최신순
            </Button>
            <Button
              size="xs"
              backgroundColor={
                sortOrder === "조회순" ? "#fff !important" : "inherit"
              }
              color={sortOrder === "조회순" ? "black" : "#3b3b44"}
              padding="15px 10px"
              onClick={() => {
                setSortOrder("조회순");
              }}
            >
              조회순
            </Button>
            <Button
              size="xs"
              backgroundColor={
                sortOrder === "추천순" ? "#fff !important" : "inherit"
              }
              color={sortOrder === "추천순" ? "black" : "#3b3b44"}
              padding="15px 10px"
              onClick={() => {
                setSortOrder("추천순");
              }}
            >
              추천순
            </Button>
          </Flex>
        </Flex>

        <Box h={500}>
          <Grid
            borderTop="1px solid #dedee3"
            borderBottom="1px solid #dedee3"
            textAlign="center"
            templateColumns="1fr 1fr 8fr 2fr 2fr 1fr 1fr"
            padding="8px 0"
            color="black"
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
          {currentPosts
            .filter(
              (post) => selectedTeam === "전체" || post.team === selectedTeam
            )
            .map((post, i) => (
              <Grid
                key={post._id}
                borderBottom="1px solid #dedee3"
                textAlign="center"
                templateColumns="1fr 1fr 8fr 2fr 2fr 1fr 1fr"
                padding="10px 0"
              >
                <Box>
                  {posts.length - ((currentPage - 1) * postsPerPage + i)}
                </Box>
                <Box
                  color={teamStyles[post.team]?.color || "#000"}
                  bg={teamStyles[post.team]?.bg || "transparent"}
                  borderRadius={"0.5rem"}
                >
                  {post.team}
                </Box>
                <Link to={`/b/id=${post._id}`}>
                  <Flex
                    padding="0 20px 0 20px"
                    justifyContent="center"
                  >
                    <Box whiteSpace="nowrap"
                      isTruncated
                      maxW={"300px"}>
                      {post.title}</Box>
                    <Box color="#5181e3">[{post.comment.length}]</Box>
                  </Flex>
                </Link>
                <Box
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  padding="0 10px 0 10px"
                >
                  {post.nickname}
                </Box>
                <Box>{getDayMinuteCounter(post.createdAt)}</Box>
                <Box>{post.count}</Box>
                <Box>{post.like}</Box>
              </Grid>
            ))}
        </Box>
        <Flex fontWeight="bold" justify="end" marginTop="10px">
        <Button
            bg={"#53535f !important"}
            color="white"
            _hover={{ backgroundColor: "gray.800 !important" }}
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
              marginBottom={"10rem"}
            >
              {number}
            </Button>
          ))}
          <Button disabled={currentPage === pageCount} onClick={handleNextPage}>
            <ArrowRightIcon />
          </Button>
        </Flex>
        {/* 
        <Flex h={50} padding="10px" justify="center">
          <InputGroup w={400}>
            <Input
              pr="4.5rem"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputRightElement>
              <Button
                size="xs"
                padding="22px 17px"
                backgroundColor="#5181e3 !important"
                onClick={() => fetchPosts()}
              >
                <SearchIcon w="20px" h="20px" color="#fff" />
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex> */}
      </Box>
    </>
  );
};
