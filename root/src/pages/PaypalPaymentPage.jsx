import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import PaypalPayment from '../components/PaypalPayment';

const PaypalPaymentPage = () => {
    return (
        <MainLayout>
            <PaypalPayment />
        </MainLayout>
    )
}

export default PaypalPaymentPage