import { Button } from '@chakra-ui/react';
import React from 'react';

import { loadTossPayments } from '@tosspayments/payment-sdk';

export default () => {
    const PaymentButton = () => {
        const clientKey = 'test_ck_DpexMgkW36RYw2vOjOxB3GbR5ozO'; // 환경 변수로부터 가져와야 합니다.
        const originUrl = "http://localhost:3000"; // 기본값 설정

        const payment = () => {
            console.log('클릭해또');
            loadTossPayments(clientKey).then(tossPayments => {
                tossPayments.requestPayment('카드', {
                    amount: '10', // 결제할 금액 변수를 사용
                    orderId: '100000', // 주문번호를 적절한 값으로 변경
                    orderName: '상품이름', // 상품이름을 적절한 값으로 변경
                    customerName: '주문자 이름', // 주문자 이름을 적절한 값으로 변경
                })
                    .then(function (paymentInfo) {
                        // 결제 성공 시 처리
                        console.log('결제 성공:', paymentInfo);
                    })
                    .catch(function (error) {
                        // 결제 실패 시 처리
                        console.error('결제 실패:', error);
                    });
            });
        };

        return (
            <>
                <Button onClick={payment}>클릭해죠</Button>
            </>
        );
    };

    return <PaymentButton />;
    // return <>
    // <Button onClick={PaymentButton}>클릭해죠</Button>
    // </>
};