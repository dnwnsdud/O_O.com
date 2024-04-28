import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hook/User";

import { IoPeopleCircleSharp } from "react-icons/io5";
import MyStore from "../pages/MyStore";
import Mycomment from "./Mycomment";
import Mypost from "./Mypost";

const Loading = (align, justify, width, height) => {
  return (
    <Flex
      alignItems={align || "center"}
      justifyItems={justify || "center"}
      width={width || "200%"}
      height={height || ""}
    >
      <Spinner
        m={"auto"}
        w={"80px"}
        h={"80px"}
        thickness="7px"
        speed="0.65s"
        color="black.500"
        size="xl"
      />
    </Flex>
  );
};

export default () => {
  const [userData, setUserData] = useState([]);
  const [render, setRender] = useState(false);
  const { user } = useContext(UserContext);
  let [isLoading, setIsLoading] = useState(true);

  let nav = useNavigate();
  useEffect((e) => {
    if (user === null || user === "logout") {
      nav("/");
    } else {
      setRender(true);
    }
    try {
      fetch("/api/mypage")
        .then((response) => {
          if (response) {
            return response.json();
          } else {
            throw new Error(e);
          }
        })
        .then((data) => {
          if (data) {
            setUserData(data);
            setIsLoading(false);
          } else {
            alert(`사용자를 저장하는 동안 오류 발생:${data.error}`);
          }
        })
        .catch((error) => {});
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  return (
    render && (
      <Box bg="#f7f7f8">
        {isLoading && Loading("center", "center", "100%", "80vh")}
        {!isLoading && (
          <Grid
            width={"65%"}
            margin={"auto"}
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(2, 1fr)"
          >
            <GridItem rowSpan={2} colSpan={1}>
              <Stack
                margin="100px 0"
                padding="50px 50px 60px"
                border="1px solid #e6e6ea"
                boxShadow="base"
                borderRadius="10px"
                width="500px"
                bg="#fff"
              >
                <Box
                  fontSize="30px"
                  padding="0 30px"
                  textAlign="center"
                  fontWeight="bold"
                  marginBottom="20px"
                >
                  내 정보
                </Box>
                <Grid templateColumns="1fr 1fr" width="70%" margin="auto">
                  {userData.images === "0" ? (
                    <IoPeopleCircleSharp size={100} />
                  ) : (
                    <Box
                      borderRadius="50%"
                      width="50px"
                      height="50px"
                      margin="auto"
                      overflow="hidden"
                    >
                      <Image
                        src={userData.images}
                        boxSize="100%"
                        objectFit="cover"
                        alt="유저 이미지"
                        m="auto"
                      />
                    </Box>
                  )}
                  <Box margin={"auto"}>
                    <Box
                      textAlign="center"
                      borderBottom="1px solid #e6e6ea"
                      marginBottom="5px"
                      h={"25px"}
                      color="black"
                      w={"150px"}
                    >
                      {userData.name}
                    </Box>
                    <Box
                      textAlign="center"
                      borderBottom="1px solid #e6e6ea"
                      marginBottom="5px"
                      h={"25px"}
                      color="black"
                      w={"150px"}
                    >
                      {userData.nickname}
                    </Box>
                  </Box>
                </Grid>
                <Grid templateRows="1fr 1fr 1fr 1fr" gap="20px" margin="30px 0">
                  <Box
                    textAlign="center"
                    borderBottom="1px solid #e6e6ea"
                    marginBottom="5px"
                    h={"25px"}
                    color="black"
                    width="80%"
                    margin="auto"
                  >
                    {userData.email}
                  </Box>
                  <Box
                    textAlign="center"
                    borderBottom="1px solid #e6e6ea"
                    marginBottom="5px"
                    h={"25px"}
                    color="black"
                    width="80%"
                    margin="auto"
                  >
                    {userData.team}
                  </Box>
                  <Box
                    textAlign="center"
                    borderBottom="1px solid #e6e6ea"
                    marginBottom="5px"
                    h={"25px"}
                    color="black"
                    width="80%"
                    margin="auto"
                  >
                    포인트 {userData.point}
                  </Box>
                  <Box
                    textAlign="center"
                    borderBottom="1px solid #e6e6ea"
                    marginBottom="5px"
                    h={"25px"}
                    color="black"
                    width="80%"
                    margin="auto"
                  >
                    {userData.rating &&
                    userData.rating.win + userData.rating.lose > 0
                      ? (
                          (userData.rating.win /
                            (userData.rating.win + userData.rating.lose)) *
                          100
                        ).toFixed(1) + "%"
                      : "승률 정보 없음"}
                  </Box>
                </Grid>
                <Grid justifyContent="center" gap="10px">
                  <Button
                    width="100px"
                    border="1px solid #e6e6ea"
                    boxShadow="base"
                    borderRadius="10px"
                    onClick={() => {
                      nav("/modify");
                    }}
                  >
                    정보수정
                  </Button>
                </Grid>
              </Stack>
            </GridItem>
            <GridItem colSpan={1} marginTop={"80px"}>
              <Mypost />
            </GridItem>

            <GridItem colSpan={1}>
              <Mycomment />
            </GridItem>

            <Text fontWeight={"bold"}>내 아이템</Text>
            <GridItem
              colSpan={2}
              border={"1px solid e6e6ea"}
              boxShadow="base"
              borderRadius="10px"
              mb="10"
            >
              <MyStore />
            </GridItem>
          </Grid>
        )}
      </Box>
    )
  );
};