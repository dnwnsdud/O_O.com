import React, { useState } from "react";
import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Button } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

export default () => {
    
    let nav = useNavigate();


    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState("");
    // const [store, setStore] = useState({
    //     title: '',
    //     price: 0,
    //     images: '',
    // });

    const [itemNameError, setItemNameError] = useState(false);
    const [itemPriceError, setItemPriceError] = useState(false);
    const [itemImageError, setItemImageError] = useState(false);

    // const handleValueChange = (e) => {
    //     setStore({
    //         ...store,
    //         [e.target.name]: e.target.value
    //     });
    // }


    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleImagesChange = (e) => {
        setImages(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("들어옴2");
        // const { title, price, images } = store;

        let store = {
            title: title,
            price: price,
            images: images,
        }

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
                nav("/");

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
                <Input type='text' onChange={handleTitleChange} />
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
                <Input type="text" onChange={handlePriceChange} />
                {itemPriceError && (
                    <FormErrorMessage>
                        아이템 가격을 입력해주세요.
                    </FormErrorMessage>
                )}
            </FormControl>
            <FormControl isInvalid={itemImageError}>
                <FormLabel>아이템 이미지 업로드</FormLabel>
                <Input type='text' onChange={handleImagesChange} />
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
