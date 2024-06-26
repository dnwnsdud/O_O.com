import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default () => {
  const nav = useNavigate();

  return (
    <Box
      borderTop="3px solid #0B0B0D"
      height={"10rem"}
      bg="#0B0B0D"
      alignContent={"center"}
      color="#aaa"
    >
      <VStack height={"80%"}>
        <Box fontSize="sm" textAlign={"center"}>
          <Text>대표자 우준영</Text>
          <Text>고객센터 010-1234-1234</Text>
        </Box>
        <Grid
          templateColumns="1fr 1fr"
          justifyContent="center"
          alignItems="center"
          textAlign={"center"}
          width={"14rem"}
        >
          <Link
            width={"5rem"}
            fontSize="sm"
            onClick={() => {
              nav("/terms");
            }}
          >
            이용약관
          </Link>
          <Link
            width={"9rem"}
            fontSize="sm"
            onClick={() => {
              nav("/userinfo");
            }}
          >
            개인정보처리방침
          </Link>
        </Grid>
        <ButtonGroup
          variant="ghost"
          spacing="3"
          justifyContent="end"
          alignItems="center"
        >
          <Link href="https://m.facebook.com/login/?locale=ko_KR&refsrc=deprecated">
            <Button colorScheme="facebook">
              <HStack>
                <FaFacebook size="25px" />
              </HStack>
            </Button>
          </Link>
          <Link href="https://twitter.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoia28ifQ%3D%3D%22%7D">
            <Button colorScheme="twitter">
              <HStack>
                <FaTwitter size="25px" />
              </HStack>
            </Button>
          </Link>
          <Link href="https://www.instagram.com/accounts/login/">
            <Button colorScheme="pink">
              <HStack>
                <FaInstagram size="25px" />
              </HStack>
            </Button>
          </Link>
        </ButtonGroup>
      </VStack>
    </Box>
  );
};
