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

  const [counter, setCounter] = useState(0);
  const [numOfAnnouncements, setNumOfAnnouncements] = useState(countByInterest);
  const [categoryLevel, setCategoryLevel] = useState(7);
  const [tkn, setTkn] = useState("");
  const [decodedTkn, setDecodedTkn] = useState("");

  let myInterests = "";

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
    if (input) { setCounter(counter + 1); } else { setCounter(counter - 1); };
    input ? setNumOfAnnouncements(numOfAnnouncements - 1) : setNumOfAnnouncements(numOfAnnouncements + 1);


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
      dispatch(getAnnouncementsByInterestsFunc({ interests: myInterests, token: tkn }));
    }

  }, [counter, categoryLevel, myInterests])


  return (
    <>
      <_Navbar />
      <div className='myVh100 d-flex flex-column align-items-center pb-5' >
        <div className='w-100 d-flex justify-content-center bg-dark mb-3 py-1'>
          <div className='w-100 d-flex justify-content-between myMaxW700 '>
            <i className="bi bi-trash3-fill myIconLg text-light myCursor ms-4" onClick={() => modifyCounter(0)}></i>
            <i className="bi bi-heart myIconLg text-light myCursor me-4" onClick={() => modifyCounter(1)}></i>
          </div>
        </div>
        <div className='d-flex justify-content-center mb-3'>
          {
            dataByInterests && dataByInterests.map((el, index) => {
              return <div className={`border px-1 ${index === counter ? "bg-info" : index < counter ? "bg-dark" : "bg-secondary"} rounded-5 myCursor`} style={{ height: "10px", margin: "0 1px" }} ></div>
            })
          }
        </div>
        <CardAnnouncement singleData={[dataByInterests[counter]]} isLoading={isLoading} />

      </div>
    </>
  )
}

export default _Store