import { Box, Button, Grid } from "@chakra-ui/react";
import React from "react";
import Today from "../component/board/Today";
import Ciboard from "../component/board/Ciboard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../hook/User";
export default () => {
  const [selectedtab, setSelectedTab] = useState("전체");
  const { user } = useContext(UserContext);
  return (
    <>
      <Box maxW="1280px" margin="auto">
        <Box h={20} bg="red" margin="20px 0"></Box>
        <Grid templateColumns="1fr 4fr 1fr" gap="20px">
          <Box>
            <Grid
              templateColumns="repeat(1 , 1fr)"
              gap="10px"
              padding="10px 30px"
            >
              <Button
                sx={{
                  backgroundColor: "#C30452 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTab("잡담")}
              >
                잡담
              </Button>
              <Button
                sx={{
                  backgroundColor: "#041E42 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTab("정치")}
              >
                정치
              </Button>
              <Button
                sx={{
                  backgroundColor: "#EA0029 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTab("연예")}
              >
                연예
              </Button>
              <Button
                sx={{
                  backgroundColor: "#CE0E2D !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTab("여행")}
              >
                여행
              </Button>
              <Button
                sx={{
                  backgroundColor: "#000000 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTab("취미")}
              >
                취미
              </Button>
              <Button
                sx={{
                  backgroundColor: "#FF6600 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTab("경제")}
              >
                경제
              </Button>
              <Button
                sx={{
                  backgroundColor: "#074CA1 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTab("역사")}
              >
                역사
              </Button>
            </Grid>
          </Box>
          <Box border="1px solid red">
            <Today />
            <Ciboard selectedtab={selectedtab} user={user} />
          </Box>
          <Box border="1px solid red">3</Box>
        </Grid>
      </Box>
    </>
  );
};
