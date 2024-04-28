import {
  Box, Card,
  CardBody, Center,
  Grid,
  GridItem, Image,
  Stack,
  Text
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hook/User";
export default () => {
  const { user } = useContext(UserContext);
  const [render, setRender] = useState(false);
  const [stores, setStores] = useState([]);
  let nav = useNavigate();

  useEffect(() => {
    if (user === null || user === "logout" || user.role === "user") {
      nav("/");
    } else {
      setRender(true);
    }
    try {
      fetch("/api/itemsalse", { method: "get" })
        .then((response) => {
          if (response) {
            return response.json();
          } else {
            throw new Error(e);
          }
        })
        .then((data) => {
          if (data) {
            setStores(data);
          } else {
            alert(`판매된 상품을 출력하는 동안 오류 발생:${data.error}`);
          }
        })
        .catch((error) => {});
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  return (
    render && (
      <Center bg="#f7f7f8" minH={"80vh"}>
      
        <Stack
          bg="#fff"
          margin={"auto"}
          marginTop="10"
          marginBottom={"10"}
          border="1px solid #e6e6ea"
          borderRadius="10px"
          shadow={"base"}
          maxH={'60vh'}
          overflowX="auto"
        >
           <Box m='auto'>
            <Text textAlign={"center"} fontWeight="bold" pb="3">
              판매된 아이템 {stores.length}개
            </Text>
            </Box>
          <Box w="100%" p="0 20px">
            <Grid templateColumns="repeat(7, 1fr)" gap={'20px'}>
              {stores.map((store, index) => (
                <GridItem height="15rem"  key={index}>
                  <Card>
                    <CardBody>
                  <Box
                    h="7rem"
                    borderRadius={"8px"}
                    overflow={"hidden"}
                  >
                    <Image
                      src={store.images}
                      boxSize="100%"
                      objectFit="cover"
                      alt="아이템 이미지"
                      m="auto"
                    />
                  </Box>

                  <Text
                    textAlign={"center"}
                    fontSize={"10"}
                    fontWeight={"bold"}
                    minH={'2rem'}
                    alignContent={'center'}
                  >
                    {store.title}
                  </Text>
                  <Text textAlign={"center"} fontSize={"9"}>
                    {store.price}원
                  </Text>
                  <Text textAlign={"center"} fontSize={"9"}>구매이메일</Text>
                  <Text textAlign={"center"} fontSize={"11"}>
                   {store.email}
                  </Text>
                  </CardBody>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </Box>
        </Stack>
      </Center>
    )
  );
};
