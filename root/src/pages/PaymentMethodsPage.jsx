import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import PaymentMethods from '../components/PaymentMethods';
import { useParams } from 'react-router';

const PaymentMethodsPage = () => {
  const param = useParams()
  return (
    <MainLayout>
      <PaymentMethods param={param}/>
    </MainLayout>
  )
}

export default PaymentMethodsPage