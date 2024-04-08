import React, { useState } from "react";
import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Button, Box, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

export default () => {
    let nav = useNavigate();

    const [store, setStore] = useState({
        title: '',
        price: 0,
        images: '',
    });

    const [itemNameError, setItemNameError] = useState(false);
    const [itemPriceError, setItemPriceError] = useState(false);
    const [itemImageError, setItemImageError] = useState(false);

    const handleValueChange = (e) => {
        setStore({
            ...store,
            [e.target.name]: e.target.value
        });
    }

    const handleImagesChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('images', file);

            fetch('/api/upload/images', {
                method: 'POST',
                body: formData,
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        console.log('이미지 업로드 성공');
                        const imagePath = data.mediapath;
                        console.log(data);
                        console.log('이미지경로: ' + imagePath);
                        setStore(prevState => ({
                            ...prevState,
                            images: imagePath
                        }));
                    } else {
                        console.error('이미지 업로드 실패:', data.error);
                    }
                })
                .catch(error => {
                    console.error('이미지 업로드 오류:', error);
                });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("들어옴2");

        // const store = {
        //     title: title, // 여기에 원하는 제목을 추가하세요
        //     price: price, // 여기에 원하는 가격을 추가하세요
        //     images: store.images // 이미지 정보는 이미 store 객체에 들어있습니다
        // };
        // console.log('업로드된 이미지:', req.body.images);
        fetch('/api/storeupload', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(store),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    console.log("성공해떠")
                    alert("아이템 등록에 성공하셨습니다.");
                    nav("/st");
                } else {
                    console.log("실패해떠")
                    alert("아이템 등록에 실패하셨습니다.");
                }
            })
            .catch(error => {
                console.error('Error uploading item:', error);
            });
    }

    return <Box w='20%' m='auto' my='8rem'>
        <Text
            textAlign='center'
            fontSize={25}
            mb='2rem'
            fontWeight={'bold'}
        >상점 아이템 등록</Text>
        <FormControl isInvalid={itemNameError} >
            {/* <FormLabel>아이템 이름</FormLabel> */}
            <Input type='text' name='title' onChange={handleValueChange} placeholder="아이템 이름" />
            {!itemNameError ? (
                <FormHelperText color={'darkblue'}>아이템 이름 입니다.</FormHelperText>
            ) : (
                <FormErrorMessage>
                    아이템 이름을 입력해주세요.
                </FormErrorMessage>
            )}
        </FormControl>
        <FormControl isInvalid={itemPriceError} mt='5' >
            {/* <FormLabel>아이템 가격</FormLabel> */}
            <Input type="text" name='price' onChange={handleValueChange} placeholder="아이템 가격" />
            {!itemPriceError ? (
                <FormHelperText color={'darkblue'}>아이템 가격 입니다.</FormHelperText>
            ) : (
                <FormErrorMessage>
                    아이템 가격을 입력해주세요.
                </FormErrorMessage>
            )}
        </FormControl>
        <FormControl isInvalid={itemImageError} mt='5'>
            <FormLabel>아이템 이미지 업로드</FormLabel>
            <Input type='file' name='images' onChange={handleImagesChange} />
            {!itemImageError ? (
                <FormHelperText color={'darkblue'}>이미지가 올라갑니다.</FormHelperText>
            ) : (
                <FormErrorMessage>
                    아이템 사진을 넣어주세요.
                </FormErrorMessage>
            )}
        </FormControl>
        <Button onClick={handleSubmit} mt='5' border={'1px solid #ddd'} w='100%'>등록</Button>

    </Box>
}