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
import { useLocation } from "react-router-dom";

export default () => {
  const [baDetails, setbaDetails] = useState();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("id");
  const abc = 123;

  useEffect((e) => {
    fetch(`/api/boarddetail/?id=${paramValue}`)
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
        setbaDetails(data);
      });
  }, []);

  if (!baDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box>{baDetails.title}</Box>
      <Box>{baDetails.content}</Box>
    </>
  );
};
