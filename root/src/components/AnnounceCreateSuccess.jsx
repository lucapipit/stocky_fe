import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import "../styles/animations.css";

const AnnounceCreateSuccess = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(()=>{navigate("/")}, 2000)
  }, []) 

  return (
    <div className='p-4 py-5 d-flex flex-column align-items-center'>
      <h3 className='text-center fw-light'>Announcement Succesfully Created!</h3>
      <div className='border rounded mt-5 mx-3 myMaxW700 w-100'>
        <div className='bg-primary rounded percentageBar' style={{ height: "6px"}}></div>
      </div>
    </div>
  )
}

export default AnnounceCreateSuccess