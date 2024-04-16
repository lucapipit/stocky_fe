import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUserFunc } from '../states/loginState';
import { getAllAnnouncementsByIdOwnerFunc } from '../states/storeState';
import { jwtDecode } from 'jwt-decode';
import CardPenRejAnnouncementReduced from './CardPenRejAnnouncementReduced';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { verifyMailFunc } from '../states/signinState';

const _Account = () => {

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.login.userData);
  const allUserAnnouncements = useSelector((state) => state.myStore.allData);
  const isLoading = useSelector((state) => state.myStore.isLoading);
  const loading = useSelector((state) => state.signin.loading);
  const [isResended, setIsResended] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const tkn = jwtDecode(token, process.env.JWT_SECRET);
      dispatch(getSingleUserFunc({ id: tkn.id, token: token }));
      dispatch(getAllAnnouncementsByIdOwnerFunc({ idOwner: tkn.id, token: token }))
    }
  }, [])

  const resendVerification = () => {
    dispatch(verifyMailFunc({ email: userData[0].email, companyName: userData[0].companyName, verifyCode: `${userData[0].id}-${userData[0].verifyCode}` }))
      .then((res) => {
        if (res.payload.statusCode === 200) {
          setIsResended(true)
        } else {
          setErrorMessage(res.payload.message)
        }
      })
  }



  return (
    <div >

      {
        userData && userData.length > 0 ?
          <div className='position-relative' >

            <h1 className='fw-light text-center pt-5'><i className="bi bi-person-circle"></i> Account</h1>

            <div className='d-flex align-items-center justify-content-center my-5'>
              <div className='border rounded-5 p-5 myMainGradient text-light shadow'>

                <div className='position-relative'>
                  <div className='position-absolute bg-dark border activeUserIcon d-flex align-items-center justify-content-center'>
                    {
                      userData[0].accountActive ?
                        <i className="bi bi-person-check-fill text-info"></i>
                        : <i className="bi bi-person-fill-exclamation text-danger"></i>
                    }
                  </div>
                </div>

                <h2>{userData[0].companyName}</h2>
                <hr />
                <div className={userData[0].manufacturer ? "text-info" : "text-success"}><i className="bi bi-person-vcard-fill me-2"></i>{userData[0].manufacturer ? "Manufacturer" : "Dealer"}</div>
                <p className='mt-3'><i className="bi bi-envelope-at-fill me-2"></i><i>{userData[0].email}</i></p>
                <div className='my-3'>
                  <p><i className="bi bi-geo-alt-fill me-2"></i>{`${userData[0].address[0].toUpperCase()}${userData[0].address.slice(1)} (${userData[0].zipCode}) - ${userData[0].city} - ${userData[0].country} `}</p>
                </div>
                <p><i className="bi bi-telephone-fill me-2"></i>{userData[0].phone}</p>

              </div>
            </div>

            {
              userData[0].accountActive ?
                null
                :
                <div className='d-flex justify-content-center'>
                  <div className='bg-danger text-light myMaxW700 p-3 text-center'>
                    <div>
                      You account is not active. To get into the Outlet Store and to use myStocker services the account must be activated. Click on the "Resend" button below to send another verification mail. Inside the email you will receive (in at least some minutes) there is a link, please click on it to activate your account.
                    </div>
                    <Button className='mt-3' variant="dark" onClick={() => resendVerification()}>
                      {
                        loading ?
                          <i>Sending <Spinner className='ms-1' animation="grow" size="sm" /></i>
                          : isResended && !errorMessage ?
                            <i class="bi bi-send-check-fill text-success"> Resended</i>
                            : !isResended && !errorMessage ?
                              <i className="bi bi-send-fill"> Resend</i>
                              : <i className="bi bi-send-x-fill text-danger"> Not sended</i>
                      }
                    </Button>
                    {isResended ? <h6 className='mt-3'>* If you dont receive any email check out first if your email is correct.</h6> : null}
                  </div>
                </div>

            }

            {
              errorMessage ?
                <div className='d-flex justify-content-center mt-3'>
                  <div className='bg-danger text-light myMaxW700 p-3 text-center'>
                    <div className='fw-bold'>Reason why the email has not been sended: </div>
                    {errorMessage}
                  </div>
                </div>
                : null
            }


            {
              allUserAnnouncements.length !== 0 ?
                <div>
                  <hr className='mx-5' />
                  <h1 className='my-5 text-center fw-light'>Announcements</h1>
                  <div className='d-flex flex-wrap justify-content-center align-items-center my-5'>
                    {
                      allUserAnnouncements && allUserAnnouncements.map((el) => {
                        return <CardPenRejAnnouncementReduced singleData={el} isLoading={isLoading} />
                      })
                    }
                  </div>
                </div>
                : null
            }

          </div>
          :
          <div className='w-100 d-flex align-items-center justify-content-center' style={{ height: "100vh" }}>
            <Spinner animation="border" variant='dark' />
          </div>
      }
    </div>
  )

}

export default _Account