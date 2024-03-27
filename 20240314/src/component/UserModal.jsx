import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React, { useState } from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";


export default ({ onClose, isOpen }) => {
    let [isClick, setIsClick] = useState(false)
    return <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalCloseButton />
            {/* <ModalHeader>Modal Title</ModalHeader>
            <ModalBody>
                hijasdfasdf
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter> */}
            {isClick ? <Signup /> : <Login />}
            <Button onClick={() => setIsClick(!isClick)}>{
                isClick ? "로그인" : "회원가입"
            }</Button>
        </ModalContent>
    </Modal>
}