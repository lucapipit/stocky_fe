import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import "../styles/animations.css";

const AnnounceCreateSuccess = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(()=>{navigate("/")}, 2000)
  }, []) 

  return (
    <div className='p-4 py-5'>
      <div className='text-center'>Announcement Succesfully Created!</div>
      <div className='border rounded mt-5 mx-3'>
        <div className='bg-primary rounded percentageBar' style={{ height: "10px"}}></div>
      </div>
    </div>
  )
}

export default AnnounceCreateSuccess