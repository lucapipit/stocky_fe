import React, { useEffect } from 'react';
import PaypalPayment from './PaypalPayment';

const PaymentMethods = ({param}) => {

  useEffect(() => {
    console.log(param.price.split("-")[1]);
  }, [])
  return (
    <PaypalPayment total={param.price.split("-")[1]} />
  )
}

export default PaymentMethods