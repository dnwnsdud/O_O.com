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

  const location = useLocation();
  const nav = useNavigate();
  let id = location.pathname.slice(location.pathname.indexOf("=") + 1);

  const body = {
    id: id,
    like: "",
  };

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
        setbaDetails(data);
        setLikeCount(data.like);
      });
  }, []);

  const like = (e) => {
    body.like = "like";
    e.preventDefault();
    fetch(`/api/boarddetail`, {
      method: "post",
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res) {
          console.log("성공하였습니다.");

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
      <Button
        onClick={() => {
          nav(`/b/${id}/modify`);
        }}
      >
        수정
      </Button>
    </>
  );
};
