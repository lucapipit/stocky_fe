import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postLoginFunc } from '../states/loginState';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { setIsLogged } from '../states/loginState';
import Spinner from 'react-bootstrap/Spinner';
import { Button } from 'react-bootstrap';
import { userSearchFunc } from '../states/loginState';
import { resetPsswMailFunc } from '../states/signinState';



const _Login = () => {
    const [email, setEmail] = useState('');
    const [pssw, setPssw] = useState('');
    const [firstSendTry, setFirstSendTry] = useState(true);
    const [serverResponse, setServerResponse] = useState("");
    const [resetPssw, setResetPssw] = useState(false);
    const [emailCheckHolding, setCheckEmailHolding] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginLoading = useSelector((state) => state.login.loading)

    const isEmailValid = email.includes("@") && email.includes(".") && email.length > 6;
    const formOk = isEmailValid && pssw;

    const handleSubmit = async () => {

        const loginPayload = {
            email: email,
            pssw: pssw
        }

        if (formOk) {
            dispatch(postLoginFunc(loginPayload))
                .then((res) => {
                    if (res.payload.statusCode === 200) {
                        localStorage.setItem('token', res.payload.token);
                        dispatch(setIsLogged(true));
                        setEmail('');
                        setPssw('');
                        navigate('/account');
                    } else {
                        setServerResponse(res.payload.message);
                        console.error('login error');
                    }
                })
                .catch((err) => {
                    console.error('login or server error', err);
                })
        }


    };

    const manageReset = async () => {
        dispatch(userSearchFunc({email: email}))
            .then((res) => {
                if (res.payload.statusCode === 200) {
                    dispatch(resetPsswMailFunc(res.payload.data[0]))
                        .then((res) => {
                            if (res.payload.statusCode === 200) {
                                setCheckEmailHolding(true)
                            }
                        })
                }else{
                    setServerResponse(res.payload.message);
                }
            })
    }


    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: "100vh" }}>
            <div className='bg-light border w-100 myMaxW700 p-3 rounded-5 mx-1'>

                {
                    resetPssw || emailCheckHolding ?
                        null :
                        <div>
                            <h3 className='text-center text-secondary fw-light mb-4'>login</h3>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                <Form.Control placeholder="Email" aria-label="Email" aria-describedby="basic-addon1"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><i className="bi bi-key-fill"></i></InputGroup.Text>
                                <Form.Control type='password' placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"
                                    onChange={(e) => setPssw(e.target.value)}
                                    value={pssw}
                                />
                            </InputGroup>
                            <div className='d-flex align-items-center justify-content-center pt-3'>
                                <Button className='w-100' variant="primary" disabled={formOk ? false : true} onClick={() => { handleSubmit(); setFirstSendTry(false) }}>{loginLoading ? <Spinner animation="border" size='sm' /> : "login"}</Button>
                            </div>
                            <div className='mt-4 text-end'>
                                <a className='myCursor link-secondary' onClick={() => setResetPssw(true)}>forgot password</a>
                            </div>
                            <p className="mt-3 text-center">{firstSendTry || formOk ? "" : <i className="bi bi-exclamation-triangle-fill text-danger"> Fill the form correctly</i>}</p>
                            {serverResponse ? <p className="mt-3 text-center text-danger"><i className="bi bi-exclamation-circle"> {serverResponse}</i></p> : <p></p>}
                        </div>
                }

                {
                    resetPssw && !emailCheckHolding ?
                        <div>
                            <h3 className='text-center text-secondary fw-light mb-4'>Forgot Password</h3>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                <Form.Control placeholder="Email" aria-label="Email" aria-describedby="basic-addon1"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </InputGroup>
                            <div className='d-flex align-items-center justify-content-center pt-2'>
                                <Button className='w-100' variant="primary" disabled={isEmailValid ? false : true} onClick={() => { manageReset() }}>{loginLoading ? <Spinner animation="border" size='sm' /> : "done"}</Button>
                            </div>
                            <div className='mt-4 text-end'>
                                <a className='myCursor link-secondary' onClick={() => setResetPssw(false)}>login</a>
                            </div>
                            {serverResponse ? <p className="mt-3 text-center text-danger"><i className="bi bi-exclamation-circle"> {serverResponse}</i></p> : <p></p>}
                        </div>
                        : null
                }

                {
                    emailCheckHolding ?
                        <div className='pt-2'>
                            <div className='d-flex align-items-center justify-content-center gap-3'>
                                <Spinner animation="grow" size='sm' />
                                <span>Check your email. We sent a link to set a new password.</span>
                            </div>
                            <p className='mt-3 text-center text-secondary'>* If you haven't received any email repeat the process from the beginning, making sure to insert correctly the same email with which the account has been created.</p>
                            <div className='text-center'><a className='myCursor link-primary' onClick={()=>window.location.reload()}>login</a></div>
                        </div>
                        : null
                }
            </div>
        </div>
    )
}

export default _Login