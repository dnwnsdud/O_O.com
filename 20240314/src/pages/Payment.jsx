import { Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { loadTossPayments } from '@tosspayments/payment-sdk';

export default ({ price, title, id }) => {


    // useEffect(() => {
    //     const payTotal = async () => {
    //         await paytotal({ member_no: no }).then((res) => {
    //             if (res.data === null) {
    //                 return 0;
    //             } else {
    //                 console.log(res.data);
    //                 setOrderInfo({ order_amount: res.data.ORDER_AMOUNT });

    //                 /* 구매금액 3만원 이상이면 배송비 0원 */
    //                 if (res.data.ORDER_AMOUNT < 30000) {
    //                     setShipFee(3000);
    //                 } else setShipFee(0);
    //             }
    //         });
    //     };
    //     payTotal();
    // }, [no]);

    const PaymentButton = () => {
        const clientKey = 'test_ck_DpexMgkW36RYw2vOjOxB3GbR5ozO'; // 환경 변수로부터 가져와야 합니다.
        const originUrl = "http://localhost:3000"; // 기본값 설정


        const payment = () => {
            console.log('클릭해또');
            console.log(price);
            console.log(title);
            console.log(id);
            loadTossPayments(clientKey).then(tossPayments => {
                tossPayments.requestPayment('카드', {
                    amount: price, // 결제할 금액 변수를 사용
                    orderId: id, // 주문번호를 적절한 값으로 변경
                    orderName: title, // 상품이름을 적절한 값으로 변경
                    customerName: '주문자 이름', // 주문자 이름을 적절한 값으로 변경
                    successUrl: `${window.location.origin}/success`,
                    failUrl: `${window.location.origin}/fail`,
                })
                    // .then(function (paymentInfo) {
                    //     // 결제 성공 시 처리
                    //     successUrl: `${window.location.origin}/success`
                    //     console.log('결제 성공:', paymentInfo);
                    // })
                    .catch(function (error) {
                        // 결제 실패 시 처리
                        console.error('결제 실패:', error);
                    });
            });
        };



        return (
            <>
                <Button onClick={payment} fontSize={10} w='100%' h='5' border='1px solid #ddd'>구매</Button>
            </>
        );
    };



    return <PaymentButton />;
    // return <>
    // <Button onClick={PaymentButton}>클릭해죠</Button>
    // </>
};

