import React, { useState } from "react";
import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Button } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

export default () => {
    
    let nav = useNavigate();


    // const [title, setTitle] = useState("");
    // const [price, setPrice] = useState("");
    // const [images, setImages] = useState("");
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


    // const handleTitleChange = (e) => {
    //     setTitle(e.target.value);
    // };

    // const handlePriceChange = (e) => {
    //     setPrice(e.target.value);
    // };

    const handleImagesChange = (e) => {   
        const file = e.target.files[0]; // 첫 번째 파일만 가져옴 (단일 파일 업로드)
        if (file) {
            // 파일이 존재하면 FormData 객체를 생성하여 파일을 추가
            const formData = new FormData();
            formData.append('images', file);
    
            // FormData 객체를 서버로 전송
            fetch('/api/upload/images', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                // 이미지 업로드 성공 또는 실패에 따라 처리
                if (data.success) {
                    console.log('이미지 업로드 성공');
                    // 서버로부터 받은 이미지 경로를 저장하거나 활용
                    // const imagePath = data.imagePath;
                    // imagePath를 활용하여 원하는 작업 수행
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
        // const { title, price, images } = store;

        // let store = {
        //     title: title,
        //     price: price,
        //     images: images,
        // }

        fetch('/api/storeupload', {
            method: 'POST',
            headers: {
                "Content-Type":"application/json; charset=utf-8",
            },
            body: JSON.stringify(store),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.success){
                console.log("성공해떠")
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

    return (
        <>
            <FormControl isInvalid={itemNameError}>
                <FormLabel>아이템 이름</FormLabel>
                <Input type='text' name='title' onChange={handleValueChange} />
                {!itemNameError ? (
                    <FormHelperText>아이템 이름입니다.</FormHelperText>
                ) : (
                    <FormErrorMessage>
                        아이템 이름을 입력해주세요.
                    </FormErrorMessage>
                )}
            </FormControl>
            <FormControl isInvalid={itemPriceError}>
                <FormLabel>아이템 가격</FormLabel>
                <Input type="text" name='price' onChange={handleValueChange} />
                {itemPriceError && (
                    <FormErrorMessage>
                        아이템 가격을 입력해주세요.
                    </FormErrorMessage>
                )}
            </FormControl>
            <FormControl isInvalid={itemImageError}>
                <FormLabel>아이템 이미지 업로드</FormLabel>
                <Input type='file'  name='images' onChange={handleImagesChange} />
                {!itemImageError ? (
                    <FormHelperText>이미지가 올라갑니다.</FormHelperText>
                ) : (
                    <FormErrorMessage>
                        아이템 사진을 넣어주세요.
                    </FormErrorMessage>
                )}
            </FormControl>
            <Button onClick={handleSubmit}>등록</Button>
        </>
    );
}
