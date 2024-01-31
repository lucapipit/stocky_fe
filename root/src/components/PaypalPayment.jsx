import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router';
import { postCreateAnnouncementFunc } from '../states/storeState';
import { useDispatch, useSelector } from 'react-redux';

const PaypalPayment = ({ total }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const announcementPayload = useSelector((state) => state.myStore.announcementPayload);

    const initialOptions = {
        clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
        currency: "EUR",
        intent: "capture",
    };

    useEffect(() => {
        console.log("");
    }, [])

    const apiUrl = process.env.REACT_APP_SERVER_ADDRESS

    const createOrder = async () => {
        // Order is created on the server and the order id is returned
        console.log(total);
        return fetch(`http://localhost:5050/api/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product skus and quantities
            body: JSON.stringify({
                product: {
                    description: "pricePackage.description",
                    cost: total
                }
            }),
        })
            .then((response) => response.json())
            .then((order) => order.id);
    };

    const onApprove = async (data) => {
        // Order is captured on the server and the response is returned to the browser
        const response = await fetch(`${apiUrl}/api/orders/${data.orderID}/capture`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderID: data.orderID
            })
        })
        const res = await response.json()
        if (res.status === "COMPLETED") {
            dispatch(postCreateAnnouncementFunc(announcementPayload));
            navigate("/paymentsuccess")
        } else {
            navigate("*")
        }
        return res

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