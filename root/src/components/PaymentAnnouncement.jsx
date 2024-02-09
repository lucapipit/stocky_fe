import CardAnnouncement from "./CardAnnouncement";
import StripeCkechout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Button, Card } from "react-bootstrap";
import { PaymentFunc } from "../states/paymentState";



const PaymentAnnouncement = () => {

    const KEY = "pk_test_51NtAXJEpJzs9xY4vLBsWgTU2Uck06XUFuCtjNrTQT8WJpijwluSTu5lmNyXE5jhSjRZNeHnRFLZ4erL3aBdo4FzR00DYDp5lmi";
    const paymentData = useSelector((state) => state.payment.paymentData);

    const [singleData, setSingleData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    const [payment, setPayment] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setSingleData(paymentData);
        setIsLoading(false);
    }, [paymentData]);

    const handleToken = (token) => {
        setToken(token);
        dispatch(PaymentFunc({ tkn: token, apiKey: KEY }));
        setPayment(true);
    }

    if (payment) {
        navigate('/store');
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6">
                    <CardAnnouncement singleData={singleData} isLoading={isLoading} />
                </div>
                <div className="col-12 col-md-6">
                    <Card className="p-3">
                        <Card.Body className="d-flex justify-content-center align-items-center flex-column">
                            <Card.Title className="text-center">Payment</Card.Title>
                            <div className="d-flex justify-content-center align-items-center flex-column">
                                <Card.Subtitle className="mb-2 text-muted text-center">
                                    Total:{" "}
                                    {singleData[0] && !isLoading
                                        ? singleData[0].price + "$"
                                        : "Loading..."}
                                </Card.Subtitle>
                                <StripeCkechout
                                    token={handleToken}
                                    stripeKey={KEY}
                                    amount={singleData[0] && !isLoading ? singleData[0].price * 100 : 0}
                                    name="infodent"
                                    image="https://avatars.githubusercontent.com/u/25126281?v=4"
                                    billingAddress
                                    shippingAddress
                                />
                                <Button variant="primary mt-3" onClick={() => navigate("/store")}>
                                    Back to store
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>


    );
}

export default PaymentAnnouncement;