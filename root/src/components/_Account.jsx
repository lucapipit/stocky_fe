import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUserFunc } from '../states/loginState';
import { getAllAnnouncementsByIdOwnerFunc } from '../states/storeState';
import { jwtDecode } from 'jwt-decode';
import CardPenRejAnnouncementReduced from './CardPenRejAnnouncementReduced';
import Spinner from 'react-bootstrap/Spinner';

const _Account = () => {

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.login.userData);
  const allUserAnnouncements = useSelector((state) => state.myStore.allData);
  const isLoading = useSelector((state) => state.myStore.isLoading);


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const tkn = jwtDecode(token, process.env.JWT_SECRET);
      dispatch(getSingleUserFunc({ id: tkn.id, token: token }));
      dispatch(getAllAnnouncementsByIdOwnerFunc({ idOwner: tkn.id, token: token }))
    }
  }, [])



  return (
    <div >
      
      {
        userData && userData.length > 0 ?
          <div className='position-relative' >

            <h1 className='fw-light text-center pt-5'><i className="bi bi-person-circle"></i> Account</h1>

            <div className='d-flex align-items-center justify-content-center my-5'>
              <div className='border rounded-5 p-5 myMainGradient text-light shadow'>
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

            <hr className='mx-5' />

            <div>

              <h1 className='my-5 text-center fw-light'>Announcements</h1>
              <div className='d-flex flex-wrap justify-content-center align-items-center my-5'>
                {
                  allUserAnnouncements && allUserAnnouncements.map((el) => {
                    return <CardPenRejAnnouncementReduced singleData={el} isLoading={isLoading} />
                  })
                }
              </div>

            </div>

          </div>
          :
          <div className='w-100 d-flex align-items-center justify-content-center' style={{height: "100vh"}}>
            <Spinner animation="border" variant='dark' />
          </div>
      }
    </div>
  )

}

export default _Account