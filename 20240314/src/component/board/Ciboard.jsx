import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Grid,
  useDisclosure
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
      onOpen()
    }
  };

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(10);
  const [postsPerPage] = useState(10);
  const currentTab = "사회";
  const [sortOrder, setSortOrder] = useState("최신순");
  const [selectedtab, setSelectedTab] = useState("전체");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = `/api/boards?tap=${encodeURIComponent(
          currentTab
        )}&team=${selectedtab}&sortOrder=${sortOrder}`;
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
  }, [sortOrder, selectedtab]);

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

  const tabStyles = {
    잡담: { color: "#ffffff", bg: "#C30452" },
    정치: { color: "#ffffff", bg: "#004EA1" },
    연예: { color: "#ffffff", bg: "#fff100" },
    여행: { color: "#ffffff", bg: "#007c36" },
    취미: { color: "#ffffff", bg: "#F37021" },
    경제: { color: "#ffffff", bg: "#E7141A" },
    역사: { color: "#ffffff", bg: "#074CA1" },
  };

  return (
    <>
      <Box>
        <Box
        // position={'relative'}
        >
          <Grid templateColumns="repeat(8 , 1fr)" gap={4}>
            <Button
              sx={{
                backgroundColor: "#5181e3 !important",
                color: "#ffffff",
              }}
              size="xs"
              onClick={() => setSelectedTab("전체")}
            >
              전체
            </Button>
            <Button
              sx={{
                backgroundColor: "#C30452 !important",
                color: "#ffffff",
              }}
              size="xs"
              onClick={() => setSelectedTab("잡담")}
            >
              잡담
            </Button>
            <Button
              sx={{
                backgroundColor: "#004EA1 !important",
                color: "#ffffff",
              }}
              size="xs"
              onClick={() => setSelectedTab("정치")}
            >
              정치
            </Button>
            <Button
              sx={{
                backgroundColor: "#EA0029 !important",
                color: "#ffffff",
              }}
              size="xs"
              onClick={() => setSelectedTab("연예")}
            >
              연예
            </Button>
            <Button
              sx={{
                backgroundColor: "#007c36 !important",
                color: "#ffffff",
              }}
              size="xs"
              onClick={() => setSelectedTab("여행")}
            >
              여행
            </Button>
            <Button
              sx={{
                backgroundColor: "#F37021 !important",
                color: "#ffffff",
              }}
              size="xs"
              onClick={() => setSelectedTab("취미")}
            >
              취미
            </Button>
            <Button
              sx={{
                backgroundColor: "#E7141A !important",
                color: "#ffffff",
              }}
              size="xs"
              onClick={() => setSelectedTab("경제")}
            >
              경제
            </Button>
            <Button
              sx={{
                backgroundColor: "#074CA1 !important",
                color: "#ffffff",
              }}
              size="xs"
              onClick={() => setSelectedTab("역사")}
            >
              역사
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
            사회
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
            <Box>분류</Box>
            <Box>제목</Box>
            <Box>글쓴이</Box>
            <Box>작성일</Box>
            <Box>조회</Box>
            <Box>추천</Box>
          </Grid>
          {currentPosts
            .filter(
              (post) => selectedtab === "전체" || post.team === selectedtab
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
                  color={tabStyles[post.team]?.color || "#000"}
                  bg={tabStyles[post.team]?.bg || "transparent"}
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
        <Flex h={"40px !important "} justifyContent="center">
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
      </Box>
      <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fillontSize='lg' fontWeight='bold'>
                로그인 오류발생
              </AlertDialogHeader>
              <AlertDialogBody>
                로그인이 필요합니다.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button  sx={{
                backgroundColor: "red !important",
                color: "#ffffff",
              }} onClick={()=>{
                onClose() 
            }} ml={3}>
                  돌아가기
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
    </>
  );
};
