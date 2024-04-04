import React from 'react';
import { Box, Button, ButtonGroup, Center, Flex, Grid, HStack, Input, Stack, VStack, Image, List } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default () => {
    return <Center>
        <Stack margin="100px 0" padding="50px 50px 60px" border="1px solid #0B0B0D" borderRadius="10px" width="1280px">
            <Box fontSize='30px' padding="0 30px" textAlign="center" fontWeight='bold' marginBottom="20px">내 승률</Box>
            <Box width="800px" border="1px solid black" borderRadius="10px" margin="auto" textAlign="center" height="200px">전체승률</Box>
            <Grid templateColumns="1fr 1fr" templaterows="1fr 1fr" width="800px" margin="auto" gap="10px">
                <Box width="395px" height="200px" textAlign="center" border="1px solid black" borderRadius="10px">야구승률</Box>
                <Box width="395px" height="200px" textAlign="center" border="1px solid black" borderRadius="10px">LOL승률</Box>
                <Box width="395px" height="200px" textAlign="center" border="1px solid black" borderRadius="10px">축구승률</Box>
                <Box width="395px" height="200px" textAlign="center" border="1px solid black" borderRadius="10px">세사게승률</Box>
            </Grid>
        </Stack>
    </Center>
}