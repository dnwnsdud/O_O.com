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
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RepodeModal from "./RepodeModal";

export default () => {
  const [userData, setUserData] = useState([]);
  const [openData, setOpenData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const nav = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    try {
      fetch("/api/blackboard")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .then((data) => {
          if (data) {
            const sortedData = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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

  // 삭제
  const submit = (userId, postId, userEmail, state) => {
    let body = {
      id: userId,
      postId: postId,
      userEmail: userEmail,
      state: state
    };

    try {
      fetch("/api/reportsubmit", {
        method: "post",
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (res) {
            return res.json();
          } else {
            throw new Error();
          }
        })
        .then((data) => {
          if (data) {
            setUserData(data.reload);
            setOpenData(data.open.blackdetail);
            console.log("신고 내역삭제");
          } else {
            alert("신고 내역 삭제에 실패하였습니다.");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack w={"50%"} m={"auto"} direction={"column"} justifyContent={"center"}>
      <Stack
        height={"80%"}
        direction={"column"}
        justifyContent={"space-around"}
        borderRadius={"10px"}
        bg={"white"}
        boxShadow={"md"}
        p={10}
      >
        <Box height={"480px"}>
          <Box
            fontSize="30px"
            padding="0 30px"
            textAlign="center"
            fontWeight="bold"
            marginBottom="20px"
          >
            신고 관리
          </Box>
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
                <Grid
                  templateColumns=" 10fr 1fr 1fr 1fr"
                  textAlign="center"
                  padding={"8px 0"}
                  fontSize={"13px"}
                >
                  <Link to={`/b/id=${user.blackid}`}>
                    <Grid
                      templateColumns=" 1fr 1fr 1fr"
                      textAlign="center"
                      padding={"8px 0"}
                      fontSize={"13px"}
                    >
                      <Box
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        whiteSpace={"nowrap"}
                      >
                        {user.blacktype}
                      </Box>
                      <Box
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        whiteSpace={"nowrap"}
                      >
                        {user.email}
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
                  {user.blacktype === "기타" && (
                    <Button onClick={() => {
                      submit(user._id, user.blackid, user.email, "open"),
                        setTimeout(() => {
                          onOpen()
                        }, 400)
                    }}>내용보기</Button>
                  )}
                  <RepodeModal
                    openData={openData}
                    isOpen={isOpen}
                    onClose={onClose}
                  />
                  <Button onClick={() => submit(user._id, user.blackid, user.email, "reject")}>반려</Button>
                  <Button onClick={() => submit(user._id, user.blackid, user.email, "approval")}>승인</Button>
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
          {Array.from({ length: pageCount }, (_, idx) => idx + 1).map(
            (number) => (
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
            )
          )}
          <Button disabled={currentPage === pageCount} onClick={handleNextPage}>
            <ArrowRightIcon />
          </Button>
        </Flex>
      </Stack>
    </Stack>
  );
};
