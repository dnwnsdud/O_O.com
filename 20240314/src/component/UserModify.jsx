
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Center, Flex, Grid, HStack, Input, Stack, VStack, Image, FormLabel, FormHelperText, FormErrorMessage, FormControl } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useNavigate, useOutletContext } from 'react-router-dom';

export default () => {
  const [userData, setUserData] = useState([]);
  const [name, setName] = useState(userData.name);
  const [nickname, setnickname] = useState(userData.nickname);
  const [team, setTeam] = useState(userData.team);
  const [image, setImage] = useState('');
  const [itemImageError, setItemImageError] = useState(false);



  let nav = useNavigate();
  useEffect((e) => {
    try {
      fetch('/api/mypage')
        .then(response => {
          if (response) {
            console.log(response);
            return response.json();
          }
          else {
            throw new Error(e);
          }
        })
        .then(data => {
          if (data) {
            console.log("이게 먼저오는거면 나는 어쩌라는건데 진짜 다 죽자");
            setUserData(data);
          } else {
            alert(`사용자를 저장하는 동안 오류 발생:${data.error}`);
          }
        })
        .catch(error => {
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);


  const onNamedHandler = (e) => {
    setName(e.target.value);
  };
  const onNicknameHandler = (e) => {
    setnickname(e.target.value);


  };
  const onTeamHandler = (e) => {
    setTeam(e.target.value);
  };
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
            setImage(imagePath)
          } else {
            console.error('이미지 업로드 실패:', data.error);
          }
        })
        .catch(error => {
          console.error('이미지 업로드 오류:', error);
        });
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      name: name,
      nickname: nickname,
      team: team,
      images: image,
    };
    console.log(body);
    fetch('/api/usermodify', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body, 333333333333333333),
    }
    )
      .then(response => {
        if (response) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        console.log(data, 12341234)
        if (data.success) {
          nav("/mypage");
        } else {
          console.log(data.error);
          alert(`사용자를 저장하는 동안 오류 발생:${data.error}`);
        }
      })
      .catch(error => {
      });
  };


  return <Center>
    <Stack margin="100px 0" padding="50px 50px 60px" border="1px solid #0B0B0D" borderRadius="10px" width="500px">
      <Box fontSize='30px' padding="0 30px" textAlign="center" fontWeight='bold' marginBottom="20px">정보수정</Box>
      <Grid templateColumns="1fr 1fr" width="70%" margin="auto">
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
        <Box>
          <Input textAlign="center" border="1px solid black" borderRadius="15px" marginBottom="5px" h={"25px"} placeholder={userData.name} defaultValue={userData.name} onChange={onNamedHandler} />
          <Input textAlign="center" border="1px solid black" borderRadius="15px" h={"25px"} placeholder={userData.nickname} defaultValue={userData.nickname} onChange={onNicknameHandler} />
        </Box>
      </Grid>
      <Grid templateRows="1fr 1fr 1fr" gap="20px" margin="30px 0" >
        <Input textAlign="center" border="1px solid black" borderRadius="15px" margin="auto" width="70%" h={"25px"} placeholder={userData.email} defaultValue={userData.email} />
        <Input textAlign="center" border="1px solid black" borderRadius="15px" margin="auto" width="70%" placeholder={userData.team} defaultValue={userData.team} onChange={onTeamHandler} />
        <Input textAlign="center" border="1px solid black" borderRadius="15px" margin="auto" width="70%" placeholder="내 승률" defaultValue="내 승률" readOnly />
      </Grid>
      <Grid templateRows="1fr 1fr" justifyContent="center" gap="10px">
        <Button border="1px solid #0B0B0D" borderRadius="10px" onClick={() => {
          nav('/mypage/modify')
        }}>취소</Button>
        <Button width="100px" border="1px solid black" borderRadius="10px" onClick={onSubmitHandler}>정보수정</Button>
      </Grid>
    </Stack>
  </Center>
}