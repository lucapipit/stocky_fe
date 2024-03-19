import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postLoginFunc } from '../states/loginState';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {setIsLogged} from '../states/loginState';
import Spinner from 'react-bootstrap/Spinner';



const _Login = () => {
    const [email, setEmail] = useState('');
    const [pssw, setPssw] = useState('');
    const [firstSendTry, setFirstSendTry] = useState(true);
    const [serverResponse, setServerResponse] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginLoading = useSelector((state)=>state.login.loading)
    const formOk = email&&pssw;

    const handleSubmit = async () => {

        const loginPayload = {
            email: email,
            pssw: pssw
        }

        if(formOk){
            dispatch(postLoginFunc(loginPayload))
                .then((res) => {
                    if (res.payload.statusCode === 200) {
                        localStorage.setItem('token', res.payload.token);
                        dispatch(setIsLogged(true));
                        setEmail('');
                        setPssw('');
                        navigate('/');
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


    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: "100vh" }}>
            <div className='bg-light border w-75 p-3 rounded-5'>
                <h3 className='text-center text-secondary fw-light mb-3'>login</h3>
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
                <button className="btn btn-primary w-100" onClick={() => { handleSubmit(); setFirstSendTry(false) }}>{loginLoading?<Spinner animation="border" size='sm' />:"login"}</button>
                <p className="mt-3 text-center">{firstSendTry||formOk?"":<i className="bi bi-exclamation-triangle-fill text-danger"> Fill the form correctly</i>}</p>
                {serverResponse?<p className="mt-3 text-center text-danger"><i className="bi bi-exclamation-circle"> {serverResponse}</i></p>:<p></p>}
            </div>
        </div>
    )
}

export default _Login