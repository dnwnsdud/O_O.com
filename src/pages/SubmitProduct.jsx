import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hook/User";

export default () => {
  let nav = useNavigate();
  useEffect(() => {
    if (user === null || user === "logout" || user.role === "user") {
      nav("/");
    } else {
      setRender(true);
    }
  }, []);
  const [store, setStore] = useState({
    title: "",
    price: 0,
    images: "",
  });
  const { user } = useContext(UserContext);
  const [render, setRender] = useState(false);
  const [itemNameError] = useState(false);
  const [itemPriceError] = useState(false);
  const [itemImageError] = useState(false);

  const handleValueChange = (e) => {
    setStore({
      ...store,
      [e.target.name]: e.target.value,
    });
  };

  const handleImagesChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("images", file);

      fetch("/api/upload/images", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            const imagePath = data.mediapath;
            setStore((prevState) => ({
              ...prevState,
              images: imagePath,
            }));
          } else {
            console.error("이미지 업로드 실패:", data.error);
          }
        })
        .catch((error) => {
          console.error("이미지 업로드 오류:", error);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/storeupload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(store),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("아이템 등록에 성공하셨습니다.");
          nav("/st");
        } else {
          alert("아이템 등록에 실패하셨습니다.");
        }
      })
      .catch((error) => {
        console.error("Error uploading item:", error);
      });
  };

  return (
    render && (
      <Box w="20%" m="auto" my="8rem">
        <Text textAlign="center" fontSize={25} mb="2rem" fontWeight={"bold"}>
          상점 아이템 등록
        </Text>
        <FormControl isInvalid={itemNameError}>
          <Input
            type="text"
            name="title"
            onChange={handleValueChange}
            placeholder="아이템 이름"
          />
          {!itemNameError ? (
            <FormHelperText color={"darkblue"}>
              아이템 이름 입니다.
            </FormHelperText>
          ) : (
            <FormErrorMessage>아이템 이름을 입력해주세요.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={itemPriceError} mt="5">
          <Input
            type="text"
            name="price"
            onChange={handleValueChange}
            placeholder="아이템 가격"
          />
          {!itemPriceError ? (
            <FormHelperText color={"darkblue"}>
              아이템 가격 입니다.
            </FormHelperText>
          ) : (
            <FormErrorMessage>아이템 가격을 입력해주세요.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={itemImageError} mt="5">
          <FormLabel>아이템 이미지 업로드</FormLabel>
          <Input type="file" name="images" onChange={handleImagesChange} />
          {!itemImageError ? (
            <FormHelperText color={"darkblue"}>
              이미지가 올라갑니다.
            </FormHelperText>
          ) : (
            <FormErrorMessage>아이템 사진을 넣어주세요.</FormErrorMessage>
          )}
        </FormControl>
        <Button
          onClick={handleSubmit}
          mt="5"
          border={"1px solid #ddd"}
          w="100%"
        >
          등록
        </Button>
      </Box>
    )
  );
};
