import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPendingAnnouncementsFunc } from '../states/pendingAnnState';
import CardPendingAnnouncement from './CardPendingAnnouncement';
import Spinner from 'react-bootstrap/Spinner';

const _PendingAnnouncements = () => {

    const dispatch = useDispatch();
    const allPendingAnnouncements = useSelector((state) => state.pendingAnn.allPendingAnnouncements);
    const isLoading = useSelector((state) => state.pendingAnn.isLoading)

    useEffect(() => {
        dispatch(getAllPendingAnnouncementsFunc());
    }, [])


    return (
        <div>
            <h1 className='text-center fw-light mt-3 mb-4'>Pending Announcements</h1>
            {allPendingAnnouncements && isLoading ?
                <div className='text-center my-4'><Spinner animation="border" variant="primary" /></div> :
                allPendingAnnouncements.map((el) => {
                    return <CardPendingAnnouncement singleData={[el]} isLoading={isLoading} />
                })}
        </div>
    )
}

export default _PendingAnnouncements