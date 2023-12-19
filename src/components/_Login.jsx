import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { PostLogin } from '../states/apiSlice';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { set } from 'mongoose';

const _Login = () => {
    const [email, setEmail] = useState('')
    const [pssw, setPssw] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        // try {
        //     const response = await fetch('http://localhost:5050/login', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ email, pssw }),
        //     });
        //     const data = await response.json();

        //     if (data.statusCode === 200) {
        //         localStorage.setItem('token', data.token);
        //         localStorage.setItem('user', JSON.stringify(data.user));
        //         navigate('/');
        //     } else {
        //         throw new Error('error during login');
        //     }
        // } catch (error) {
        //     console.error('error di fetching', error);
        // }
        e.preventDefault();
        const loginPayload = {
            email: email,
            password: pssw
        }
        dispatch(PostLogin(loginPayload))
            .then((res) => {
                if (res.payload.statusCode === 200) {
                    localStorage.setItem('token', res.payload.token);
                    localStorage.setItem('user', JSON.stringify(res.payload.user));
                    navigate('/');
                } else {
                    console.error('la risposta non contiene il token valido');
                }
            })
            .catch((err) => {
                console.error('errore durante il login', err);
            })
        setEmail('');
        setPssw('');

    };
    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: "100vh" }}>
            <div className='bg-light border w-50 p-3 rounded-5'>
                <h2>Login</h2>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    <Form.Control placeholder="Email" aria-label="Email" aria-describedby="basic-addon1"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    <Form.Control type='password' placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"
                        onChange={(e) => setPssw(e.target.value)}
                    />
                </InputGroup>
                <button className="btn btn-primary w-100" onClick={() => { handleSubmit() }}>Login</button>
            </div>
        </div>
    )
}

export default _Login