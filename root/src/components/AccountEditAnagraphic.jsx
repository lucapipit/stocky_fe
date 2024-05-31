import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import countriesArray from '../assets/JSON/countriesIso2Arry.json';
import phoneCodes from '../assets/JSON/countryPhoneCodes.json';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch, useSelector } from 'react-redux';
import { getCitiesFunc, searchCity, clearSearchCity } from '../states/geonamesState';
import Spinner from 'react-bootstrap/Spinner';
import { updateAccountFunc } from '../states/signinState';
import { verifyMailFunc } from '../states/signinState';
import { Link } from 'react-router-dom';

const AccountEditAnagraphic = ({ userData }) => {
    const [companyName, setCompanyName] = useState(userData.companyName);
    const [email, setEmail] = useState(userData.email);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState(userData.city);
    const [state, setState] = useState(userData.state);
    const [address, setAddress] = useState(userData.address);
    const [streetNumber, setStreetNumber] = useState(userData.streetNumber);
    const [zipCode, setZipCode] = useState(userData.zipCode);
    const [phone, setPhone] = useState(userData.phone.split("-")[1]);
    const [phoneCode, setPhoneCode] = useState(userData.phone.split("-")[0]);
    const [verifyCode, setVerifyCode] = useState(Math.ceil(Math.random() * 1000000000));

    const dispatch = useDispatch();

    //inputs validation
    const specialCharacter = ["!", "#", "$", "%", "&", "@", "<", ">", "="];
    const isEmailValid = email.includes("@") && email.includes(".") && email.length > 6;
    const [isCityValid, setIsCityValid] = useState(false);

    const allCitiesFiltered = useSelector((state) => state.geonames.allCitiesFiltered);
    const isLoading = useSelector((state) => state.signin.loading);

    const formCheck = async () => {
        const payload = {
            ...userData,
            companyName: companyName,
            email: email,
            country: country.split(":")[1],
            city: city,
            state: state,
            address: address,
            streetNumber: streetNumber,
            zipCode: zipCode,
            phone: `${phoneCode}-${phone.toString()}`
        }

        if (userData.email !== email) {
            dispatch(updateAccountFunc({ payload: { ...payload, accountActive: 0 }, token: localStorage.getItem("token") }))
                .then((res) => {
                    if (res.payload.statusCode === 200) {
                        dispatch(verifyMailFunc({ email: email, companyName: companyName, verifyCode: `${userData.id}-${verifyCode}` }))
                            .then((res) => {
                                if (res.payload.statusCode === 200) {
                                    window.location.reload()
                                }
                            })
                    }
                })
        } else {

            dispatch(updateAccountFunc({ payload: payload, token: localStorage.getItem("token") }))
                .then((res) => {
                    if (res.payload.statusCode === 200) {
                        window.location.reload()
                    }
                })
        }

    }

    useEffect(() => {
        let countryExt = "";
        countriesArray.iso2.map((el) => { if (el.split(":")[1] == userData.country) { return countryExt = el } });
        setCountry(countryExt)
    }, [])

    useEffect(() => {
        country && phoneCodes.map((el) => { if (el.code === country.split(":")[1]) { setPhoneCode(el.dial_code) } });
    }, [country])

    return (
        <div>

            <div>
                <div className="mb-3 d-flex gap-2 align-items-center">
                    <InputGroup >
                        <InputGroup.Text id="basic-addon1"><i className="bi bi-buildings-fill"></i></InputGroup.Text>
                        <Form.Control
                            placeholder="Company Name"
                            aria-label="Company Name"
                            aria-describedby="basic-addon1"
                            onChange={(e) => { setCompanyName(e.target.value) }}
                            value={companyName}
                        />
                    </InputGroup>
                    {companyName ? <i className="bi bi-check-circle-fill ms-2 text-success"></i> : null}
                </div>
                <div className="mb-3 d-flex gap-2 align-items-center">
                    <InputGroup >
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                            placeholder="email"
                            aria-label="email"
                            aria-describedby="basic-addon1"
                            onChange={(e) => { setEmail(e.target.value) }}
                            value={email}
                        />
                    </InputGroup>
                    {isEmailValid ? <i className="bi bi-check-circle-fill ms-2 text-success"></i> : null}
                </div>
                <div className='d-flex flex-wrap justify-content-center gap-3'>
                    <Link to={`/changepssw/${userData.email}/${userData.id}`}><a className='myCursor link-light'>change password</a></Link>
                </div>

                {/* -------------------- */}

                <div>
                    <h4 className=' text-light fw-light mb-2 mt-4'>Company location</h4>

                    <div className="mb-3 d-flex gap-2 align-items-center">
                        <InputGroup >
                            <InputGroup.Text id="basic-addon1"><i className="bi bi-globe-americas"></i></InputGroup.Text>
                            <DropdownButton className="mb-3 w-100" variant='dark' id="dropdown-basic-button"
                                title={country ? country.split(":")[0] : "select a country"}>
                                {
                                    countriesArray && countriesArray.iso2.map((el) => {
                                        return <Dropdown.Item onClick={() => { setCountry(el); dispatch(getCitiesFunc(el.split(":")[1])); dispatch(clearSearchCity()); setCity(""); setIsCityValid(false) }}>{el.split(":")[0]}</Dropdown.Item>
                                    })
                                }
                            </DropdownButton>
                        </InputGroup>
                        {country ? <i className="bi bi-check-circle-fill ms-2 text-success"></i> : null}
                    </div>

                    <div className="mb-3">
                        <div className='d-flex gap-2 align-items-center'>
                            <InputGroup >
                                <InputGroup.Text id="basic-addon1"><i className="bi bi-geo-fill"></i></InputGroup.Text>
                                <Form.Control
                                    disabled={country ? false : true}
                                    placeholder="City"
                                    aria-label="City"
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => { dispatch(searchCity(e.target.value)); setCity(e.target.value); setIsCityValid(false) }}
                                    value={city}
                                />
                            </InputGroup>
                            {isCityValid && city ? <i className="bi bi-check-circle-fill ms-2 text-success"></i> : null}
                        </div>
                        {
                            allCitiesFiltered.length !== 0 ?
                                <div className='position-relative'>
                                    <div className='border w-100 p-3 customDropdown position-absolute bg-light text-dark'>
                                        {
                                            allCitiesFiltered && allCitiesFiltered.map((el) => {
                                                return <div className='px-2 rounded-5 myCursor' onClick={() => { setCity(el.name); dispatch(clearSearchCity()); setIsCityValid(true) }}>{el.name}</div>
                                            })
                                        }
                                    </div>
                                </div>
                                : null
                        }
                    </div>

                    <div className="mb-3 d-flex gap-2 align-items-center">
                        <InputGroup >
                            <InputGroup.Text id="basic-addon1"><i className="bi bi-map-fill"></i></InputGroup.Text>
                            <Form.Control
                                disabled={country && city ? false : true}
                                placeholder="State/Province"
                                aria-label="State/Province"
                                aria-describedby="basic-addon1"
                                onChange={(e) => { setState(e.target.value) }}
                                value={state}
                            />
                        </InputGroup>
                        {state ? <i className="bi bi-check-circle-fill ms-2 text-success"></i> : null}
                    </div>

                    <div className="mb-3 d-flex gap-2 align-items-center">
                        <InputGroup >
                            <InputGroup.Text id="basic-addon1"><i className="bi bi-geo-alt-fill"></i></InputGroup.Text>
                            <Form.Control
                                disabled={country && city ? false : true}
                                placeholder="Address"
                                aria-label="Address"
                                aria-describedby="basic-addon1"
                                onChange={(e) => { setAddress(e.target.value) }}
                                value={address}
                            />
                        </InputGroup>
                        {address ? <i className="bi bi-check-circle-fill ms-2 text-success"></i> : null}
                    </div>

                    <div className="mb-3 d-flex gap-2 align-items-center">
                        <InputGroup >
                            <InputGroup.Text id="basic-addon1"><i className="bi bi-signpost-fill"></i></InputGroup.Text>
                            <Form.Control
                                disabled={country && city ? false : true}
                                placeholder="Street Number"
                                aria-label="Street Number"
                                aria-describedby="basic-addon1"
                                onChange={(e) => { setStreetNumber(e.target.value) }}
                                value={streetNumber}
                            />
                        </InputGroup>
                        {streetNumber ? <i className="bi bi-check-circle-fill ms-2 text-success"></i> : null}
                    </div>

                    <div className="mb-3 d-flex gap-2 align-items-center">
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1"><i className="bi bi-mailbox2-flag"></i></InputGroup.Text>
                            <Form.Control
                                disabled={country && city ? false : true}
                                placeholder="Zip Code"
                                aria-label="Zip Code"
                                aria-describedby="basic-addon1"
                                onChange={(e) => { setZipCode(e.target.value) }}
                                value={zipCode}
                            />
                        </InputGroup>
                        {zipCode ? <i className="bi bi-check-circle-fill ms-2 text-success"></i> : null}
                    </div>

                    <div className="mb-3 d-flex gap-2 align-items-center">
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1"><i className="bi bi-telephone-fill"></i></InputGroup.Text>
                            <DropdownButton disabled={country ? false : true} className="mb-3 w-100" variant='dark' id="dropdown-basic-button" title={phoneCode ? phoneCode : "select a prefix"}>
                                {
                                    phoneCodes.map((el) => {
                                        return <Dropdown.Item onClick={() => setPhoneCode(el.dial_code)}>{el.dial_code} ({el.name})</Dropdown.Item>
                                    })
                                }
                            </DropdownButton>
                            <Form.Control
                                disabled={country ? false : true}
                                type='number'
                                placeholder="Phone"
                                aria-label="Phone"
                                aria-describedby="basic-addon1"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                            />
                        </InputGroup>
                        {phone.length > 5 ? <i className="bi bi-check-circle-fill ms-2 text-success"></i> : null}
                    </div>

                    <div className='d-flex justify-content-center'>
                        {isLoading ? <h5><i className='text-light me-3'><Spinner size='sm' animation="border" /> Update</i></h5> : <h5><i className="bi bi-arrow-repeat myCursor me-3" onClick={() => { formCheck(); localStorage.removeItem("editId") }}> Update</i></h5>}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default AccountEditAnagraphic