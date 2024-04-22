import { Box, Flex, Grid, Heading } from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import Calender from "./Calender";
import { useUserContext } from "../hook/User";

export default () => {
  const { day, setDay } = useUserContext();
  const [result, setResult] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setResult({});
      const response = await fetch("/api/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: day,
        }),
      });
      const data = await response.json();
      setResult(data.data);
      console.log(data.data, "data.data");
    };
    // .then((res) => res.json())
    // .then((res) => {
    //   console.log(res.data, "res.data");
    //   setResult(res.data);
    // });
    fetchData();
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
              setDay(
                `${date.getFullYear()}-${
                  date.getMonth() + 1 >= 10
                    ? date.getMonth() + 1
                    : `0${date.getMonth() + 1}`
                }-${
                  date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`
                }`
              );
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
              <Heading>O_O</Heading>
            </Box>
            <Flex gap="10px" padding="10px">
              <Box
                border="1px solid black"
                w="100%"
                h="150px"
                textAlign="center"
              >
                <Heading size={"m"}>야구</Heading>
              </Box>
              <Box
                border="1px solid black"
                w="100%"
                h="150px"
                textAlign="center"
              >
                <Heading size={"m"}>LOL</Heading>
              </Box>
              <Box
                border="1px solid black"
                w="100%"
                h="150px"
                textAlign="center"
              >
                <Heading size={"m"}>축구</Heading>
              </Box>
              <Box
                border="1px solid black"
                w="100%"
                h="150px"
                textAlign="center"
              >
                <Heading size={"m"}>사회</Heading>
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
