import { Button } from "@chakra-ui/react";
import React from "react";

import { loadTossPayments } from "@tosspayments/payment-sdk";

export default ({ price, title, id }) => {
  const PaymentButton = () => {
    const clientKey = "test_ck_DpexMgkW36RYw2vOjOxB3GbR5ozO";

    const payment = () => {
      loadTossPayments(clientKey).then((tossPayments) => {
        tossPayments
          .requestPayment("카드", {
            amount: price,
            orderId: id,
            orderName: title,
            customerName: "주문자 이름",
            successUrl: `${window.location.origin}/app/success`,
            failUrl: `${window.location.origin}/fail`,
          })

          .catch(function (error) {
            console.error("결제 실패:", error);
          });
      });
    };

    return (
      <>
        <Button
          onClick={payment}
          fontSize={10}
          w="100%"
          h="5"
          border="1px solid #ddd"
        >
          구매
        </Button>
      </>
    );
  };

  return <PaymentButton />;
};
