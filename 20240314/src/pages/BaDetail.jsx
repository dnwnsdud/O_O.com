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
  // console.log(location.pathname.slice(location.pathname.indexOf("=")+1));
  let id = location.pathname.slice(location.pathname.indexOf("=")+1)
  console.log(id);
  // const queryParams = {id:`${location.pathname.slice(location.pathname.indexOf("=")+1)}`}
  // console.log(queryParams);
//   const paramValue = queryParams.get("id");
// console.log( );
  useEffect((e) => {
    fetch(`/api/boarddetail`,{method:'post',body:id})
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
