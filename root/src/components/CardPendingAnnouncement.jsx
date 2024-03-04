
import { React, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Placeholder from 'react-bootstrap/Placeholder';
import { postCreateAnnouncementFunc } from '../states/storeState';
import { updatePendingAnnouncementFunc, deletePendingAnnouncementFunc } from '../states/pendingAnnState';
import { createRejectedAnnouncementFunc } from '../states/rejectedAnnState';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';


const CardPendingAnnouncement = ({ singleData, isLoading }) => {

    const dispatch = useDispatch();

    const approveAnnouncement = async () => {
        if (window.confirm("Do you want to approve this announcement? ")) {
            dispatch(updatePendingAnnouncementFunc({ ...singleData[0], status: 1 }))
                .then((response) => response.payload.statusCode === 200 ? dispatch(postCreateAnnouncementFunc(singleData[0])) : null)
                .then((response) => response.payload.statusCode === 200 ? dispatch(deletePendingAnnouncementFunc(singleData[0].id)) : null)
                .then((response) => response.payload.statusCode === 200 ? window.location.reload() : null)

        };
    }

    const rejectAnnouncement = async () => {
        if (window.confirm("Do you want to reject this announcement? ")) {
            dispatch(updatePendingAnnouncementFunc({ ...singleData[0], status: 3 }))
                .then((response) => response.payload.statusCode === 200 ? dispatch(createRejectedAnnouncementFunc({...singleData[0], status: 3})) : null)
                .then((response) => response.payload.statusCode === 200 ? dispatch(deletePendingAnnouncementFunc(singleData[0].id)) : null)
                .then((response) => response.payload.statusCode === 200 ? window.location.reload() : null)

        };
    }

    return (

        <div>
            <div className='p-3 rounded-5 bg-light border mx-4 my-2'>
                <div className='d-flex justify-content-between'>
                    <div className='w-50'>
                        {
                            !singleData[0] || isLoading ?
                                <Placeholder animation="glow"><Placeholder xs={12} style={{ height: '400px' }} /></Placeholder> : <div className='mb-2 rounded-4 myBgImgContain' style={{ backgroundImage: `url("http://localhost:5050/uploads/${singleData[0].pics}")` }}></div>
                        }
                    </div>

                    <div className='w-50 px-3'>

                        {
                            !singleData[0] || isLoading ?
                                <Placeholder animation="glow"><Placeholder xs={12} /></Placeholder> : <h1 className='fw-light'>{singleData[0].modelName}</h1>
                        }
                        {
                            !singleData[0] || isLoading ?
                                <Placeholder animation="glow"><Placeholder xs={4} /></Placeholder> :
                                <div className='d-flex gap-3'>
                                    <span>Qnt: {singleData[0].quantity}</span>
                                    <span className='fw-light'>Brand: {singleData[0].brandName}</span>
                                </div>
                        }
                        {
                            !singleData[0] || isLoading ?
                                <Placeholder animation="glow"><Placeholder xs={4} /></Placeholder> :
                                <div className='d-flex align-items-center gap-4'>
                                    <div className='d-flex align-items-top my-3'>
                                        <h2 className='fw-normal'>{singleData[0].price}</h2>
                                        <p className='fw-light'>00$</p>
                                    </div>
                                    <div className='d-flex align-items-top my-3 px-3 py-1 rounded-5 myBgWhite'>
                                        <h2 className='fw-normal'>{(Math.round((singleData[0].price) / (singleData[0].quantity) * 100) / 100).toString().split(".")[0]}</h2>
                                        <p className='fw-light'>{(Math.round((singleData[0].price) / (singleData[0].quantity) * 100) / 100).toString().split(".")[1]}$</p>
                                        <h4 className='fw-light'>/item</h4>
                                    </div>
                                </div>
                        }
                        {
                            !singleData[0] || isLoading ?
                                <Placeholder animation="glow"><Placeholder xs={6} /></Placeholder> :
                                <div className='mb-5'>
                                    <span className='bg-success text-light p-1 px-2 rounded-5'>{singleData[0].category}</span>
                                </div>
                        }
                    </div>
                </div>

                <div>
                    {
                        !singleData[0] || isLoading ?
                            <Placeholder animation="glow"><Placeholder xs={12} /></Placeholder> :
                            <div>
                                <hr />
                                <h5 className='mb-1 fw-normal'>Description</h5>
                                <h5 className='fw-light'>{singleData[0].description}</h5>
                            </div>
                    }
                    {
                        !singleData[0] || isLoading ?
                            <Placeholder animation="glow"><Placeholder xs={12} /></Placeholder> :
                            <div className='mt-5'>
                                <hr />
                                <h5 className='fw-normal'> Technical detail</h5>
                                <p>{singleData[0].techDetail}</p>
                            </div>
                    }
                </div>

                <div className='mb-5 mt-4 d-flex justify-content-center gap-5'>
                    {!singleData[0] || isLoading ? <Placeholder.Button xs={4} aria-hidden="true" /> : <Button variant="danger" onClick={rejectAnnouncement}>Reject</Button>}
                    {!singleData[0] || isLoading ? <Placeholder.Button xs={4} aria-hidden="true" /> : <Button variant="success" onClick={approveAnnouncement}>Approve</Button>}
                </div>
            </div>


        </div>

    )
}

export default CardPendingAnnouncement