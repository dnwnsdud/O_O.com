import React from "react";
import {
  Stack,
  Button,
  Flex,
  Box
} from "@chakra-ui/react";
import ViewUserpost from "./ViewUserpost";
import ViewUsercomment from "./ViewUsercomment";
import ViewPenalty from "./ViewPenalty";

export default () => {
  return (
    <>
      <Stack bg={"#f7f7f8"}>
        <Box bg='white' w='50%' margin={'20px auto'} borderRadius={'10px'} shadow={'base'}>
          <Stack
            width={"90%"}
            margin={"20px auto"}
            spacing={8}
            h={"120vh"}
            bg={"#ffffff"}
            borderRadius={"0.5rem"}
          >
            <ViewPenalty />
            <ViewUserpost />
            <ViewUsercomment />
            <Flex justifyContent={"end"}>
              <Button padding={"10px"} w="80px" h="40px" border={"2px solid"} marginRight="30px"
                backgroundColor="#53535f !important" textColor={'#fff'}
                // borderColor={"rgba(11,11,13,.6)"} 
                onClick={() => {
                  window.history.back();
                }}>
                이전으로
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};
