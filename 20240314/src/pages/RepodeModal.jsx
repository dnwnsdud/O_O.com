import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@chakra-ui/react";

export default ({ isOpen, onClose, openData }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>신고 사유</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>{openData}</Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
