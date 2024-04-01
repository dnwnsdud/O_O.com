import React from 'react';
import { Box, Button, ButtonGroup, Flex, Grid, HStack, VStack, Text, Link } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default () => {
    return <Box borderTop="3px solid #0B0B0D" height={'10rem'} bg='#0B0B0D' alignContent={'center'} color='#aaa' >
        <VStack height={'80%'} >
            <Box fontSize='sm' textAlign={'center'} >
                <Text>대표자 우준영</Text>
                <Text>고객센터 010-1234-1234</Text>
            </Box>
            <Grid templateColumns='1fr 1fr' justifyContent='center' alignItems='center' textAlign={'center'} width={'14rem'} >
                <Link width={'5rem'} fontSize='sm'>이용약관</Link>
                <Link width={'9rem'} fontSize='sm'>개인정보처리방침</Link>
            </Grid>
            <ButtonGroup variant='ghost' spacing='3' justifyContent='end' alignItems='center'>
                <Button colorScheme='facebook'>
                    <HStack>
                        <FaFacebook size='25px' />
                    </HStack>
                </Button>
                <Button colorScheme='twitter'>
                    <HStack >
                        <FaTwitter size='25px' />
                    </HStack>
                </Button>
                <Button colorScheme='pink'>
                    <HStack>
                        <FaInstagram size='25px' />
                    </HStack>
                </Button>
            </ButtonGroup>
        </VStack>
    </Box>
}