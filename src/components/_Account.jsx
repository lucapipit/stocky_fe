import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUserFunc } from '../states/loginState';
import { jwtDecode } from 'jwt-decode';

const _Account = () => {

  const dispatch = useDispatch();
  const userData = useSelector((state)=>state.login.userData);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const tkn = jwtDecode(token, process.env.JWT_SECRET);
      dispatch(getSingleUserFunc({ id: tkn.id, token: token }))
    }
    console.log(userData);
  }, [])

  return (
    <div >
      <div className='d-flex align-items-center justify-content-center mt-5'>

        <div className='border rounded-5 p-5 bg-dark text-light'>
            <h2>{userData[0].companyName}</h2>
            <hr />
            <p><i className="bi bi-envelope-at-fill me-2"></i><i>{userData[0].email}</i></p>
            <div className='my-3'>
                <p><i className="bi bi-geo-alt-fill me-2"></i>{`${userData[0].address[0].toUpperCase()}${userData[0].address.slice(1)} (${userData[0].zipCode}) - ${userData[0].city} - ${userData[0].country} `}</p>
            </div>
            <p><i className="bi bi-telephone-fill me-2"></i>{userData[0].phone}</p>
            <div className={userData[0].manufacturer?"text-info":"text-success"}><i className="bi bi-person-vcard-fill me-2"></i>{userData[0].manufacturer?"Manufacturer":"Dealer"}</div>
        </div>

      </div>
    </div>
  )
}

export default _Account