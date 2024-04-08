import { Box, Button, Grid } from "@chakra-ui/react";
import React from "react";
import Today from "../component/board/Today";
import BaBoard from "../component/board/Baboard";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../hook/User";


export default () => {
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
              >
                LG
              </Button>
              <Button
                sx={{
                  backgroundColor: "#041E42 !important",
                  color: "#ffffff",
                }}
                size="xs"
              >
                롯데
              </Button>
              <Button
                sx={{
                  backgroundColor: "#EA0029 !important",
                  color: "#ffffff",
                }}
                size="xs"
              >
                기아
              </Button>
              <Button
                sx={{
                  backgroundColor: "#CE0E2D !important",
                  color: "#ffffff",
                }}
                size="xs"
              >
                SSG
              </Button>
              <Button
                sx={{
                  backgroundColor: "#000000 !important",
                  color: "#ffffff",
                }}
                size="xs"
              >
                KT
              </Button>
              <Button
                sx={{
                  backgroundColor: "#FF6600 !important",
                  color: "#ffffff",
                }}
                size="xs"
              >
                한화
              </Button>
              <Button
                sx={{
                  backgroundColor: "#074CA1 !important",
                  color: "#ffffff",
                }}
                size="xs"
              >
                삼성
              </Button>
              <Button
                sx={{
                  backgroundColor: "#131230 !important",
                  color: "#ffffff",
                }}
                size="xs"
              >
                두산
              </Button>
              <Button
                sx={{
                  backgroundColor: "#570514 !important",
                  color: "#ffffff",
                }}
                size="xs"
              >
                키움
              </Button>
              <Button
                sx={{
                  backgroundColor: "#315288 !important",
                  color: "#ffffff",
                }}
                size="xs"
              >
                NC
              </Button>
            </Grid>
          </Box>
          <Box marginBottom="4rem">
            <Today />
            <BaBoard user={user} />
          </Box>
          <Box border="1px solid red">3</Box>
        </Grid>
      </Box>
    </>
  );
};
