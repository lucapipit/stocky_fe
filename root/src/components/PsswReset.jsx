import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postLoginFunc } from '../states/loginState';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import { Button } from 'react-bootstrap';
import { changePsswFunc, psswChangedMailFunc } from '../states/signinState';

const PsswReset = ({ param }) => {
  const [pssw2, setPssw2] = useState('');
  const [psswR, setPsswR] = useState('');
  const [serverResponse, setServerResponse] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginLoading = useSelector((state) => state.login.loading)

  const specialCharacter = ["!", "#", "$", "%", "&", "@", "<", ">", "="];
  const isPssw2Valid = pssw2.split("").some((x) => specialCharacter.includes(x)) && pssw2.length > 7;
  const isPsswRValid = pssw2 === psswR;
  const form2Ok = param.email && param.id && isPssw2Valid && isPsswRValid;




  const changeMyPssw = async () => {
    if (form2Ok) {

      dispatch(changePsswFunc({ payload: { pssw: pssw2, id: param.id }, token: localStorage.getItem("token") }))
        .then((res) => {
          if (res.payload.statusCode === 200) {
            dispatch(psswChangedMailFunc({ email: param.email }))
            setStep(2)
            setTimeout(() => {
              navigate("/login")
            }, "3000")
          } else {
            setServerResponse(res.payload.message)
          }
        })

    }
  }


  return (
    <div className='d-flex align-items-center justify-content-center' style={{ height: "100vh" }}>
      <div className='bg-light border w-100 myMaxW700 p-3 rounded-5'>

        {
          step === 1 ?
            <div>
              <h3 className='text-center text-secondary fw-light mb-3'>New Password</h3>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"><i className="bi bi-key-fill"></i></InputGroup.Text>
                <Form.Control type='password' placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"
                  onChange={(e) => setPssw2(e.target.value)}
                  value={pssw2}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"><i className="bi bi-key-fill"></i></InputGroup.Text>
                <Form.Control type='password' placeholder="Repeat Password" aria-label="Password" aria-describedby="basic-addon1"
                  onChange={(e) => setPsswR(e.target.value)}
                  value={psswR}
                />
              </InputGroup>

              <div className='bg-secondary text-light p-2 px-3'>
                <p className='m-0'>Password must be <b>longer than 7 characters</b>  & must contain at least one of this special characters: <b>! # $ % & @ =</b></p>
              </div>

              <div className='d-flex align-items-center justify-content-center pt-3'>
                <Button variant="primary" disabled={isPssw2Valid && isPsswRValid ? false : true} onClick={() => { changeMyPssw() }}><i className="bi bi-check2-square me-2"></i>{loginLoading ? <Spinner animation="border" size='sm' /> : "done"}</Button>
              </div>
              {error ? <p className="mt-3 text-center text-danger"><i className="bi bi-exclamation-circle"> {error}</i></p> : <p></p>}
              {serverResponse ? <p className="mt-3 text-center text-danger"><i className="bi bi-exclamation-circle"> {serverResponse}</i></p> : <p></p>}
            </div>
            : null
        }

        {
          step === 2 ?
            <div className='d-flex flex-column align-items-center gap-3 m-3'>
              <h3>Password has been changed succesfully!</h3>
              <i className="bi bi-check-circle-fill text-info display-6"></i>
            </div>
            : null
        }

      </div>
    </div>
  )
}

export default PsswReset