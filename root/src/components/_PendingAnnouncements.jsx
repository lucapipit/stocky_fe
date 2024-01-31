import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPendingAnnouncementsFunc } from '../states/penRejState';
import CardPendingAnnouncement from './CardPendingAnnouncement';

const _PendingAnnouncements = () => {

    const dispatch = useDispatch();
    const allPendingAnnouncements = useSelector((state) => state.penRej.allPendingAnnouncements);
    const isLoading = useSelector((state) => state.penRej.isLoading)

    useEffect(() => {
        dispatch(getAllPendingAnnouncementsFunc())
    }, [])


    return (
        <div>
            <h2 className='text-center fw-light mt-3 mb-4'>Pending Announcements</h2>

            {allPendingAnnouncements && allPendingAnnouncements.map((el) => {
                return <CardPendingAnnouncement singleData={[el]} isLoading={isLoading} />
            })}
        </div>
    )
}

export default _PendingAnnouncements