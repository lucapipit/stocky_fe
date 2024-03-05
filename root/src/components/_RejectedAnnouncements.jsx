import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRejectedAnnouncementsFunc } from '../states/rejectedAnnState';
import CardRejectedAnnouncement from './CardRejectedAnnouncement';
import Spinner from 'react-bootstrap/Spinner';

const _RejectedAnnouncements = () => {

    const dispatch = useDispatch();
    const allRejectedAnnouncements = useSelector((state) => state.rejectedAnn.allRejectedAnnouncements);
    const isLoading = useSelector((state) => state.rejectedAnn.isLoading)

    useEffect(() => {
        dispatch(getAllRejectedAnnouncementsFunc());
    }, [])



    return (
        <div>
            <h1 className='text-center fw-light mt-3 mb-4'>Rejected Announcements</h1>
            {allRejectedAnnouncements && isLoading ?
                <div className='text-center my-4'><Spinner animation="border" variant="primary" /></div> :
                allRejectedAnnouncements.map((el) => {
                    return <CardRejectedAnnouncement singleData={[el]} isLoading={isLoading} />
                })}
        </div>
    )
}

export default _RejectedAnnouncements