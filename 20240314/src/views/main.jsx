import React from "react";
import { Stack, Box, Flex, Button, Text, UnorderedList, ListItem, List, Divider, Link } from "@chakra-ui/react";

export default () => {
    return <div>
        <Stack bg={'gray.50'} width={"45%"} margin={"auto"} spacing={8} h={"180vh"}>
            <Box display={"flex"} flexDirection={"column"} bg={'white'} h={"20%"} borderRadius={"10px"} boxShadow={"md"}>
                <Text fontSize={"6xl"} fontWeight={"bold"} textAlign={"center"} color="#0B0B0D">오늘의 O_O</Text>
                <Button border={"2px solid #0b0b0d"} >이전결과</Button>
            </Box>
            <List bg={'white'} h={"12%"} borderRadius={"10px"} spacing={.5} paddingLeft={6} paddingRight={6} paddingTop={3} paddingBottom={3} boxShadow={"md"}>
                <Link fontSize={"xl"} fontWeight={"bold"}>공지사항</Link>
                <Divider orientation='horizontal' />
                <ListItem><Link>Lorem ipsum dolor sit amet</Link></ListItem>
                <Divider orientation='horizontal' />
                <ListItem><Link>Consectetur adipiscing elit</Link></ListItem>
                <Divider orientation='horizontal' />
                <ListItem><Link>Integer molestie lorem at massa</Link></ListItem>
                <Divider orientation='horizontal' />
                <ListItem><Link>Facilisis in pretium nisl aliquet</Link></ListItem>
                <Divider orientation='horizontal' />
                <ListItem><Link>Facilisis in pretium nisl aliquet</Link></ListItem>
                <Divider orientation='horizontal' />
            </List>
            <List bg={'white'} h={"12%"} borderRadius={"10px"} spacing={.5} paddingLeft={6} paddingRight={6} paddingTop={3} paddingBottom={3} boxShadow={"md"}>
                <Link fontSize={"xl"} fontWeight={"bold"}>실시간 인기글</Link>
                <Divider orientation='horizontal' />
                <ListItem><Link>Lorem ipsum dolor sit amet</Link></ListItem>
                <Divider orientation='horizontal' />
                <ListItem><Link>Consectetur adipiscing elit</Link></ListItem>
                <Divider orientation='horizontal' />
                <ListItem><Link>Integer molestie lorem at massa</Link></ListItem>
                <Divider orientation='horizontal' />
                <ListItem><Link>Facilisis in pretium nisl aliquet</Link></ListItem>
                <Divider orientation='horizontal' />
                <ListItem><Link>Facilisis in pretium nisl aliquet</Link></ListItem>
                <Divider orientation='horizontal' />
            </List>
            <Flex flexWrap={"wrap"} gap={5} h={"20%"} justifyContent={"space-between"}>
                <Box bg={'white'} width={"48%"} borderRadius={"10px"} boxShadow={"md"}>야구</Box>
                <Box bg={'white'} width={"48%"} borderRadius={"10px"} boxShadow={"md"}>LoL</Box>
                <Box bg={'white'} width={"48%"} borderRadius={"10px"} boxShadow={"md"}>축구</Box>
                <Box bg={'white'} width={"48%"} borderRadius={"10px"} boxShadow={"md"}>세사게</Box>
            </Flex>
            <Box bg={'white'} h={"20%"} borderRadius={"10px"} boxShadow={"md"}>포인트</Box>
        </Stack>
    </div>
}