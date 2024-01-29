import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const PaymentSucces = () => {

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(()=>navigate("/announcecreatesuccess"), 1500)
  }, [])
  return (
    <div>Payment Success!</div>
  )
}

export default PaymentSucces