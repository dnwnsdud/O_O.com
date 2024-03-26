import React from 'react';
import { Box, Button, ButtonGroup, Flex, Grid, HStack, VStack } from '@chakra-ui/react';
import {FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default ()=>{
    return <Box borderTop="3px solid #0B0B0D">
        <Grid templateColumns='1fr 1fr 1fr' gap={4} padding='30px 50px' margin="auto" width="1280px" >
            <Box>
                <Box>대표자: 우준영</Box>
                <Box>연락처: 010-1234-1234</Box>
            </Box>
            <Grid templateColumns='1fr 1fr' justifyContent='center' alignItems='center'>
                <Box >이용약관</Box>
                <Box>개인정보처리방침</Box>
            </Grid>
            <ButtonGroup variant='ghost' spacing='3' justifyContent='center' alignItems='center'>
                <Button colorScheme='facebook' >
                    <HStack>
                    <FaFacebook size='40px'/>
                    </HStack>
                </Button>
                <Button colorScheme='twitter'>
                    <HStack >
                    <FaTwitter size='40px' />
                    </HStack>
                </Button>
                <Button colorScheme='pink'>
                    <HStack>
                    <FaInstagram size='40px' />
                    </HStack>
                </Button>
            </ButtonGroup>
            
        </Grid> 
        </Box>
}