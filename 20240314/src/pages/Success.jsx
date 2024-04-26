import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default () => {
  let nav = useNavigate();
  const location = useLocation();
  const query = location.search;
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("amount");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  useEffect((e) => {
    fetch("/api/success", { method: "POST", body: key })
      .then((res) => {
        if (res) {
          onOpen();
          return res.json();
        } else {
          throw new Error(e);
        }
      })
      .then((data) => {
        key(data);
      });
  }, []);
  return (
    <>
      <Box>결제성공</Box>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              결제정보
            </AlertDialogHeader>
            <AlertDialogBody>결제에 성공했습니다.</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                sx={{
                  backgroundColor: "#53535f !important",
                  color: "#ffffff",
                }}
                onClick={() => {
                  onClose(), nav("/");
                }}
                ml={3}
              >
                확인
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
