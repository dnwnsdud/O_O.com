import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Button,
  Flex
} from "@chakra-ui/react";

import Requestbaseball from "../component/Requestbaseball";
import Requestlol from "../component/Requestlol";
import Requestsoccer from "../component/Requestsoccer";
import Requestsociety from "../component/Requestsociety";
import { useNavigate } from "react-router-dom";

export default () => {

  let nav = useNavigate();
  const [baseballData, setBaseballData] = useState([]);
  const [BaseballPosts, setBaseballPosts] = useState(10);

  const [lolData, setLolData] = useState([]);
  const [lolPosts, setLolPosts] = useState(10);

  const [soccerData, setSoccerData] = useState([]);
  const [soccerPosts, setSoccerPosts] = useState(10);

  const [societyData, setSocietyData] = useState([]);
  const [societyPosts, setSocietyPosts] = useState(10);


  useEffect(() => {
    try {
      fetch("/api/requestlist")
        .then((res) => {
          if (res) {
            return res.json();
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .then((data) => {
          if (data) {
            setBaseballData(data.baseball);
            setBaseballPosts(data.baseballCount);
            setLolData(data.lol);
            setLolPosts(data.lolCount);
            setSoccerData(data.soccer);
            setSoccerPosts(data.soccerCount);
            setSocietyData(data.society);
            setSocietyPosts(data.societyCount);
          } else {
            throw new Error("Data is empty");
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  return (
    <Box maxW="1300px" margin="auto">
      <Box padding="30px" fontSize="2rem" fontWeight="bold" textAlign="center">요청내역</Box>
      <Grid templateColumns={"1fr 1fr"} templateRows={"1fr 1fr"} gap="50px" paddingBottom="30px">
        <Box bg="#f6f6f6" borderRadius="0.5rem">
          <Requestbaseball baseballData={baseballData} BaseballPosts={BaseballPosts} />
        </Box>
        <Box bg="#f6f6f6" borderRadius="0.5rem">
          <Requestlol lolData={lolData} lolPosts={lolPosts} />
        </Box>
        <Box bg="#f6f6f6" borderRadius="0.5rem">
          <Requestsoccer soccerData={soccerData} soccerPosts={soccerPosts} />
        </Box>
        <Box bg="#f6f6f6" borderRadius="0.5rem">
          <Requestsociety societyData={societyData} societyPosts={societyPosts}/>
        </Box>
      </Grid>
      <Flex justifyContent={"end"} marginBottom={8}>
        <Button
          size="sm"
          bgColor="#6c839f !important"
          color="#ffffff"
          onClick={() => {
            nav(`/vote`);
          }}
        >
          요청
        </Button>
      </Flex>
    </Box>
  );
};
