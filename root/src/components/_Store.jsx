import React, { useEffect, useState } from 'react';
import _Navbar from './_Navbar';
import CardAnnouncement from './CardAnnouncement';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { getAnnouncementsByInterestsFunc, getSingleAnnouncementFunc, getAllCountsFunc } from '../states/storeState';

const _Store = () => {

  const dispatch = useDispatch();
  const allData = useSelector((state) => state.myStore.allData);
  const singleData = useSelector((state) => state.myStore.singleData);
  const allCounts = useSelector((state) => state.myStore.allCounts);

  const dataByInterests = useSelector((state) => state.myStore.dataByInterests);
  const isLoading = useSelector((state) => state.myStore.isLoading);
  const countByInterest = useSelector((state) => state.myStore.countByInterest)

  const [isReverseActive, setIsReverseActive] = useState({ isFirstOpen: true, value: false });
  const [counter, setCounter] = useState(0);
  const [numOfAnnouncements, setNumOfAnnouncements] = useState(countByInterest);
  const [categoryLevel, setCategoryLevel] = useState(7);
  const [tkn, setTkn] = useState("");
  const [decodedTkn, setDecodedTkn] = useState("x");

  let myInterests = "";
  // questa variabile è un let

  useEffect(() => {
    setTkn(localStorage.getItem("token"));
  }, [])

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const myDcdTkn = jwtDecode(localStorage.getItem("token"), process.env.JWT_SECRET);
      setDecodedTkn(myDcdTkn);
      myInterests = myDcdTkn.interests;

      if (myInterests === "") {
        setCategoryLevel(categoryLevel - 1);
      }
    }
  }, [categoryLevel])

  const modifyCounter = (input) => {
    if (input) { setCounter(counter + 1); setIsReverseActive({ isFirstOpen: false, value: true }) } else { setCounter(counter - 1); setIsReverseActive({ ...isReverseActive, value: false }) };
    input ? setNumOfAnnouncements(numOfAnnouncements - 1) : setNumOfAnnouncements(numOfAnnouncements + 1);

    if (numOfAnnouncements === 2) {
      setIsReverseActive({ ...isReverseActive, isFirstOpen: true })
    }
    if (numOfAnnouncements === 1) {
      setCategoryLevel(categoryLevel - 1)
      if (categoryLevel === 4) {
        setCategoryLevel(6);
        setNumOfAnnouncements(countByInterest);
      }
    }
  }

  useEffect(() => {
    setNumOfAnnouncements(countByInterest);
  }, [countByInterest])


  useEffect(() => {
    if (myInterests !== "") {
      setCounter(0);
      setIsReverseActive({ ...isReverseActive, isFirstOpen: true })
      dispatch(getAnnouncementsByInterestsFunc({ interests: myInterests, token: tkn }));
    }

  }, [counter, categoryLevel, myInterests])


  return (
    <>
      <_Navbar />
      <div className='myVh100 d-flex align-items-center justify-content-center p-3 py-5' >

        {isReverseActive.isFirstOpen || !isReverseActive.value ? <div style={{ width: "100px" }}></div> : <i className="bi bi-arrow-counterclockwise myIconLg me-5 myLightGray myCursor" onClick={() => modifyCounter(0)}></i>}
        <CardAnnouncement singleData={[dataByInterests[counter]]} isLoading={isLoading} />
        <i className="bi bi-caret-right-fill myIconLg ms-5 myLightGray myCursor" onClick={() => modifyCounter(1)}></i>

      </div>
    </>
  )
}

export default _Store