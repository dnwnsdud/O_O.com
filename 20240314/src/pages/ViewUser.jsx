import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  List,
  ListItem,
  Text,
  Stack,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { useLocation, useSearchParams } from "react-router-dom";
import ViewUserpost from "./ViewUserpost";
import ViewUsercomment from "./ViewUsercomment";

export default () => {
  return (
    <>
      <Stack bg={"#f7f7f8"}>
        <Stack
          width={"45%"}
          margin={"20px auto"}
          spacing={8}
          h={"230vh"}
          bg={"#ffffff"}
          borderRadius={"0.5rem"}
        >
          <ViewUserpost />
          <ViewUsercomment/>
        </Stack>
      </Stack>
    </>
  );
};
