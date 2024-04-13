import { Box, Button, Center, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Divider, ButtonGroup } from '@chakra-ui/react';
import React from "react";

export default () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Flex h={"100%"} direction={"column"} justifyContent={"space-between"} border="1px solid blue" marginBottom="10px">
        <Center>2024년 시즌 꼴등은 누가 할 거 같나요?</Center>
        <Flex gap="10px" padding="10px" justify="end">
          <Button size="xs" onClick={onOpen}>참여하기</Button>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent border={"1px red solid"} width={"800px"}>
          <ModalHeader>오늘의 O_O</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <Flex gap={4}>
            <Card maxW='sm'>
              <CardBody>
                <Image
                  src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                  alt='Green double couch with wooden legs'
                  borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                  <Heading size='md'>Living room Sofa</Heading>
                  <Text>
                    This sofa is perfect for modern tropical spaces, baroque inspired
                    spaces, earthy toned spaces and for people who love a chic design with a
                    sprinkle of vintage design.
                  </Text>
                  <Text color='blue.600' fontSize='2xl'>
                    $450
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                  <Button variant='ghost' colorScheme='blue'>
                    Add to cart
                  </Button>
              </CardFooter>
            </Card><Card maxW='sm'>
              <CardBody>
                <Image
                  src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                  alt='Green double couch with wooden legs'
                  borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                  <Heading size='md'>Living room Sofa</Heading>
                  <Text>
                    This sofa is perfect for modern tropical spaces, baroque inspired
                    spaces, earthy toned spaces and for people who love a chic design with a
                    sprinkle of vintage design.
                  </Text>
                  <Text color='blue.600' fontSize='2xl'>
                    $450
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                  <Button variant='ghost' colorScheme='blue'>
                    Add to cart
                  </Button>
              </CardFooter>
            </Card>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' onClick={onClose}>참여하기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}