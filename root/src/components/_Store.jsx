import React, { useEffect, useState } from 'react';
import _Navbar from './_Navbar';
import CardAnnouncement from './CardAnnouncement';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { getAnnouncementsByInterestsFunc, getAnnouncementsByIdFunc } from '../states/storeState';
import { getUserOutletFunc, updateUserOutlet } from '../states/outletStore';
import { useNavigate } from 'react-router';

const _Store = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const outletData = useSelector((state) => state.myStore.outletData);
  const outletCounts = useSelector((state) => state.myStore.outletCounts);
  const outletUserData = useSelector((state) => state.outlet.outletUserData);

  const isLoading = useSelector((state) => state.myStore.isLoading);
  const countByInterest = useSelector((state) => state.myStore.countByInterest)

  const [counter, setCounter] = useState(0);
  const [numOfAnnouncements, setNumOfAnnouncements] = useState(countByInterest);
  const [categoryLevel, setCategoryLevel] = useState(7);
  const [tkn, setTkn] = useState("");
  const [error, setError] = useState("");
  const [waitForTimeReset, setWaitForTimeReset] = useState(false);
  const [remainingPercentage, setRemainingPercentage] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  let myInterests = "";

  useEffect(() => {
    setTkn(localStorage.getItem("token"));
  }, [])



  const iDontCare = async () => {

    if (!outletData[counter].resetOutletTime) {

      const myOutletUserData = outletUserData[0];
      dispatch(updateUserOutlet({
        payload: {
          ...myOutletUserData,
          outletHistory: [outletUserData.outletHistory, outletData[counter].id]
        }, token: localStorage.getItem("token")
      }))
        .then((res) => {

          if (res.payload.statusCode === 200) {

            const newOutletData = []

            if (outletData.length === 1) { //se è l'ultimo elemento

              outletData.map((el) => {
                if (el.id !== outletData[counter].id) {
                  newOutletData.push(el)
                }
              });
              const myNewOutletSetArray = `${newOutletData.map((el) => { return el.id })}`;

              dispatch(updateUserOutlet({
                payload: {
                  ...myOutletUserData,
                  resetOutletTime: new Date(),
                  outletHistory: myOutletUserData.outletHistory.length > 0 ? [...myOutletUserData.outletHistory.split(","), outletData[counter].id] : [outletData[counter].id],
                  outletSet: myNewOutletSetArray
                }, token: localStorage.getItem("token")
              }))
                .then((res) => { if (res.payload.statusCode === 200) { window.location.reload() } })

            } else {//non è l'ultimo elemento

              outletData.map((el) => {
                if (el.id !== outletData[counter].id) {
                  newOutletData.push(el)
                }
              });
              const myNewOutletSetArray = `${newOutletData.map((el) => { return el.id })}`;

              dispatch(updateUserOutlet({
                payload: {
                  ...myOutletUserData,
                  outletHistory: myOutletUserData.outletHistory.length > 0 ? [...myOutletUserData.outletHistory.split(","), outletData[counter].id] : [outletData[counter].id],
                  outletSet: myNewOutletSetArray
                }, token: localStorage.getItem("token")
              }))
                .then((res) => { if (res.payload.statusCode === 200) { window.location.reload() } })
            }
          } else {
            setError(res.payload.error)
          }
        })
    }
  }

  const iLikeIt = async () => {

    if (!outletData[counter].resetOutletTime) {

      const myOutletUserData = outletUserData[0];
      dispatch(updateUserOutlet({
        payload: {
          ...myOutletUserData,
          outletLikes: [outletUserData.outletLikes, outletData[counter].id],
          outletHistory: [outletUserData.outletHistory, outletData[counter].id]
        }, token: localStorage.getItem("token")
      }))
        .then((res) => {

          if (res.payload.statusCode === 200) {

            const newOutletData = []

            if (outletData.length === 1) { //se è l'ultimo elemento

              outletData.map((el) => {
                if (el.id !== outletData[counter].id) {
                  newOutletData.push(el)
                }
              });
              const myNewOutletSetArray = `${newOutletData.map((el) => { return el.id })}`;

              dispatch(updateUserOutlet({
                payload: {
                  ...myOutletUserData,
                  resetOutletTime: new Date(),
                  outletLikes: myOutletUserData.outletLikes.length > 0 ? [...myOutletUserData.outletLikes.split(","), outletData[counter].id] : [outletData[counter].id],
                  outletHistory: myOutletUserData.outletHistory.length > 0 ? [...myOutletUserData.outletHistory.split(","), outletData[counter].id] : [outletData[counter].id],
                  outletSet: myNewOutletSetArray
                }, token: localStorage.getItem("token")
              }))
                .then((res) => { if (res.payload.statusCode === 200) { window.location.reload() } })

            } else {//non è l'ultimo elemento

              outletData.map((el) => {
                if (el.id !== outletData[counter].id) {
                  newOutletData.push(el)
                }
              });
              const myNewOutletSetArray = `${newOutletData.map((el) => { return el.id })}`;
              dispatch(updateUserOutlet({
                payload: {
                  ...myOutletUserData,
                  outletLikes: myOutletUserData.outletLikes.length > 0 ? [...myOutletUserData.outletLikes.split(","), outletData[counter].id] : [outletData[counter].id],
                  outletHistory: myOutletUserData.outletHistory.length > 0 ? [...myOutletUserData.outletHistory.split(","), outletData[counter].id] : [outletData[counter].id],
                  outletSet: myNewOutletSetArray
                }, token: localStorage.getItem("token")
              }))
                .then((res) => { if (res.payload.statusCode === 200) { window.location.reload() } })
            }
          } else {
            setError(res.payload.error)
          }
        })
    }
  }

  useEffect(() => {

    setNumOfAnnouncements(countByInterest);
  }, [outletCounts])




  useEffect(() => { // step 1
    if (localStorage.getItem("token")) {
      const myDcdTkn = jwtDecode(localStorage.getItem("token"), process.env.JWT_SECRET);
      dispatch(getUserOutletFunc({ idOwner: myDcdTkn.id, token: localStorage.getItem("token") }))
        .then((res) => { if (res.payload.data.length === 0) { navigate("/") } })
    }

  }, [myInterests])

  useEffect(() => {// step 2
    if (outletUserData.length !== 0) {
      const myDcdTkn = jwtDecode(localStorage.getItem("token"), process.env.JWT_SECRET);
      myInterests = myDcdTkn.interests;

      if (!outletUserData[0].outletSet && !outletUserData[0].resetOutletTime) {//#2 se l'outlet set di questo utente NON contiene degli id e non è presente il reset time

        setCounter(0);
        const myOutletHistory = outletUserData[0].outletHistory ? outletUserData[0].outletHistory : "0";
        const myOwnInterests = myInterests ? myInterests : "0";
        dispatch(getAnnouncementsByInterestsFunc({ interests: myOwnInterests, outletHistory: myOutletHistory, token: localStorage.getItem("token") }))
          .then((res) => {
            if (res.payload.statusCode === 200 && res.payload.data.length !== 0 && outletUserData) {
              const myOutletSetArray = `${res.payload.data.map((el) => { return el.id })}`;
              const myOutletUserData = outletUserData[0];
              dispatch(updateUserOutlet({ payload: { ...myOutletUserData, outletSet: myOutletSetArray }, token: localStorage.getItem("token") }))
                .then((res) => { if (res.payload.statusCode === 200) { window.location.reload() } })
            }
          })
      } else if (outletUserData[0].resetOutletTime) {//se è presente il tempo di reset
        setWaitForTimeReset(true);
        const seconds = (new Date().getTime() - new Date(outletUserData[0].resetOutletTime).getTime()) / 1000;
        const myRemainingTime = Math.round((28800 - seconds) / 36) / 100

        if (myRemainingTime <= 0) {//ripristina l'outlet allo scadere del timer
          const myOutletUserData = outletUserData[0];
          dispatch(updateUserOutlet({ payload: { ...myOutletUserData, resetOutletTime: "" }, token: localStorage.getItem("token") }))
            .then((res) => { if (res.payload.statusCode === 200) { window.location.reload() } })
        }

      } else {//#2
        dispatch(getAnnouncementsByIdFunc({ idSet: outletUserData[0].outletSet, token: localStorage.getItem("token") }))
      }

    }

  }, [outletUserData])


  useEffect(() => {//set time left

    if (outletUserData.length > 0) {
      const seconds = (new Date().getTime() - new Date(outletUserData[0].resetOutletTime).getTime()) / 1000;
      const myPercentage = Math.floor((seconds / 28800) * 100);
      const myRemainingTime = Math.round((28800 - seconds) / 36) / 100
      setRemainingPercentage(myPercentage);
      setRemainingTime(myRemainingTime);
    }

  }, [waitForTimeReset])


  return (
    <>
      <_Navbar />
      <div className='myVh100 d-flex flex-column align-items-center pb-5' >
        {
          outletData.length > 0 ?
            <div className='w-100 d-flex justify-content-center bg-dark mb-3 py-1'>
              <div className='w-100 d-flex justify-content-between myMaxW700 '>
                <i className="bi bi-trash3-fill myIconLg text-light myCursor ms-4" onClick={() => iDontCare()}></i>
                <i className="bi bi-heart myIconLg text-light myCursor me-4" onClick={() => iLikeIt()}></i>
              </div>
            </div>
            : null
        }
        {error ? <div className='mb-3 bg-danger text-light p-3 px-4'>{error}</div> : null}
        <div className='d-flex justify-content-center mb-3'>
          {
            outletData && outletData.map((el, index) => {
              return <div className={`border px-1 ${index === counter ? "bg-info" : index < counter ? "bg-dark" : "bg-secondary"} rounded-5 myCursor`} style={{ height: "10px", margin: "0 1px" }} ></div>
            })
          }
        </div>
        {
          waitForTimeReset ?
            <div className='w-100 px-2 pt-5 text-center'>
              <h3 className='text-center fw-light'>Time left to the next outlet</h3>
              <div className='p-4 pb-4 d-flex justify-content-center align-items-center'>
                <div className='border rounded-5 mx-3 myMaxW1000 w-100'>
                  <div className='bg-primary rounded-5  position-relative' style={{ height: "10px", width: `${remainingPercentage}%` }}>
                    <div className={`h-100 ${remainingPercentage > 5 ? "percentageBarGlow" : ""} top-0 position-absolute`} style={{ width: "5vw", zIndex: 9 }}></div>
                  </div>
                </div>
                <h5>{remainingPercentage}%</h5>
              </div>
              <h5 className=''>Time left: <b>
                {remainingTime < 1 ? null : `${Math.floor(remainingTime)} hours`} {Math.floor(remainingTime * 60) % 60} minutes
              </b></h5>
            </div>
            : <CardAnnouncement singleData={[outletData[counter]]} isLoading={isLoading} />
        }

      </div>
    </>
  )
}

export default _Store