import React from 'react';
import "../styles/custom.css";
import _Navbar from './_Navbar';

const _Store = () => {
  return (
    <>
      <_Navbar />
      <div className='myVh100 d-flex align-items-center justify-content-center p-3 py-5' >

       { <i className="bi bi-arrow-counterclockwise myIconLg me-5 myLightGray myCursor"></i>}
        <div className='p-3 rounded-5 bg-light border myMaxW500'>
          <img className='img-fluid mb-2 rounded-4' src="https://www.parfimo.it/data/cache/thumb_min500_max1000-min500_max1000-12/products/461133/1701947427/colgate-advanced-white-dentifricio-75-ml-527624.jpg" alt="" />
          <div className='d-flex justify-content-between gap-3'>
            <span>Qnt: 17</span>
            <span className='fw-light'>Brand: Mentadent</span>
          </div>
          <h1 className='fw-light'>Dentifricio Colgate</h1>
          <div className='d-flex align-items-top'>
            <h1 className='fw-normal'>59</h1>
            <p className='mt-2'>90$</p>
          </div>
          <div className='mb-2'>
            <span className='bg-success text-light p-1 px-2 rounded-5'>dental</span>
          </div>
          <h5 className='fw-light'>description...</h5>
          <p>tech details...</p>
        </div>
        <i className="bi bi-caret-right-fill myIconLg ms-5 myLightGray myCursor"></i>

      </div>
    </>
  )
}

export default _Store