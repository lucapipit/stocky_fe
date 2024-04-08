import { React, useEffect, useState } from 'react';
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
import countriesArray from '../assets/JSON/countriesIso2Arry.json';
import { setDistributionArea, delDistributionArea, setSellingAreaExcluded, delSellingAreaExcluded, clearSellingAreaExcluded, clearDistributionArea } from '../states/generalState';
import { Country, State, City } from 'country-state-city'; //https://www.npmjs.com/package/country-state-city

const _Signin = () => {

    const [typeOfJob, setTypeOfJob] = useState("");
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
    const formOk = companyName && email && pssw && country && city && zipCode && typeOfJob;

    const [addArea, setAddArea] = useState(false);
    const [sellWholeWorld, setSellWholeWorld] = useState(true);
    const [step, setStep] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signinLoading = useSelector((state) => state.signin.loading);
    const distributionAreaISO = useSelector((state) => state.general.distributionAreaISO);
    const sellingAreaExcludedISO = useSelector((state) => state.general.sellingAreaExcludedISO);

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

                        dispatch(postLoginFunc({ email: email, pssw: pssw }))
                            .then((res) => {
                                if (res.payload.statusCode === 200) {
                                    localStorage.setItem('token', res.payload.token);
                                    dispatch(setIsLogged(true));
                                } else {
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
                        setTypeOfJob("");
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

    };

    const manageStep = (input) => {
        if (input && step < 3) {
            setStep(step + 1)
        }
        if (!input && step > 0) {
            setStep(step - 1)
        }
    };

    //inputs validation
    const isEmailValid = email.includes("@") && email.length > 6;
    const speciCharacter = ["!", "#", "$", "%", "&", "@", "<", ">", "="];
    const isPsswValid = pssw.split("").some((x) => speciCharacter.includes(x)) && pssw.length > 7;

    useEffect(() => {
        console.log(/* State.getAllStates(), Country.getAllCountries(), */ City.getAllCities());
    }, [])


    return (
        <div className='d-flex align-items-center justify-content-center ' style={{ height: "100vh" }}>
            <div className='bg-light border w-75 p-5 rounded-5 myMaxW800'>
                <h1 className='text-center text-secondary fw-light displa-6'>Signin</h1>

                {/* progress bar */}
                <div className='d-flex justify-content-center mt-3'>
                    <div className='myMaxW300 position-relative progressStepBar d-flex justify-content-center align-items-center'>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className={`${step >= 0 ? "active" : ""}`}></div>
                            <div className={`${step >= 1 ? "active" : ""}`}></div>
                            <div className={`${step >= 2 ? "active" : ""}`}></div>
                            <div className={`${step >= 3 ? "active" : ""}`}></div>
                        </div>
                        <div className='position-absolute'></div>
                        <div className='position-absolute'
                            style={{
                                background: `${step === 0 ?
                                    "linear-gradient(to right, #14a7ad 15%, #fff 10%, #fff, #fff)"
                                    : step === 1 ?
                                        "linear-gradient(to right, #14a7ad 50%, #fff 10%, #fff)"
                                        : step === 2 ?
                                            "linear-gradient(to right, #14a7ad 82%, #fff 10%)"
                                            : "#14a7ad"
                                    }`
                            }}></div>
                    </div>
                </div>

                <hr className='mb-3' />
                <div>
                    {
                        step === 0 ?
                            <div>
                                <h4 className='fw-light text-secondary text-center'>Select your job:</h4>
                                <div className='d-flex flex-wrap align-items-center justify-content-center mb-5 mt-4 gap-4'>
                                    <div className={`bg-secondary position-relative text-light px-4 py-2 rounded-5 myCursor ${typeOfJob === "Dealer" ? "delManSelectorActive" : "delManSelector"}`} onClick={() => { setTypeOfJob("Dealer") }}>
                                        <i className="bi bi-check-circle-fill position-absolute"></i> Dealer
                                    </div>
                                    <div className={`bg-secondary position-relative text-light px-4 py-2 rounded-5 myCursor ${typeOfJob === "Manufacturer" ? "delManSelectorActive" : "delManSelector"}`} onClick={() => { setTypeOfJob("Manufacturer") }}>
                                        <i className="bi bi-check-circle-fill position-absolute"></i> Manufacturer
                                    </div>
                                </div>
                            </div>
                            : null
                    }

                    {
                        step === 1 ?
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

                                <div>
                                    <div className="mb-3 d-flex gap-2 align-items-center">
                                        <InputGroup>
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
                                        {isPsswValid ? <i className="bi bi-check-circle-fill ms-2 text-success"></i> : null}
                                        {
                                            pssw.length > 2 && !isPsswValid ?
                                                <i className="bi bi-exclamation-diamond-fill text-warning ms-2"></i>
                                                : null
                                        }
                                    </div>
                                    {
                                        pssw.length > 2 && !isPsswValid ?
                                            <div className='bg-warning text-light p-2 px-3'>
                                                <p className='m-0'>Password must be <b>longer than 7 characters</b>  & must contain at least one of this special characters: <b>! # $ % & @ =</b></p>
                                            </div>
                                            : null
                                    }
                                </div>

                            </div>
                            : null
                    }


                    {
                        step === 2 ?
                            typeOfJob === "Dealer" ?
                                <div> {/* Per i Dealer */}
                                    <h4 className='text-secondary fw-light mb-4'>Distrubution Area</h4>
                                    <div className='d-flex justify-content-start'>
                                        {
                                            addArea ?
                                                <DropdownButton className="mb-3 w-100" variant='dark' id="dropdown-basic-button" title="select a country">
                                                    {
                                                        countriesArray && countriesArray.iso2.map((el) => {
                                                            return <Dropdown.Item onClick={() => { dispatch(setDistributionArea(el)); setAddArea(false) }}>{el.split(":")[0]}</Dropdown.Item>
                                                        })
                                                    }
                                                </DropdownButton>
                                                : <div className='d-flex align-items-center flex-wrap gap-2 text-primary myCursor' onClick={() => { setAddArea(true) }}><div className='myBgWhite plusDistributionArea d-flex align-items-center justify-content-center border' ><i className="bi bi-plus-lg text-primary"></i></div>add a country</div>
                                        }

                                    </div>
                                    <div className='mt-3'>
                                        {
                                            distributionAreaISO && distributionAreaISO.map((item) => {
                                                return <span className='bg-dark text-light me-2 my-1 p-1 px-3 rounded-5 distAreaCountry'>{item.split(":")[0]}<i className="bi bi-trash-fill text-danger ms-2 myCursor" onClick={() => { dispatch(delDistributionArea(item)) }}></i></span>
                                            })
                                        }
                                    </div>
                                </div>
                                :
                                <div>{/* per i Produttori */}
                                    <h4 className='text-secondary fw-light mb-2'>Selling Area</h4>
                                    <p className='text-secondary fw-light mb-4'>Select country/ies you would like to exclude from your Selling Area. Your announcements will not be visible in that country/ies automatically. This preferences can be changed individually during each announcement creation or later in your Account page.</p>
                                    <div className='d-flex justify-content-start'>
                                        {
                                            addArea ?
                                                <DropdownButton className="mb-3 w-100" variant='dark' id="dropdown-basic-button" title="select a country">
                                                    {
                                                        countriesArray && countriesArray.iso2.map((el) => {
                                                            return <Dropdown.Item onClick={() => { dispatch(setSellingAreaExcluded(el)); setAddArea(false) }}>{el.split(":")[0]}</Dropdown.Item>
                                                        })
                                                    }
                                                </DropdownButton>
                                                :
                                                <div className='d-flex gap-4 align-items-center flex-wrap'>
                                                    <div className={`${sellWholeWorld ? "disabledPlus" : null} d-flex align-items-center flex-wrap gap-2 text-primary myCursor`} onClick={() => { setAddArea(true) }}><div className='myBgWhite plusDistributionArea d-flex align-items-center justify-content-center border' ><i className="bi bi-plus-lg text-primary"></i></div>add a country</div>
                                                    <Form><Form.Check defaultChecked={sellWholeWorld ? "checked" : ""} type="switch" id="custom-switch" label="I wanto to sell to the entire world" onClick={() => { setSellWholeWorld(!sellWholeWorld); dispatch(clearSellingAreaExcluded()) }} /></Form>
                                                </div>
                                        }

                                    </div>
                                    <div className='mt-3'>
                                        {
                                            sellingAreaExcludedISO && sellingAreaExcludedISO.map((item) => {
                                                return <span className='bg-dark text-light me-2 my-1 p-1 px-3 rounded-5 distAreaCountry'>{item.split(":")[0]}<i className="bi bi-trash-fill text-danger ms-2 myCursor" onClick={() => { dispatch(delSellingAreaExcluded(item)) }}></i></span>
                                            })
                                        }
                                    </div>
                                </div>
                            : null
                    }


                    {
                        step === 3 ?
                            <div>
                                <h4 className=' text-secondary fw-light mb-4'>Company location</h4>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1"><i className="bi bi-globe-americas"></i></InputGroup.Text>
                                    <DropdownButton className="mb-3 w-100" variant='dark' id="dropdown-basic-button" title={country ? country.split(":")[0] : "select a country"}>
                                        {
                                            countriesArray && countriesArray.iso2.map((el) => {
                                                return <Dropdown.Item onClick={() => setCountry(el)}>{el.split(":")[0]}</Dropdown.Item>
                                            })
                                        }
                                    </DropdownButton>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1"><i className="bi bi-geo-fill"></i></InputGroup.Text>
                                    <DropdownButton disabled={country ? false : true} className="mb-3 w-100" variant='dark' id="dropdown-basic-button" title={city ? city.split(":")[0] : "select a city"}>
                                        {
                                            City.getAllCities().map((el) => {
                                                if (el.countryCode === country.split(":")[1]) {
                                                    return <Dropdown.Item onClick={() => setCity(`${el.name}:${el.countryCode}`)}>{el.name}</Dropdown.Item>
                                                }
                                            })
                                        }
                                    </DropdownButton>
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
                            </div>
                            : null
                    }

                    <hr />
                    <div className='d-flex align-items-center justify-content-center'>
                        {
                            step === 0 ?
                                <Button variant="primary" disabled={typeOfJob ? false : true} onClick={() => { manageStep(true) }}><i className="bi bi-check2-square me-2"></i>{signinLoading ? <Spinner animation="border" size='sm' /> : "done"}</Button>
                                : step === 1 ?
                                    <div className='d-flex gap-4 align-items-center'>
                                        <h5 className='bi bi-arrow-return-left myCursor m-0' variant="secondary" onClick={() => { manageStep(false) }}> back</h5>
                                        <Button variant="primary" /* disabled={companyName && isEmailValid && isPsswValid ? false : true} */ onClick={() => { manageStep(true) }}><i className="bi bi-check2-square me-2"></i>{signinLoading ? <Spinner animation="border" size='sm' /> : "done"}</Button>
                                    </div>
                                    : step === 2 ?
                                        <div className='d-flex gap-4 align-items-center'>
                                            <h5 className='bi bi-arrow-return-left myCursor m-0' variant="secondary" onClick={() => { manageStep(false) }}> back</h5>
                                            <Button variant="primary" disabled={distributionAreaISO.length > 0 || (typeOfJob === "Manufacturer" && (sellWholeWorld || sellingAreaExcludedISO.length > 0)) ? false : true} onClick={() => { manageStep(true) }}><i className="bi bi-check2-square me-2"></i>{signinLoading ? <Spinner animation="border" size='sm' /> : "done"}</Button>
                                        </div>
                                        :
                                        <div className='d-flex gap-4 align-items-center'>
                                            <h5 className='bi bi-arrow-return-left myCursor m-0' variant="secondary" onClick={() => { manageStep(false) }}> back</h5>
                                            <Button variant="primary" onClick={() => { registerUser(); setFirstSendTry(false) }}><i className="bi bi-check2-square me-2"></i>{signinLoading ? <Spinner animation="border" size='sm' /> : "register"}</Button>
                                        </div>
                        }
                    </div>
                    <p className="mt-3 text-center">{firstSendTry || formOk ? "" : <i className="bi bi-exclamation-triangle-fill text-danger"> Fill the form correctly</i>}</p>
                    {serverResponse ? <p className="mt-3 text-center text-danger"><i className="bi bi-exclamation-circle"> {serverResponse}</i></p> : <p></p>}
                </div>
            </div>
        </div >
    )
}

export default _Signin