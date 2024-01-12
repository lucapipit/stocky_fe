import React, { useEffect, useState } from 'react';
import "../styles/custom.css";
import _Navbar from './_Navbar';
import CardAnnouncement from './CardAnnouncement';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAnnouncementsFunc, getSingleAnnouncementFunc, getAllCountsFunc } from '../states/storeState';

const _Store = () => {

  const dispatch = useDispatch();
  const allData = useSelector((state) => state.myStore.allData);
  const singleData = useSelector((state) => state.myStore.singleData);
  const isLoading = useSelector((state) => state.myStore.isLoading);
  const allCounts = useSelector((state) => state.myStore.allCounts);
  const [counter, setCounter] = useState(1);
  const [tkn, setTkn] = useState("");

  const modifyCounter = (input) => {
    input ? setCounter(counter + 1) : setCounter(counter - 1)
  }

  useEffect(() => {
    /* console.log(Math.ceil(Math.random()*allCounts) allCounts[0].mycount); */
    dispatch(getAllCountsFunc());
    setTkn(localStorage.getItem("tkn"));
    dispatch(getSingleAnnouncementFunc({ id: counter, token: tkn }))
  }, [counter])

  return (
    <>
      <_Navbar />
      <div className='myVh100 d-flex align-items-center justify-content-center p-3 py-5' >

        <i className="bi bi-arrow-counterclockwise myIconLg me-5 myLightGray myCursor" onClick={() => modifyCounter(0)}></i>
        <CardAnnouncement singleData={singleData} isLoading={isLoading} />
        <i className="bi bi-caret-right-fill myIconLg ms-5 myLightGray myCursor" onClick={() => modifyCounter(1)}></i>

      </div>
    </>
  )
}

export default _Store