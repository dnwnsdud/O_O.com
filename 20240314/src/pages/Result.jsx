import { Box, Flex, Grid } from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import Calender from "./Calender";
import moment from "moment";
import { useUserContext } from "../hook/User";
moment.locale("ko");

export default () => {
  const { day, setDay } = useUserContext();

  useEffect(() => {
    fetch("/api/result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: day,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }, [day]);

  return (
    <>
      <Box maxW="1280px" margin="auto">
        <Box maxW="800px" margin="20px auto">
          <Calender
            defaultDate={
              new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate() - 1
              )
            }
            onChange={(date) => {
              setDay(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
              console.log(day,"day");
              console.log(date,"date");
            }}
          />
        </Box>
        <Grid templateColumns="1fr 4fr 1fr" gap="20px" w="100%">
          <Box marginTop="100px" border="1px solid black" h="450px" w="100%">
            광고
          </Box>
          <Box margin="20px 0" w="100%">
            <Box
              border="1px solid black"
              w="100%"
              h="200px"
              marginBottom="10px"
              textAlign="center"
              fontWeight="bold"
              fontSize="1.5 rem"
            >
              결과
            </Box>
            <Flex gap="10px" padding="10px">
              <Box
                border="1px solid black"
                w="100%"
                h="150px"
                textAlign="center"
              >
                야구
              </Box>
              <Box
                border="1px solid black"
                w="100%"
                h="150px"
                textAlign="center"
              >
                LOL
              </Box>
              <Box
                border="1px solid black"
                w="100%"
                h="150px"
                textAlign="center"
              >
                축구
              </Box>
              <Box
                border="1px solid black"
                w="100%"
                h="150px"
                textAlign="center"
              >
                사회
              </Box>
            </Flex>
          </Box>
          <Box marginTop="100px" border="1px solid black" h="450px" w="100%">
            광고
          </Box>
        </Grid>
      </Box>
    </>
  );
};
