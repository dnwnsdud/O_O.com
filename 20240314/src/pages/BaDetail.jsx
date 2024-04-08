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
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default () => {
  const [baDetails, setbaDetails] = useState();
  const [likeCount, setLikeCount] = useState(0);
  const [Check, setCheck] = useState();

  const location = useLocation();
  const nav = useNavigate();
  let id = location.pathname.slice(location.pathname.indexOf("=") + 1);

  const body = {
    id: id,
    like: "",
  };

  // 게시글 나오게 하는 곳
  useEffect((e) => {
    fetch(`/api/boarddetail`, {
      method: "post",
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res) {
          return res.json();
        } else {
          throw new Error(e);
        }
      })
      .then((data) => {
        console.log(Check);
        console.log(data, "132134545");
        console.log(data.success, "확인용입니다");
        // setCheck(data.success);
        // console.log(Check);
        if (data.success) {
          setCheck(false);
          console.log("ㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㅇㅁㄴ");
        } else if (!data.success) {
          setCheck(true);
          console.log("ASDasdasdasdasdas");
        }
        setbaDetails(data.updatedDocument);
        setLikeCount(data.updatedDocument.like);
      });
  }, []);
  // 좋아요 부분
  const like = (e) => {
    body.like = "like";
    e.preventDefault();
    fetch(`/api/boarddetail`, {
      method: "post",
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res) {
          console.log("정동혁");

          return res.json();
        } else {
          throw new Error(e);
        }
      })
      .then((data) => {
        console.log(data);
        setLikeCount(data.like);
      });
  };

  //삭제
  const deleteSubmit = (e, userid, useremail) => {
    e.preventDefault();
    console.log("삭제");
    console.log("내 아이디다" + userid);
    alert("삭제하시겠습니까?");
    fetch("/api/boarddelete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ id: userid, email: useremail }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          alert("삭제되었습니다.");
          nav("/b");
        } else {
          alert("작성자만 삭제할 수 있습니다");
          console.log("삭제 실패얌");
        }
      })
      .catch((error) => {
        console.error("아이템 삭제 실패 : ", error);
      });
  };

  if (!baDetails) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Box>{baDetails.title}</Box>
      <Box>{likeCount}</Box>
      <Button
        onClick={(e) => {
          like(e);
          console.log("Hi");
        }}
      >
        추천~!
      </Button>
      {!Check ? (
        <Button
          onClick={() => {
            nav(`/b/${id}/modify`);
          }}
        >
          수정
        </Button>
      ) : (
        ""
      )}
      <Button onClick={(e) => deleteSubmit(e, baDetails._id, baDetails.email)}>
        삭제
      </Button>
    </>
  );
};
