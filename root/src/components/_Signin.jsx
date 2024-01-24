import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { postSigninFunc } from '../states/signinState';
import { postLoginFunc, setIsLogged } from '../states/loginState';
import { useNavigate } from 'react-router';
import Spinner from 'react-bootstrap/Spinner';


const _Signin = () => {

    const [typeOfJob, setTypeOfJob] = useState("select your role");
    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");
    const [pssw, setPssw] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [phone, setPhone] = useState("");

    const [firstSendTry, setFirstSendTry] = useState(true);
    const [serverResponse, setServerResponse] = useState("");
    const formOk = companyName && email && pssw && country && city && zipCode && typeOfJob !== "select your role";

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signinLoading = useSelector((state) => state.signin.loading)

    const registerUser = async () => {

        if (formOk) {

            const payload = {
                companyName: companyName,
                email: email,
                pssw: pssw,
                country: country,
                address: address,
                city: city,
                zipCode: zipCode,
                phone: phone,
                manufacturer: typeOfJob === "Manufacturer" ? 1 : 0,
                dealer: typeOfJob === "Dealer" ? 1 : 0

            };

            dispatch(postSigninFunc(payload))
                .then((res) => {
                    if (res.payload.statusCode === 200) {
                        
                        dispatch(postLoginFunc({email: email, pssw: pssw}))
                        .then((res)=>{
                            if(res.payload.statusCode === 200){
                                localStorage.setItem('token', res.payload.token);
                                dispatch(setIsLogged(true));
                            }else {
                                setServerResponse(res.payload.message);
                                console.error('login error');
                            }
                        });

                        setCompanyName("");
                        setEmail("");
                        setPssw("");
                        setCountry("");
                        setAddress("");
                        setCity("");
                        setZipCode("");
                        setPhone("");
                        setTypeOfJob("select your role");
                        navigate("/");
                        
                    } else {
                        setServerResponse(res.payload.message);
                        console.error('signin error');
                    }
                })
                .catch((err) => {
                    console.error('server error', err);
                })
        }

    }


    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: "100vh" }}>
            <div className='bg-light border w-75 p-5 rounded-5'>
                <h2 className='text-center text-secondary fw-light'>Signin</h2>
                <hr className='mb-4'/>
                <div>
                    <DropdownButton className="mb-3" variant='info' id="dropdown-basic-button" title={typeOfJob}>
                        <Dropdown.Item href="#/action-1" onClick={() => { setTypeOfJob("Manufacturer") }}>Manufacturer</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" onClick={() => { setTypeOfJob("Dealer") }}>Dealer</Dropdown.Item>
                    </DropdownButton>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i className="bi bi-buildings-fill"></i></InputGroup.Text>
                        <Form.Control
                            placeholder="Company Name"
                            aria-label="Company Name"
                            aria-describedby="basic-addon1"
                            onChange={(e) => { setCompanyName(e.target.value) }}
                            value={companyName}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                            placeholder="email"
                            aria-label="email"
                            aria-describedby="basic-addon1"
                            onChange={(e) => { setEmail(e.target.value) }}
                            value={email}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i className="bi bi-key-fill"></i></InputGroup.Text>
                        <Form.Control
                            placeholder="password"
                            aria-label="password"
                            type='password'
                            aria-describedby="basic-addon1"
                            onChange={(e) => { setPssw(e.target.value) }}
                            value={pssw}
                        />
                    </InputGroup>

                    <hr />

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i className="bi bi-globe-americas"></i></InputGroup.Text>
                        <Form.Control
                            placeholder="Country"
                            aria-label="Country"
                            aria-describedby="basic-addon1"
                            onChange={(e) => { setCountry(e.target.value) }}
                            value={country}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i className="bi bi-geo-alt-fill"></i></InputGroup.Text>
                        <Form.Control
                            placeholder="Address"
                            aria-label="Address"
                            aria-describedby="basic-addon1"
                            onChange={(e) => { setAddress(e.target.value) }}
                            value={address}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i class="bi bi-geo-fill"></i></InputGroup.Text>
                        <Form.Control
                            placeholder="City"
                            aria-label="City"
                            aria-describedby="basic-addon1"
                            onChange={(e) => { setCity(e.target.value) }}
                            value={city}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i className="bi bi-mailbox2-flag"></i></InputGroup.Text>
                        <Form.Control
                            placeholder="Zip Code"
                            aria-label="Zip Code"
                            aria-describedby="basic-addon1"
                            onChange={(e) => { setZipCode(e.target.value) }}
                            value={zipCode}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i className="bi bi-telephone-fill"></i></InputGroup.Text>
                        <Form.Control
                            placeholder="Phone"
                            aria-label="Phone"
                            aria-describedby="basic-addon1"
                            onChange={(e) => { setPhone(e.target.value) }}
                            value={phone}
                        />
                    </InputGroup>

                    <hr />
                    <Button className='w-100' variant="primary" onClick={() => { registerUser(); setFirstSendTry(false) }}>{signinLoading ? <Spinner animation="border" size='sm' /> : "register"}</Button>
                    <p className="mt-3 text-center">{firstSendTry || formOk ? "" : <i className="bi bi-exclamation-triangle-fill text-danger"> Fill the form correctly</i>}</p>
                    {serverResponse ? <p className="mt-3 text-center text-danger"><i class="bi bi-exclamation-circle"> {serverResponse}</i></p> : <p></p>}
                </div>
            </div>
        </div>
    )
}

export default _Signin