import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activateAccountFunc } from '../states/signinState';
import Spinner from 'react-bootstrap/Spinner';
import { getSingleUserFunc } from '../states/loginState';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';


const VerifyAccount = ({ param }) => {

    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.signin.isLoading);
    const [isActivated, setIsActivated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        dispatch(getSingleUserFunc({ id: param.verifycode.split("-")[0], token: localStorage.getItem("token") }))
            .then((res) => {
                if (res.payload.statusCode === 200 && +param.verifycode.split("-")[1] === res.payload.data[0].verifyCode) {
                    setIsActivated(true);
                    dispatch(activateAccountFunc({ payload: { ...res.payload.data[0], id: param.verifycode.split("-")[0], accountActive: 1 }, token: localStorage.getItem("token") }))
                        .then((res) => {
                            if (res.payload.statusCode === 200) { setTimeout(() => { navigate("/account") }, 2000) }
                        })
                } else {
                    setErrorMessage("Some problem occured. Click on the 'Solve' button below, login again and than click on the 'verify again' button on the page you will land.")
                }
            })

    }, [])

    return (
        <div className='w-100 d-flex mt-5 pt-5 justify-content-center' style={{ height: "100vh" }}>
            <div className='text-center w-100'>
                {
                    !isLoading && isActivated ?
                        <div className=' d-flex flex-column align-items-center'>
                            <i className="bi bi-person-check-fill text-info display-6"></i>
                            <div className='border rounded mt-5 mx-3 myMaxW700 w-100'>
                                <div className='bg-info rounded percentageBar' style={{ height: "6px" }}></div>
                            </div>
                        </div>
                        : isLoading && !isActivated && !errorMessage ?
                            <Spinner animation="grow" />
                            : <i className="bi bi-exclamation-diamond-fill text-danger display-6"></i>
                }
                {
                    errorMessage ?
                        <div className='p-3 bg-danger text-light m-3'>
                            <div>{errorMessage}</div>
                            <Button className='mt-3' variant="dark">Solve</Button>
                        </div>
                        : null
                }
            </div>
        </div>
    )
}

export default VerifyAccount