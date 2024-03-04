import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUserFunc } from '../states/loginState';
import { getAllPendingAnnouncementsByIdOwnerFunc } from '../states/pendingAnnState';
import { getAllRejectedAnnouncementsByIdOwnerFunc } from '../states/rejectedAnnState';
import { getAllAcceptedAnnouncementsByIdOwnerFunc } from '../states/acceptedAnnState';
import { jwtDecode } from 'jwt-decode';
import CardPenRejAnnouncementReduced from './CardPenRejAnnouncementReduced';

const _Account = () => {

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.login.userData);
  const allPendingAnnouncements = useSelector((state) => state.pendingAnn.allPendingAnnouncements);
  const allRejectedAnnouncements = useSelector((state) => state.rejectedAnn.allRejectedAnnouncements);
  const allAcceptedAnnouncements = useSelector((state) => state.acceptedAnn.allAcceptedAnnouncements);
  const isLoading = useSelector((state) => state.pendingAnn.isLoading);


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const tkn = jwtDecode(token, process.env.JWT_SECRET);
      dispatch(getSingleUserFunc({ id: tkn.id, token: token }));
      dispatch(getAllPendingAnnouncementsByIdOwnerFunc({ idOwner: tkn.id, token: token }));
      dispatch(getAllRejectedAnnouncementsByIdOwnerFunc({ idOwner: tkn.id, token: token }));
      dispatch(getAllAcceptedAnnouncementsByIdOwnerFunc({ idOwner: tkn.id, token: token }))
    }
  }, [])


  if (userData && userData.length > 0) {
    return (
      <div >

        <div className='d-flex align-items-center justify-content-center my-5'>
          <div className='border rounded-5 p-5 bg-dark text-light'>
            <h2>{userData[0].companyName}</h2>
            <hr />
            <p><i className="bi bi-envelope-at-fill me-2"></i><i>{userData[0].email}</i></p>
            <div className='my-3'>
              <p><i className="bi bi-geo-alt-fill me-2"></i>{`${userData[0].address[0].toUpperCase()}${userData[0].address.slice(1)} (${userData[0].zipCode}) - ${userData[0].city} - ${userData[0].country} `}</p>
            </div>
            <p><i className="bi bi-telephone-fill me-2"></i>{userData[0].phone}</p>
            <div className={userData[0].manufacturer ? "text-info" : "text-success"}><i className="bi bi-person-vcard-fill me-2"></i>{userData[0].manufacturer ? "Manufacturer" : "Dealer"}</div>
          </div>
        </div>

        <hr />

        <div>
          <h3 className='my-5 text-center'>Announcements</h3>
          <div className='d-flex flex-wrap'>
            {
              allRejectedAnnouncements && allRejectedAnnouncements.map((el) => {
                return <CardPenRejAnnouncementReduced singleData={el} isLoading={isLoading} />
              })
            }
            {
              allPendingAnnouncements && allPendingAnnouncements.map((el) => {
                return <CardPenRejAnnouncementReduced singleData={el} isLoading={isLoading} />
              })
            }
            {
              allAcceptedAnnouncements && allAcceptedAnnouncements.map((el) => {
                return <CardPenRejAnnouncementReduced singleData={el} isLoading={isLoading} />
              })
            }


          </div>
        </div>

      </div>
    )
  } else {
    return (
      <div>
        <h1>LOADING...</h1>
      </div>
    )
  }
}

export default _Account