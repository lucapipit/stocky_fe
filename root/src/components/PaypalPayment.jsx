import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalPayment = ({ pricePackage }) => {


    const initialOptions = {
        clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
        currency: "EUR",
        intent: "capture",
    };

    useEffect(() => {
        console.log(process.env);
    }, [])

    const apiUrl = process.env.REACT_APP_SERVER_ADDRESS

    const createOrder = async () => {
        // Order is created on the server and the order id is returned
        console.log(pricePackage);
        return fetch(`${apiUrl}/api/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product skus and quantities
            body: JSON.stringify({
                product: {
                    description: "pricePackage.description",
                    cost: pricePackage
                }
            }),
        })
            .then((response) => response.json())
            .then((order) => order.id);
    };

    const onApprove = async (data) => {
        // Order is captured on the server and the response is returned to the browser
        return fetch(`${apiUrl}/api/orders/${data.orderID}/capture`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderID: data.orderID
            })
        })
            .then((response) => response.json());
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
            />
        </PayPalScriptProvider>
    )
}

export default PaypalPayment