import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAnnouncementsFunc } from '../states/storeState';
import CardRejectedAnnouncement from './CardRejectedAnnouncement';
import CardPendingAnnouncement from './CardPendingAnnouncement';
import Spinner from 'react-bootstrap/Spinner';

const _RejectedAnnouncements = () => {

    const dispatch = useDispatch();
    const allData = useSelector((state) => state.myStore.allData);
    const isLoading = useSelector((state) => state.myStore.isLoading);

    useEffect(() => {
        dispatch(getAllAnnouncementsFunc({token: localStorage.getItem("token"), status: 3}));
    }, [])



    return (
        <div>
            <h1 className='text-center fw-light mt-3 mb-4'>Rejected Announcements</h1>
            {allData && isLoading ?
                <div className='text-center my-4'><Spinner animation="border" variant="primary" /></div> :
                allData.map((el) => {
                    return <CardPendingAnnouncement singleData={[el]} isLoading={isLoading} />
                    return <CardRejectedAnnouncement singleData={[el]} isLoading={isLoading} />
                })}
        </div>
    )
}

export default _RejectedAnnouncements