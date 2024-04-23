import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Select,
  Box,
} from "@chakra-ui/react";

export default ({ isOpen, onClose, postId, userEmail }) => {
  const [reportContent, setReportContent] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value !== "기타") {
      setReportContent("");
    }
  };

  const handleTextareaChange = (e) => {
    setReportContent(e.target.value);
  };

  const submitReport = (e) => {
    e.preventDefault();
    fetch("/api/reports", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log(data);
          alert("신고 접수가 완료되었습니다.");
          setReportContent("");
          setSelectedOption("");
        } else {
          console.log(data.error);
          alert(`사용자를 저장하는 동안 오류 발생:${data.error}`);
        }
      })
      .catch((error) => {
        alert(`Error submitting report: ${error.message}`);
      });
    onClose();
  };

  let body = {
    blacktype: selectedOption,
    blackdetail: selectedOption === "기타" ? reportContent : selectedOption,
    blackid: postId,
    email: userEmail,
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt='200'>
          <ModalHeader textAlign={"center"}>신고하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>{userEmail}</Box>
            <Select
              value={selectedOption}
              onChange={handleSelectChange}
              placeholder="선택하세요"
            >
              <option value="욕설">욕설</option>
              <option value="타인 비하">타인 비하</option>
              <option value="과도한 혐오 발언">과도한 혐오 발언</option>
              <option value="불법 광고">불법 광고</option>
              <option value="성희롱">성희롱</option>
              <option value="기타">기타</option>
            </Select>
            {selectedOption === "기타" && (
              <Textarea
                placeholder="기타 사유 입력"
                value={reportContent}
                onChange={handleTextareaChange}
                mt={4}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={submitReport}>
              신고 제출
            </Button>
            <Button variant="ghost" onClick={onClose}>
              취소
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
