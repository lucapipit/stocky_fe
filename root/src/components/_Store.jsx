import React, { useEffect, useState } from 'react';
import _Navbar from './_Navbar';
import CardAnnouncement from './CardAnnouncement';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { getAnnouncementsByInterestsFunc, getAnnouncementsByIdFunc, updateAnnouncementFunc } from '../states/storeState';
import { getUserOutletFunc, updateUserOutlet } from '../states/outletStore';
import { useNavigate } from 'react-router';

const _Store = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const outletData = useSelector((state) => state.myStore.outletData);
  const outletUserData = useSelector((state) => state.outlet.outletUserData);

  const isLoading = useSelector((state) => state.myStore.isLoading);
  const [dcdTkn, setDcdTkn] = useState("");

  const [counter, setCounter] = useState(0);

  const [error, setError] = useState("");
  const [waitForTimeReset, setWaitForTimeReset] = useState(false);
  const [remainingPercentage, setRemainingPercentage] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  let myInterests = "";

  const iDontCare = async () => {

    if (!outletUserData[0].resetOutletTime) {

      const myOutletData = outletData[counter];

      dispatch(updateAnnouncementFunc({ payload: { ...myOutletData, views: outletData[counter].views + 1, negClick: outletData[counter].negClick + 1 }, token: localStorage.getItem("token") }))
        .then((res) => {
          if (res.payload.statusCode === 200) {

            const myOutletUserData = outletUserData[0];
            const newOutletData = [];
            outletData.map((el) => {
              if (el.id !== outletData[counter].id) {
                newOutletData.push(el)
              }
            });
            const myNewOutletSetArray = `${newOutletData.map((el) => { return el.id })}`;
            //per pulire gli array da valori vuoti expl.[1,4,,3]
            let cleanHistoryArray = [];
            let cleanLikesArray = [];
            [...myOutletUserData.outletHistory.split(",")].map((el) => { if (+el !== outletData[counter].id && el !== "" && el !== undefined) { return cleanHistoryArray.push(el) } });
            [...myOutletUserData.outletLikes.split(",")].map((el) => { if (+el !== outletData[counter].id && el !== "" && el !== undefined) { return cleanLikesArray.push(el) } });

            if (outletData.length === 1) { //se è l'ultimo elemento

              dispatch(updateUserOutlet({
                payload: {
                  ...myOutletUserData,
                  resetOutletTime: new Date(),
                  outletHistory: myOutletUserData.outletHistory.length > 0 ? [...cleanHistoryArray, outletData[counter].id] : [outletData[counter].id],
                  outletSet: myNewOutletSetArray
                }, token: localStorage.getItem("token")
              }))
                .then((res) => {
                  if (res.payload.statusCode === 200) { window.location.reload() } else { setError(res.payload.error) }
                })

            } else {//non è l'ultimo elemento

              dispatch(updateUserOutlet({
                payload: {
                  ...myOutletUserData,
                  outletHistory: myOutletUserData.outletHistory.length > 0 ? [...cleanHistoryArray, outletData[counter].id] : [outletData[counter].id],
                  outletSet: myNewOutletSetArray
                }, token: localStorage.getItem("token")
              }))
                .then((res) => { if (res.payload.statusCode === 200) { window.location.reload() } })
            }

          }
        })

    }
  }

  const iLikeIt = async () => {

    if (!outletUserData[0].resetOutletTime) {

      const myOutletData = outletData[counter];
      const cleanLikesIds = [];
      myOutletData.likesArry && [...myOutletData.likesArry.split(",")].map((el) => { if (+el !== dcdTkn.id && el !== "" && el !== undefined) { return cleanLikesIds.push(el) } });

      dispatch(updateAnnouncementFunc({ payload: { ...myOutletData, views: outletData[counter].views + 1, posClick: outletData[counter].posClick + 1, likesArry: [...cleanLikesIds, dcdTkn.id] }, token: localStorage.getItem("token") }))
        .then((res) => {
          if (res.payload.statusCode === 200) {

            const myOutletUserData = outletUserData[0];
            const newOutletData = []
            outletData.map((el) => {
              if (el.id !== outletData[counter].id) {
                newOutletData.push(el)
              }
            });
            const myNewOutletSetArray = `${newOutletData.map((el) => { return el.id })}`;
            //per pulire gli array da valori vuoti expl.[1,4,,3]
            let cleanHistoryArray = [];
            let cleanLikesArray = [];
            [...myOutletUserData.outletHistory.split(",")].map((el) => { if (+el !== outletData[counter].id && el !== "" && el !== undefined) { return cleanHistoryArray.push(el) } });
            [...myOutletUserData.outletLikes.split(",")].map((el) => { if (+el !== outletData[counter].id && el !== "" && el !== undefined) { return cleanLikesArray.push(el) } });

            if (outletData.length === 1) { //se è l'ultimo elemento

              dispatch(updateUserOutlet({
                payload: {
                  ...myOutletUserData,
                  resetOutletTime: new Date(),
                  outletLikes: myOutletUserData.outletLikes.length > 0 ? [...cleanLikesArray, outletData[counter].id] : [outletData[counter].id],
                  outletHistory: myOutletUserData.outletHistory.length > 0 ? [...cleanHistoryArray, outletData[counter].id] : [outletData[counter].id],
                  outletSet: myNewOutletSetArray
                }, token: localStorage.getItem("token")
              }))
                .then((res) => {
                  if (res.payload.statusCode === 200) { window.location.reload() } else { setError(res.payload.error) }
                })

            } else {//non è l'ultimo elemento

              dispatch(updateUserOutlet({
                payload: {
                  ...myOutletUserData,
                  outletLikes: myOutletUserData.outletLikes.length > 0 ? [...cleanLikesArray, outletData[counter].id] : [outletData[counter].id],
                  outletHistory: myOutletUserData.outletHistory.length > 0 ? [...cleanHistoryArray, outletData[counter].id] : [outletData[counter].id],
                  outletSet: myNewOutletSetArray
                }, token: localStorage.getItem("token")
              }))
                .then((res) => { if (res.payload.statusCode === 200) { window.location.reload() } })
            }

          }
        })

    }
  }

  useEffect(() => {//step 0
    const token = localStorage.getItem("token");

    if (token) {
      const tkn = jwtDecode(token, process.env.JWT_SECRET);
      setDcdTkn(tkn)
    }
  })


  useEffect(() => { // step 1

    if (localStorage.getItem("token")) {
      const myDcdTkn = jwtDecode(localStorage.getItem("token"), process.env.JWT_SECRET);
      myDcdTkn.id && dispatch(getUserOutletFunc({ idOwner: myDcdTkn.id, token: localStorage.getItem("token") }))
        .then((res) => { if (!res.payload.data.length === 0) { navigate("/") } })
    }
  }, [])

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
      <div className='myMinVh100 d-flex flex-column align-items-center pb-5 mb-5' >
        {
          outletData ?
            <div className='position-fixed w-100 d-flex justify-content-center align-items-center myBgDark mb-3 py-1'>
              <div className='w-100 d-flex justify-content-between myMaxW700 '>
                <i className="bi bi-trash3-fill myIconLg text-light myCursor ms-4" onClick={() => iDontCare()}></i>
                <i className="bi bi-heart-fill myIconLg myFucsiaRed myCursor me-4" onClick={() => iLikeIt()}></i>
              </div>
            </div>
            : null
        }
        {error ? <div className='mb-3 bg-danger text-light p-3 px-4'>{error}</div> : null}
        <div className='d-flex justify-content-center mt-5 pt-5 mb-3'>
          {
            outletData && outletData.map((el, index) => {
              return <div className={`border px-1 ${index === counter ? "bg-info" : index < counter ? "bg-dark" : "bg-secondary"} rounded-5`} style={{ height: "10px", margin: "0 1px" }} ></div>
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
              <h5 >Time left: <b>
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