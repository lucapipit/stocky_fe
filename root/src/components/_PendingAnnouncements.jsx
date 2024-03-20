import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAnnouncementsFunc } from '../states/storeState';
import CardPendingAnnouncement from './CardPendingAnnouncement';
import Spinner from 'react-bootstrap/Spinner';

const _PendingAnnouncements = () => {

    const dispatch = useDispatch();
    const allData = useSelector((state) => state.myStore.allData);
    const isLoading = useSelector((state) => state.myStore.isLoading);

    useEffect(() => {
        dispatch(getAllAnnouncementsFunc({token: localStorage.getItem("token"), status: 0}));
    }, [])


    return (
        <div>
            <h1 className='text-center fw-light mt-3 mb-4'>Pending Announcements</h1>
            {allData && isLoading ?
                <div className='text-center my-4'><Spinner animation="border" variant="primary" /></div> 
                :allData .map((el) => {
                    return <CardPendingAnnouncement singleData={[el]} isLoading={isLoading} />
                })}
        </div>
    )
}

export default _PendingAnnouncements