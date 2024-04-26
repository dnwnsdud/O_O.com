import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export default ({ onClose, isOpen }) => {
  let [isClick, setIsClick] = useState(false);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        {isClick ? <Signup /> : <Login />}
        <Button onClick={() => setIsClick(!isClick)}>
          {isClick ? "로그인" : "회원가입"}
        </Button>
      </ModalContent>
    </Modal>
  );
};
