import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlackModal from "./Modal";

export default ({ user }) => {
  const [content, setContent] = useState("");
  const [baDetails, setbaDetails] = useState([]);
  const [cmtmodify, setCmtModify] = useState({});
  const [modifyContent, setModifyContent] = useState({});
  let [commentId, setCommentId] = useState(""); 
  const {
    isOpen: isModal,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const {
    isOpen: isAlert,
    onOpen: openAlert,
    onClose: closeAlert,
  } = useDisclosure();
  const cancelRef = React.useRef();


  const handleInputChange2 = (e) => setContent(e.target.value);
  const handleModifyInputChange = (e, commentId) => {
    setModifyContent({
      ...modifyContent,
      [commentId]: e.target.value,
    });
  };

  const isError3 = content === "";

  const nav = useNavigate();
  let id = location.pathname.slice(location.pathname.indexOf("=") + 1);

  let body = {
    id: id,
    nickname: user.nickname,
    content: content,
    email: user.email,
  };

  const onSubmitHandler = (e) => {
    fetch("/api/commentcreate", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setbaDetails(data.comment);
          setContent("");
        } else {
          console.log(data.error);
          alert(`댓글을 저장하는 동안 오류 발생:${data.error}`);
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    fetch("/api/commentcreate", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setbaDetails(data.comment);
        } else {
          console.log(data.error);
          alert(`댓글을 가져오는 동안 오류 발생:${data.error}`);
        }
      })
      .catch((error) => {});
  }, []);

  const toggleModify = (commentId) => {
    setCmtModify({
      ...cmtmodify,
      [commentId]: !cmtmodify[commentId],
    });
  };

  const deleteComment = (commentId) => {
    let body = {
      id: commentId,
      postId: id,
    };

   
      try {
        fetch("/api/commentdelete", {
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
              setbaDetails(data.comment);
            } 
          });
      } catch (error) {
        console.log(error);
      }
    
  };
  const submitModify = (commentId) => {
    const modifiedContent = modifyContent[commentId] || "";
    const body = {
      id: commentId,
      postId: id,
      content: modifiedContent,
    };
    fetch("/api/commentupdate", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("에런데영");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setbaDetails(data.comment);
          setCmtModify({
            ...cmtmodify,
            [commentId]: false,
          });
        } else {
          console.log(data.error);
          alert(`댓글을 수정하는 동안 오류 발생:${data.error}`);
        }
      })
      .catch((error) => {});
  };

  return (
    <>
      <Divider
        orientation="horizontal"
        borderBottomWidth={"2px"}
        borderColor={"#666666"}
        marginTop={"50px"}
        marginBottom={"5px"}
      />
      <Stack>
        <Text fontSize={"xl"} color={"#0b0b0d"} fontWeight={"bold"}>
          댓글
        </Text>
      </Stack>
      <Box>
        <Divider
          orientation="horizontal"
          borderBottomWidth={"2px"}
          borderColor={"#e0e0e0"}
          marginTop={"5px"}
          marginBottom={"5px"}
        />
        {baDetails.map((detail) => {
          return (
            <Box key={detail._id} borderBottom="1px solid #e0e0e0">
              <Grid key={detail._id} templateColumns="2fr 5fr">
                <Menu>
                  <MenuButton
                    textAlign="left"
                    color={"#46a3d2"}
                    fontWeight="bold"
                  >
                    {detail.nickname}
                  </MenuButton>
                  <MenuList minWidth="120px">
                    {user === "logout" ? (
                      <MenuItem disabled opacity={"0.5"}>
                        신고하기
                      </MenuItem>
                    ) : (
                      <MenuItem onClick={openModal}>신고하기</MenuItem>
                    )}
                    <MenuItem
                      onClick={() =>
                        nav(
                          `/view?nickname=${encodeURIComponent(
                            detail.nickname
                          )}`
                        )
                      }
                    >
                      유저정보 보기
                    </MenuItem>
                  </MenuList>
                </Menu>
                <BlackModal
                  isOpen={isModal}
                  onClose={closeModal}
                  postId={id}
                  userEmail={baDetails.email}
                />
                {user == "logout" ? (
                  ""
                ) : detail.email !== user.email ? (
                  user.role == "admin" ? (
                    <Flex justifyContent="flex-end">
                      <Button
                        size="xs"
                        onClick={() => toggleModify(detail._id)}
                        display={"none"}
                      ></Button>
                      <Button
                        size="xs"
                        onClick={()=>{
                          setCommentId(detail._id)
                          openAlert()
                        }}

                      >
                        삭제
                      </Button>
                    </Flex>
                  ) : (
                    ""
                  )
                ) : (
                  <Flex justifyContent="flex-end">
                    {cmtmodify[detail._id] ? (
                      ""
                    ) : (
                      <Button
                        size="xs"
                        onClick={() => toggleModify(detail._id)}
                      >
                        수정
                      </Button>
                    )}
                    {cmtmodify[detail._id] ? (
                      ""
                    ) : (
                      <Button
                        size="xs"
                        onClick={()=>{
                          setCommentId(detail._id)
                          openAlert()
                        }}
                      >
                        삭제
                      </Button>
                    )}
                  </Flex>
                )}
              </Grid>

              {!cmtmodify[detail._id] ? (
                <Box padding={"10px 0"}>{detail.content}</Box>
              ) : (
                <FormControl isInvalid={isError3} isRequired>
                  <FormLabel>내용</FormLabel>
                  <Textarea
                    value={modifyContent[detail._id] || detail.content}
                    onChange={(e) => handleModifyInputChange(e, detail._id)}
                    size={"lg"}
                    resize={"none"}
                    h={"150px"}
                  />
                  {!isError3 ? (
                    <FormHelperText color={"#3182ce"}>
                      입력하신 내용으로 요청이 됩니다.
                    </FormHelperText>
                  ) : (
                    <FormErrorMessage>해당 칸을 입력해주세요</FormErrorMessage>
                  )}
                  <Flex
                    justifyContent="flex-end"
                    gap={"3px"}
                    paddingBottom={"10px"}
                  >
                    <Button
                      size="xs"
                      color={"#ffffff"}
                      backgroundColor="#53535f !important"
                      onClick={() => toggleModify(detail._id)}
                    >
                      {cmtmodify[detail._id] ? "취소" : "수정"}
                    </Button>
                    {cmtmodify[detail._id] ? (
                      <Button
                        size="xs"
                        color={"#ffffff"}
                        backgroundColor="#53535f !important"
                        onClick={() => submitModify(detail._id)}
                      >
                        수정
                      </Button>
                    ) : (
                      <Button
                        size="xs"
                        onClick={()=>{
                          setCommentId(detail._id)
                          openAlert()
                        }}
                      >
                        삭제
                      </Button>
                    )}
                  </Flex>
                </FormControl>
              )}
            </Box>
          );
        })}
        <FormControl>
          <FormLabel marginTop={"10px"}>내용</FormLabel>
          {user == "logout" ? (
            <Textarea
              value={content}
              onChange={handleInputChange2}
              size={"lg"}
              resize={"none"}
              h={"70px"}
              disabled={true}
              placeholder="로그인이 필요합니다!!"
              sx={{
                "::placeholder": {
                  textAlign: "center",
                  opacity: 1, 
                  color: "gray.500",
                  lineHeight: "70px",
                },
                padding: "0",
              }}
            />
          ) : (
            <Textarea
              value={content}
              onChange={handleInputChange2}
              size={"lg"}
              resize={"none"}
              h={"70px"}
            />
          )}
        </FormControl>
        <FormControl marginTop="20px">
          <Input
            value={"nickname"}
            placeholder={user.nickname}
            readOnly
            hidden
          />
        </FormControl>
      </Box>
      {user == "logout" ? (
        <Flex justifyContent={"end"} gap={3}>
          <Button
            backgroundColor="#53535f !important"
            color={"#ffffff"}
            isDisabled={true}
            onClick={() => {
              onSubmitHandler();
            }}
          >
            작성
          </Button>
        </Flex>
      ) : (
        <Flex justifyContent={"end"} gap={3}>
          <Button
            backgroundColor="#53535f !important"
            color={"#ffffff"}
            onClick={() => {
              onSubmitHandler();
            }}
          >
            작성
          </Button>
        </Flex>
      )}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={closeAlert}
        isOpen={isAlert}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>이 댓글을 삭제하시겠습니까?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>삭제하면 다시 복구할 수 없습니다.</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={closeAlert}>
              취소
            </Button>
            <Button
                        onClick={() => {deleteComment(commentId), closeAlert()}}
                      >
                        삭제
                      </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
