import React from "react";
import { Box, Flex, Badge, Text , HStack, Button} from '@chakra-ui/react';

export default ()=>{
    return <Box width={'45%'} margin={'auto'}>
    <Box border={'1px solid black'} h='8rem'>
        광고
    </Box>

    <Box my='2rem'>
        <Button  px='2' color={'black'}>슬라이더</Button>
        <Button px='2' color={'black'}>리스트</Button>
    </Box>
    <HStack spacing='24px' mb={'2rem'}>
        <Box maxW='10rem' maxH='10rem' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Box>이미지가 들어간답니다</Box>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge>
          <Text>새로운 아이템이에여오</Text>
          </Box>
        </Box>


        <Box maxW='10rem' maxH='10rem' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Box>이미지가 들어간답니다</Box>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge>
          <Text>새로운 아이템이에여오</Text>
          </Box>
        </Box>

        <Box maxW='10rem' maxH='10rem' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Box>이미지가 들어간답니다</Box>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge>
          <Text>새로운 아이템이에여오</Text>
          </Box>
        </Box>

        <Box maxW='10rem' maxH='10rem' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Box>이미지가 들어간답니다</Box>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge>
          <Text>새로운 아이템이에여오</Text>
          </Box>
        </Box>

        <Box maxW='10rem' maxH='10rem' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Box>이미지가 들어간답니다</Box>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge>
          <Text>새로운 아이템이에여오</Text>
          </Box>
        </Box>

    </HStack>
    </Box>
}