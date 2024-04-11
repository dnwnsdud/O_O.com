import {
  Box,
  Button,
  Center,
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
  Select,
  Grid
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default ({ user }) => {
  const [content, setContent] = useState("");
  const [images, setImage] = useState("");
  const [itemImageError, setItemImageError] = useState(false);
  const [baDetails, setbaDetails] = useState([]);
  const [cmtmodify, setCmtModify] = useState({});
  const [modifyContent, setModifyContent] = useState({});

  const handleInputChange2 = (e) => setContent(e.target.value);
  const handleModifyInputChange = (e, commentId) => {
    setModifyContent({
      ...modifyContent,
      [commentId]: e.target.value
    });
  };

  const isError2 = content === "";
  const isError3 = content === "";

  const nav = useNavigate();
  let id = location.pathname.slice(location.pathname.indexOf("=") + 1);

  let body = {
    id: id,
    nickname: user.nickname,
    content: content
  };

  const onSubmitHandler = (e) => {
    fetch(
      "/api/commentcreate",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    )
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
          setContent('');
        } else {
          console.log(data.error);
          alert(`댓글을 저장하는 동안 오류 발생:${data.error}`);
        }
      })
      .catch((error) => { });
  };

  useEffect(() => {
    fetch(
      "/api/commentcreate",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    )
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
      [commentId]: !cmtmodify[commentId]
    });
    if (!cmtmodify[commentId]) {
      fetch(`/api/comment/${commentId}`)
        .then(response => response.json())
        .then(data => {
          setModifyContent({
            ...modifyContent,
            [commentId]: data.content
          });
        })
        .catch(error => console.error('댓글 내용을 가져오는 중 오류 발생:', error));
    }
  };

  const deleteComment = (commentId) => {
    let body = {
      id: commentId,
      postId: id,
    };

    try {
      fetch('/api/commentdelete', { method: "post", body: JSON.stringify(body) })
        .then(res => {
          if (res) {
            return res.json();
          } else {
            throw new Error();
          }
        })
        .then(data => {
          console.log(data);
          if (data) {
            setbaDetails(data.comment);
            console.log('댓글을 삭제하였습니다.');
          } else {
            alert('댓글 삭제에 실패하였습니다.');
          }
        })
    } catch (error) {
      console.log(error);
    }
  };

  const submitModify = (commentId) => {
    const modifiedContent = modifyContent[commentId] || ''; // 수정된 내용 또는 빈 문자열
    const body = {
      id: commentId,
      postId: id,
      content: modifiedContent
    };
    fetch('/api/commentupdate', { // 해당 댓글을 업데이트하는 API 엔드포인트로 수정
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
          console.log("댓글 수정 성공!");
          setbaDetails(data.comment);
          setCmtModify({
            ...cmtmodify,
            [commentId]: false // 수정 상태 해제
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
          댓글 작성
        </Text>
      </Stack>
      <Box>
        <Divider
          orientation="horizontal"
          borderBottomWidth={"2px"}
          borderColor={"#666666"}
          marginTop={"5px"}
          marginBottom={"5px"}
        />
        <FormControl isInvalid={isError2} isRequired>
          <FormLabel>내용</FormLabel>
          <Textarea
            value={content}
            onChange={handleInputChange2}
            size={"lg"}
            resize={"none"}
            h={"150px"}
          />
          {!isError2 ? (
            <FormHelperText color={"#3182ce"}>
              입력하신 내용으로 요청이 됩니다.
            </FormHelperText>
          ) : (
            <FormErrorMessage>해당 칸을 입력해주세요</FormErrorMessage>
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
      <Flex justifyContent={"end"} gap={3}>
        <Button border={"2px solid"} borderColor={"rgba(11,11,13,.6)"}>
          취소
        </Button>
        <Button
          border={"2px solid"}
          borderColor={"rgba(11,11,13,.6)"}
          onClick={() => {
            onSubmitHandler();
          }}
        >
          작성
        </Button>
      </Flex>
      <Box>
        {
          baDetails.map((detail) => {
            return (
              <Box borderBottom="1px solid black" marginBottom="20px">
                <Grid
                  key={detail._id}
                  templateColumns="2fr 5fr"
                >
                  <Box>{detail.nickname}</Box>
                  <Flex justifyContent="flex-end">
                    <Button size="xs" onClick={() => toggleModify(detail._id)}>{cmtmodify[detail._id] ? "취소" : "수정"}</Button>
                    {cmtmodify[detail._id] ? <Button size="xs" onClick={() => submitModify(detail._id)}>확인</Button>: <Button size="xs" onClick={() => deleteComment(detail._id)}>삭제</Button>}
                    
                  </Flex>
                </Grid>

                {
                  !cmtmodify[detail._id] ? <Box>{detail.content}</Box> :
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
                }
              </Box>
            )
          })
        }
      </Box>
    </>
  );
};