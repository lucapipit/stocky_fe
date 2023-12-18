import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';

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


    const registerUser = async () => {
    
        try {

            const payload = {
                companyName: companyName,
                email: email,
                pssw: pssw,
                country: country,
                address: address,
                city: city,
                zipCode: zipCode,
                phone: phone,
                manufacturer: typeOfJob === "manufacturer" ? 1 : 0,
                dealer: typeOfJob === "dealer" ? 1 : 0

            };
            const response = await fetch("http://localhost:5050/signin", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload)
            });
            return response.json()

        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: "100vh" }}>
            <div className='bg-light border w-50 p-5 rounded-5'>
                <h2>Signin</h2>
                <hr />
                <div>
                    <DropdownButton  className="mb-3" variant='info' id="dropdown-basic-button" title={typeOfJob}>
                        <Dropdown.Item href="#/action-1" onClick={() => { setTypeOfJob("Manufacturer") }}>Manufacturer</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" onClick={() => { setTypeOfJob("Dealer") }}>Dealer</Dropdown.Item>
                    </DropdownButton>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
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
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
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
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                            placeholder="Country"
                            aria-label="Country"
                            aria-describedby="basic-addon1"
                            onChange={(e) => { setCountry(e.target.value) }}
                            value={country}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                            placeholder="Address"
                            aria-label="Address"
                            aria-describedby="basic-addon1"
                            onChange={(e) => { setAddress(e.target.value) }}
                            value={address}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                            placeholder="City"
                            aria-label="City"
                            aria-describedby="basic-addon1"
                            onChange={(e) => { setCity(e.target.value) }}
                            value={city}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                            placeholder="Zip Code"
                            aria-label="Zip Code"
                            aria-describedby="basic-addon1"
                            onChange={(e) => { setZipCode(e.target.value) }}
                            value={zipCode}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                            placeholder="Phone"
                            aria-label="Phone"
                            aria-describedby="basic-addon1"
                            onChange={(e) => { setPhone(e.target.value) }}
                            value={phone}
                        />
                    </InputGroup>

                    <hr />
                    <Button className='w-100' variant="primary" onClick={()=>{registerUser()}}>Register</Button>

                </div>
            </div>
        </div>
    )
}

export default _Signin