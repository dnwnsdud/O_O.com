import React from "react";
import {
  Stack,
  Button,
  Flex
} from "@chakra-ui/react";
import ViewUserpost from "./ViewUserpost";
import ViewUsercomment from "./ViewUsercomment";
import ViewPenalty from "./ViewPenalty";

export default () => {
  return (
    <>
      <Stack bg={"#f7f7f8"}>
        <Stack
          width={"45%"}
          margin={"20px auto"}
          spacing={8}
          h={"140vh"}
          bg={"#ffffff"}
          borderRadius={"0.5rem"}
        >
          <ViewPenalty />
          <ViewUserpost />
          <ViewUsercomment />
          <Flex justifyContent={"end"}>
            <Button padding={"10px"} w="80px" h="40px" border={"2px solid"} marginRight="30px" borderColor={"rgba(11,11,13,.6)"} onClick={() => {
              window.history.back();
            }}>
              이전으로
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </>
  );
};
