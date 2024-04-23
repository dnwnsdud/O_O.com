import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  CloseButton,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../hook/User";

export default ({ todayVote, main, location }) => {
  const { user } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  let nav = useNavigate();
  let [choice, setChoice] = useState("");
  const cancelRef = React.useRef();

  let check = (
    <svg
      style={{ width: "15%" }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
    >
      <path
        fill="black"
        d="M96 80c0-26.5 21.5-48 48-48H432c26.5 0 48 21.5 48 48V384H96V80zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48H64V416H512V288h16c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336z"
      />
    </svg>
  );

  const agree = (choice, user) => {
    fetch("/api/takeVote", {
      method: "POST",
      body: JSON.stringify({
        choice: choice,
        user: user,
        voteId: todayVote._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          alert("수정전");
        } else {
          alert(data.success);
        }
      });
  };
  const endVote = () => {
    fetch("/api/endVote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        voteId: todayVote._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          if (data.success.message) {
            alert(data.success.message);
          }
          alert("투표가 종료되었습니다.");
          window.location.reload();
        } else {
          alert(data.success);
          window.location.reload();
        }
      });
  };
  return (
    <>
      <Flex
        h={"100%"}
        maxH={"255px"}
        direction={"column"}
        justifyContent={"space-around"}
        backgroundColor="white"
        borderRadius={"0.5rem"}
        marginBottom={"20px"}
        bg={todayVote && todayVote.category == "main" ? "" : "#f5f5f5"}
      >
        <Text fontSize={"3xl"} textAlign={"center"}>
          {todayVote && todayVote == "비었음"
            ? "현재 투표가 진행중이지 않습니다."
            : todayVote.title}
        </Text>
        <Flex
          gap="10px"
          padding="10px"
          justifyContent="center"
          border={"1px soild blue"}
        >
          <Button
            backgroundColor="#53535f !important"
            color={"#ffffff"}
            onClick={() => {
              nav("/r");
            }}
          >
            이전결과
          </Button>
          <Button
            backgroundColor="#53535f !important"
            color={"#ffffff"}
            onClick={() => {
              onOpen();
            }}
          >
            참여하기
          </Button>
        </Flex>
      </Flex>

      {isOpen && (
        <>
          {window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
              onClose();
              setChoice("");
              document.body.style.overflow = "auto";
              window.removeEventListener("keydown", (e) => {});
            }
          })}
          {(document.body.style.overflow = "hidden")}
          <Box
            zIndex={10}
            bg={"black"}
            opacity={0.5}
            w={"100%"}
            position={"fixed"}
            left={0}
            top={0}
            h={"100%"}
            color={"black"}
            onClick={() => {
              onClose();
              document.body.style.overflow = "auto";
              setChoice("");
            }}
          ></Box>
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
            position={"fixed"}
            left={"50%"}
            top={"50%"}
            transform={"translate(-50%, -50%)"}
            onKeyDown={(e) => {
              if (e.key === "esc") {
                onClose();
                document.body.style.overflow = "auto";
              }
            }}
          >
            <Flex direction={"column"} w={"100%"} gap={4}>
              <Flex
                justifyContent={"space-between"}
                gap={2}
                alignItems={"center"}
              >
                <Heading>오늘의 O_O</Heading>
                <CloseButton
                  _hover={{ bg: "gray.100" }}
                  onClick={() => {
                    onClose();
                    document.body.style.overflow = "auto";
                    setChoice("");
                  }}
                />
              </Flex>
              <Divider />
              <Center fontSize={"3xl"} fontWeight={"bold"}>
                {todayVote && todayVote == "비었음"
                  ? "현재 투표가 진행중이지 않습니다."
                  : todayVote.title}
              </Center>
              <Box>
                <Flex w={"100%"} justifyContent={"space-around"}>
                  <Card
                    w={"45%"}
                    maxW="sm"
                    cursor={"pointer"}
                    _hover={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)" }}
                    onClick={() => {
                      setChoice("left");
                    }}
                  >
                    <CardBody>
                      {user.role === "user" && choice === "left" ? (
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
                      ) : (
                        ""
                      )}
                      {todayVote &&
                        todayVote != "비었음" &&
                        todayVote.leftSide &&
                        todayVote.leftSide.images && (
                          <Image
                            w={"100%"}
                            h={"100px"}
                            src={`${todayVote.leftSide.images}`}
                            alt="X"
                            borderRadius="lg"
                          />
                        )}
                      <Stack mt="6" spacing="3">
                        <Heading size="md">
                          {todayVote == "비었음"
                            ? "현재 투표가 진행중이지 않습니다."
                            : todayVote.leftSide.title}
                        </Heading>
                        <Text>
                          {todayVote == "비었음"
                            ? "현재 투표가 진행중이지 않습니다."
                            : todayVote.leftSide.content}
                        </Text>
                      </Stack>
                    </CardBody>
                  </Card>
                  <Card
                    w={"45%"}
                    maxW="sm"
                    cursor={"pointer"}
                    _hover={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)" }}
                    onClick={() => {
                      setChoice("right");
                    }}
                    position={"relative"}
                    overflow={"hidden"}
                  >
                    <CardBody>
                      {user.role === "user" && choice === "right" ? (
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
                      ) : (
                        ""
                      )}
                      {(todayVote &&
                        todayVote != "비었음" &&
                        todayVote.rightSide &&
                        todayVote.rightSide.images && (
                          <Image
                            w={"100%"}
                            h={"100px"}
                            src={`${todayVote.rightSide.images}`}
                            alt="X"
                            borderRadius="lg"
                          />
                        )) ||
                        ""}
                      <Stack mt="6" spacing="3">
                        <Heading size="md">
                          {todayVote && todayVote == "비었음"
                            ? "현재 투표가 진행중이지 않습니다."
                            : todayVote.rightSide.title}
                        </Heading>
                        <Text>
                          {todayVote && todayVote == "비었음"
                            ? "현재 투표가 진행중이지 않습니다."
                            : todayVote.rightSide.content}
                        </Text>
                      </Stack>
                    </CardBody>
                  </Card>
                </Flex>
              </Box>
              <Divider />

              {user.role === "admin" ? (
                todayVote && todayVote == "비었음" ? (
                  <Flex justifyContent={"end"}>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        nav("/requestlist");
                      }}
                    >
                      요청확인
                    </Button>
                  </Flex>
                ) : (
                  <Flex justifyContent={"end"}>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        if (user.role !== "admin")
                          return alert("관리자만 가능합니다.");
                        onClose();
                        document.body.style.overflow = "auto";
                        setChoice("");
                        endVote();
                      }}
                    >
                      종료하기
                    </Button>
                  </Flex>
                )
              ) : main ? (
                <Flex justifyContent={"end"}>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      if (user === "logout")
                        return alert("로그인이 필요합니다.");
                      if (choice === "") return alert("선택해주세요.");
                      onClose();
                      document.body.style.overflow = "auto";
                      setChoice("");
                      agree(choice, user.email);
                    }}
                  >
                    참여하기
                  </Button>
                </Flex>
              ) : (
                <Flex justifyContent={"end"}>
                  <Button
                    onClick={() => {
                      if (user === "logout")
                        return alert("로그인이 필요합니다.");
                      nav(`/topicrequest/category=${location}`);
                      onClose();
                    }}
                  >
                    요청하기
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      if (user === "logout")
                        return alert("로그인이 필요합니다.");
                      if (choice === "") return alert("선택해주세요.");
                      onClose();
                      document.body.style.overflow = "auto";
                      setChoice("");
                      agree(choice, user.email);
                    }}
                  >
                    참여하기
                  </Button>
                </Flex>
              )}
            </Flex>
          </Flex>
        </>
      )}
      {/* <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fillontSize='lg' fontWeight='bold'>
                회원가입정보 확인
              </AlertDialogHeader>
              <AlertDialogBody>
                이미 가입된 회원입니다.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button  sx={{
                backgroundColor: "red !important",
                color: "#ffffff",
              }} onClick={()=>{
                onClose() 
                nav("/")
            }} ml={3}>
                  돌아가기
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog> */}
    </>
  );
};
