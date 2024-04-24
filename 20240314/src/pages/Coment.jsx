import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Grid,
  useDisclosure
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlackModal from "./Modal";

export default ({ user }) => {
  const [content, setContent] = useState("");
  const [images, setImage] = useState("");
  const [baDetails, setbaDetails] = useState([]);
  const [cmtmodify, setCmtModify] = useState({});
  const [modifyContent, setModifyContent] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          console.log("댓글 성공!");
          setbaDetails(data.comment);
          setContent("");
        } else {
          console.log(data.error);
          alert(`댓글을 저장하는 동안 오류 발생:${data.error}`);
        }
      })
      .catch((error) => { });
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
          console.log("댓글 성공!");
          setbaDetails(data.comment);
        } else {
          console.log(data.error);
          alert(`댓글을 가져오는 동안 오류 발생:${data.error}`);
        }
      })
      .catch((error) => { });
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
            console.log("댓글을 삭제하였습니다.");
          } else {
            alert("댓글 삭제에 실패하였습니다.");
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
    fetch(
      "/api/commentupdate",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
      console.log("해볼게")
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("에런데영");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log("댓글 수정 성공!");
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
      .catch((error) => { });
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
                  <MenuButton textAlign="left" color={"#46a3d2"} fontWeight="bold">
                    {detail.nickname}
                  </MenuButton>
                  <MenuList minWidth="120px">
                    {user === "logout" ? (
                      <MenuItem disabled opacity={"0.5"}>
                        신고하기
                      </MenuItem>
                    ) : (
                      <MenuItem onClick={onOpen}>신고하기</MenuItem>
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
                  isOpen={isOpen}
                  onClose={onClose}
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
                        onClick={() => deleteComment(detail._id)}
                      >
                        삭제
                      </Button>
                    </Flex>
                  ) : (
                    ""
                  )
                ) : (
                  <Flex justifyContent="flex-end">
                    <Button size="xs" onClick={() => toggleModify(detail._id)}>
                      {cmtmodify[detail._id] ? "취소" : "수정"}
                    </Button>
                    {cmtmodify[detail._id] ? (
                      <Button
                        size="xs"
                        onClick={() => submitModify(detail._id)}
                      >
                        확인
                      </Button>
                    ) : (
                      <Button
                        size="xs"
                        onClick={() => deleteComment(detail._id)}
                      >
                        삭제
                      </Button>
                    )}
                  </Flex>
                )}
              </Grid>

              {
                !cmtmodify[detail._id] ? (
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
                  </FormControl>
                )
              }
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
                  textAlign: "center", // 플레이스홀더 텍스트를 가운데 정렬합니다.
                  opacity: 1, // 플레이스홀더 텍스트를 더 잘 보이게 합니다 (선택적).
                  color: "gray.500", // 플레이스홀더 텍스트 색상 변경 (선택적).
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
      {
        user == "logout" ? (
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
        )
      }
    </>
  );
};
