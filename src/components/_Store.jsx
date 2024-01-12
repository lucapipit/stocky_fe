import React, { useEffect, useState } from 'react';
import "../styles/custom.css";
import _Navbar from './_Navbar';
import CardAnnouncement from './CardAnnouncement';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { getAnnouncementsByInterestsFunc, getSingleAnnouncementFunc, getAllCountsFunc } from '../states/storeState';

const _Store = () => {

  const dispatch = useDispatch();
  const allData = useSelector((state) => state.myStore.allData);
  const singleData = useSelector((state) => state.myStore.singleData);
  const dataByInterests = useSelector((state) => state.myStore.dataByInterests);
  const isLoading = useSelector((state) => state.myStore.isLoading);
  const allCounts = useSelector((state) => state.myStore.allCounts);
  const countByInterest = useSelector((state) => state.myStore.countByInterest)
  const [counter, setCounter] = useState(0);
  const [tkn, setTkn] = useState("");
  const [decodedTkn, setDecodedTkn] = useState("x");

  const modifyCounter = (input) => {
    console.log([dataByInterests[0]]);
    input ? setCounter(counter + 1) : setCounter(counter - 1)
  }

  useEffect(() => {
    dispatch(getAllCountsFunc());
    setTkn(localStorage.getItem("token"));
    if(localStorage.getItem("token")){
      const myDcdTkn = jwtDecode(localStorage.getItem("token"), process.env.JWT_SECRET);
      setDecodedTkn(myDcdTkn);
      // dispatch(getSingleAnnouncementFunc({ id: counter, token: tkn }));
      const myInterests = myDcdTkn.interests.split(",").filter((el)=>el.length>5).map((it)=>it.substring(0, 2)).join("-");
      dispatch(getAnnouncementsByInterestsFunc({ interests: myInterests, token: tkn }));
    }
  }, [counter])

  
  return (
    <>
      <_Navbar />
      <div className='myVh100 d-flex align-items-center justify-content-center p-3 py-5' >

        {counter===0?<div style={{width: "100px"}}></div>:<i className="bi bi-arrow-counterclockwise myIconLg me-5 myLightGray myCursor" onClick={() => modifyCounter(0)}></i>}
        <CardAnnouncement singleData={[dataByInterests[counter]]} isLoading={isLoading} />
        {counter<countByInterest-1?<i className="bi bi-caret-right-fill myIconLg ms-5 myLightGray myCursor" onClick={() => modifyCounter(1)}></i>:<div style={{width: "100px"}}></div>}

      </div>
    </>
  )
}

export default _Store