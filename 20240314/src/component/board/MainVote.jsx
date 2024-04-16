import { Box, Button, Center, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Divider, ButtonGroup, CloseButton } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons'
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  let nav = useNavigate();
  let [choice, setChoice] = useState("");
  let check = <svg style={{ "width": "15%" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"> <path fill='black' d="M96 80c0-26.5 21.5-48 48-48H432c26.5 0 48 21.5 48 48V384H96V80zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48H64V416H512V288h16c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336z" /></svg>
  return (
    <>
      <Flex h={"100%"} direction={"column"} justifyContent={"space-around"}>
        <Text fontSize={"3xl"} textAlign={"center"}>당신의 선택은?</Text>
        <Flex gap="10px" padding="10px" justifyContent="center" border={"1px soild blue"}>
          <Button
            border={"2px solid #0b0b0d"}
            onClick={() => {
              nav("/r");
            }}
          >
            이전결과
          </Button>
          <Button border={"2px solid #0b0b0d"} onClick={onOpen}>참여하기</Button>
        </Flex>
      </Flex>

      {isOpen &&
        <>
          {window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
              onClose();
              setChoice("");
              document.body.style.overflow = "auto";
              window.removeEventListener("keydown", (e) => { });
            }
          })}
          {(document.body.style.overflow = "hidden")}
          <Box
            zIndex={10}
            bg={"black"}
            opacity={.5}
            w={"100%"}
            position={"absolute"}
            left={0}
            top={0}
            h={"100%"}
            color={"black"}
            onClick={() => {
              onClose();
              document.body.style.overflow = "auto";
              setChoice("");
            }
            }

          > </Box>
          <Flex
            borderRadius={"15px"}
            p={4}
            pt={2}
            pb={2}
            zIndex={11}
            bg={"white"}
            direction={"column"}
            isOpen={isOpen}
            onClose={onClose}
            w={"60%"}
            maxW={"800px"}
            position={"absolute"}
            left={"50%"}
            transform={"translate(-50%, 0%)"}
            onKeyDown={(e) => {
              if (e.key === "esc") {
                console.log("esc");
                onClose();
                document.body.style.overflow = "auto";
              }
            }}
          >
            <Flex direction={"column"} w={"100%"} gap={4}>
              <Flex justifyContent={"space-between"} gap={2} alignItems={"center"}>
                <Heading>오늘의 O_O</Heading>
                <CloseButton
                  _hover={{ bg: "gray.100" }}
                  onClick={() => {
                    onClose();
                    document.body.style.overflow = "auto";
                    setChoice("");
                  }} />
              </Flex>
              <Divider />
              <Center fontSize={"3xl"} fontWeight={"bold"}>당신의 선택은?</Center>
              <Box >
                <Flex gap={4} w={"100%"}>
                  <Card maxW='sm' cursor={"pointer"} _hover={
                    { boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)" }
                  }
                    onClick={() => {
                      setChoice("left");
                    }}
                  >
                    <CardBody>
                      {choice === "left" ? <Flex
                        bg={"rgba(255,255,255, 0.65)"}
                        w={"100%"}
                        h={"100%"}
                        position={"absolute"}
                        top={0}
                        left={0}
                        fontSize={"3xl"}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        {check}
                      </Flex>
                        :
                        ""}
                      <Image
                        w={"100%"}
                        h={"100px"}
                        src='https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202209/06/dailylife/20220906180136831gxmh.png'
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                      />
                      <Stack mt='6' spacing='3'>
                        <Heading size='md'>정열의 빨강</Heading>
                        <Text>
                          당신을 대표하는 색깔은 무엇인가요? 빨강은 열정적이고 강렬한 이미지를
                          가지고 있습니다. 빨강은 또한 사랑과 용기를 상징하는 색깔이기도 합니다.
                        </Text>
                      </Stack>
                    </CardBody>
                  </Card>
                  <Card
                    maxW='sm' cursor={"pointer"} _hover={
                      { boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)" }
                    }
                    onClick={() => {
                      setChoice("right");
                    }}
                    position={"relative"}
                    overflow={"hidden"}
                  >
                    <CardBody>
                      {choice === "right" ?
                        <Flex
                          bg={"rgba(255,255,255, 0.65)"}
                          w={"100%"}
                          h={"100%"}
                          position={"absolute"}
                          top={0}
                          left={0}
                          fontSize={"3xl"}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          {check}
                        </Flex>
                        :
                        ""
                      }
                      <Image
                        w={"100%"}
                        h={"100px"}
                        src='https://femiwiki-uploaded-files.s3.amazonaws.com/2/2d/%ED%8C%8C%EB%9E%91%EC%83%89.png'
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                      />
                      <Stack mt='6' spacing='3'>
                        <Heading size='md'>침착의 파랑</Heading>
                        <Text>
                          당신을 대표하는 색깔은 무엇인가요? 파랑은 침착하고 차분한 이미지를
                          가지고 있습니다. 파랑은 또한 신뢰와 안정을 상징하는 색깔이기도 합니다.
                        </Text>
                      </Stack>
                    </CardBody>
                  </Card>
                </Flex>
              </Box>
              <Divider />
              <Flex justifyContent={"end"}>
                <Button variant='ghost' onClick={() => {
                  onClose();
                  document.body.style.overflow = "auto";
                  setChoice("");
                }}>참여하기</Button>
              </Flex>
            </Flex>
          </Flex >
        </>
      }
    </>
  )
}