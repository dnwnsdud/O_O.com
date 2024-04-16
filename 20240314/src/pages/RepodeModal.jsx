import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useDisclosure,
  Box
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
