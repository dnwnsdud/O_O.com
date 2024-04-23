import React, { useEffect, useState } from "react";
import {Box, Container, Stack, Text, Image, Grid, GridItem, Center} from "@chakra-ui/react";

export default () => {

    
    const [stores, setStores] = useState([]);

    useEffect(() => {
        try {
          fetch('/api/itemsalse', { method: 'get' })
            .then(response => {
              if (response) {
                console.log(response);
                return response.json();
              }
              else {
                throw new Error(e);
              }
            })
            .then(data => {
              if (data) {
                setStores(data);
                console.log(data);
              } else {
                alert(`판매된 상품을 출력하는 동안 오류 발생:${data.error}`);
              }
            })
            .catch(error => {
            });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }, []);
    
    return<Center bg='#f7f7f8'>
        <Stack bg='#fff' margin={'auto'} marginTop='10' marginBottom={'10'}
        border="1px solid #e6e6ea"
        borderRadius="10px"
        shadow={'base'}
        >
        <Box >
        <Text textAlign={'center'} fontWeight='bold' pb='3'>판매된 아이템</Text>
        <Grid templateColumns='repeat(5, 1fr)' gap={19}>
            {stores.map((store, index) => (
              <GridItem
                height='10rem' width='100%' key={index}>
                {/* <Box>{store.images}</Box> */}
                <Box w='100%' h='7rem' borderRadius={'8px'} overflow={'hidden'}>
                  <Image
                    src={store.images}
                    boxSize='100%'
                    objectFit='cover'
                    alt="아이템 이미지"
                    m='auto'
                  />
                </Box>
                
                <Text textAlign={'center'} fontSize={'14'} fontWeight={'bold'}>{store.title}</Text>
                <Text textAlign={'center'} fontSize={'13'}>{store.price}원</Text>
             
              </GridItem>
            )
            )}
          </Grid>
          </Box>
        </Stack>
    </Center>
}