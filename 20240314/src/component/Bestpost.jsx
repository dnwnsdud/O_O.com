import { Divider, ListItem, List, Text, Grid, Box, textDecoration } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default ()=>{
    const [bestpost, setBestpost] = useState([]);
    useEffect(()=>{
        fetch('/api/bestpost')
        .then((res)=>{
            if(res){
                return res.json();
            }else{
                throw new Error();
            }
        })
        .then((data)=>{
            setBestpost(data);
        })
    },[])
    return(
        <List 
        bg={"white"}
        borderRadius={"10px"}
        spacing={0.5}
        paddingLeft={6}
        paddingRight={6}
        paddingTop={3}
        paddingBottom={3}
        boxShadow={"md"}
        >
        <Text fontSize={"xl"} fontWeight={"bold"} paddingBottom={"10px"}>
          실시간 인기글
        </Text>
        <Grid templateColumns="3fr 1fr">
            <Box>제목</Box>
            <Box margin={"auto"}>댓글수</Box>
        </Grid>
        <Divider orientation="horizontal" />

        {
         bestpost.map((posts)=>{
             return(<ListItem key={posts._id}>
                 <Grid templateColumns="3fr 1fr" paddingBottom={"3px"}>  
                 <Box _hover={{textDecoration:"underline"}}><Link to={`/b/id=${posts._id}`}>{posts.title}</Link></Box>
                     <Box margin={"auto"}>{posts.comment.length}</Box>
                 </Grid>
               <Divider orientation="horizontal" />
               
             </ListItem>)
            
         })
       }
       <Box opacity={0.5} fontSize={"10px"} marginLeft={"83%"}>인기글 = 추천수 * 2 + 조회수</Box>
      </List>
    )
}