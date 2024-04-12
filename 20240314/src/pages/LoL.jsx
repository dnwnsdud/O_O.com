import { Box, Button, Grid } from "@chakra-ui/react";
import React from "react";
import Today from "../component/board/Today";
import Lolboard from "../component/board/Lolboard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useContext } from "react";
import { UserContext } from "../hook/User";

export default () => {

  const [selectedTeam, setSelectedTeam] = useState('모든 팀');
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
                  backgroundColor: "#e4002b !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTeam('T1')}
              >
                T1
              </Button>
              <Button
                sx={{
                  backgroundColor: "#aa8a00 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTeam('Gen.G')}
              >
                Gen.G
              </Button>
              <Button
                sx={{
                  backgroundColor: "#ff6b01 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTeam('한화생명')} >
                한화생명
              </Button>
              <Button
                sx={{
                  backgroundColor: "#000 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTeam('KT')}
              >
                KT
              </Button>
              <Button
                sx={{
                  backgroundColor: "#0ec7b5 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTeam('DK')}
              >
                DK
              </Button>
              <Button
                sx={{
                  backgroundColor: "#e73312 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTeam('광동')}
              >
                광동
              </Button>
              <Button
                sx={{
                  backgroundColor: "#FFC900 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTeam('피어엑스')}
              >
                피어엑스
              </Button>
              <Button
                sx={{
                  backgroundColor: "#de2027 !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTeam('농심')}
              >
                농심
              </Button>
              <Button
                sx={{
                  backgroundColor: "#5a8dff !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTeam('DRX')}
              >
                DRX
              </Button>
              <Button
                sx={{
                  backgroundColor: "#00492b !important",
                  color: "#ffffff",
                }}
                size="xs"
                onClick={() => setSelectedTeam('브리온')}
              >
                브리온
              </Button>
            </Grid>
          </Box>
          <Box border="1px solid red">
            <Today />
            <Lolboard selectedTeam={selectedTeam} user={user} />
          </Box>
          <Box border="1px solid red">3</Box>
        </Grid>
      </Box>
    </>
  );
};
