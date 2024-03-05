
import { React, useState } from 'react';
import Placeholder from 'react-bootstrap/Placeholder';
import { postCreateAnnouncementFunc } from '../states/storeState';
import { updatePendingAnnouncementFunc, deletePendingAnnouncementFunc } from '../states/pendingAnnState';
import { createRejectedAnnouncementFunc } from '../states/rejectedAnnState';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Form from 'react-bootstrap/Form';


const CardPendingAnnouncement = ({ singleData, isLoading }) => {

    const dispatch = useDispatch();
    const [isRejecting, setIsRejecting] = useState(false);
    const [rejectionReasons, setRejectionReasons] = useState("");
    const [minimize, setMinimize] = useState(true);

    const approveAnnouncement = async () => {
        if (window.confirm("Do you want to approve this announcement? ")) {
            dispatch(postCreateAnnouncementFunc({ ...singleData[0], status: 1 }))
                .then((response) => response.payload.statusCode === 200 ? dispatch(deletePendingAnnouncementFunc(singleData[0].id)) : null)
                .then((response) => response.payload.statusCode === 200 ? window.location.reload() : null)

        };
    }

    const rejectAnnouncement = async () => {
        if (window.confirm("Do you want to reject this announcement? ")) {
            console.log({ ...singleData[0], status: 3, rejReasons: rejectionReasons });
            dispatch(createRejectedAnnouncementFunc({ ...singleData[0], status: 3, rejReasons: rejectionReasons.replace("\'", "\\'" ) }))
                .then((response) => response.payload.statusCode === 200 ? dispatch(deletePendingAnnouncementFunc(singleData[0].id)) : null)
                .then((response) => response.payload.statusCode === 200 ? window.location.reload() : null)

        };
    }

    return (

        <>
            {/* rejection modal */}
            {
                isRejecting ?
                    <div className='w-100 p-5 position-absolute d-flex justify-content-center align-items-centerborder'>
                        <div className='myMaxW1000 w-100 p-5 bg-dark rounded-4'>
                            <h1 className='text-light text-center mb-4 fw-light'>Reasons of rejection</h1>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" rows={10} onChange={(e) => setRejectionReasons(e.target.value)} />
                            </Form.Group>
                            <div className='d-flex justify-content-center gap-5'>
                                <i className="bi bi-ban text-danger display-6 myCursor" onClick={rejectAnnouncement}> Reject</i>
                                <i className="bi bi-arrow-return-left text-secondary display-6 myCursor" onClick={() => setIsRejecting(false)}> Cancel</i><i class="bi bi-arrow-return-left"></i>
                            </div>
                        </div>
                    </div>
                    : null
            }

            <div className='p-3 bg-light border mx-4 my-3 myCursor' onClick={()=>setMinimize(!minimize)}>

                <div className='d-flex gap-4'>
                    <div>
                        {
                            !singleData[0] || isLoading ?
                                <Placeholder animation="glow"><Placeholder xs={12} style={{ height: '400px' }} /></Placeholder> : <img className='myMaxW300 myMaxH300' src={`http://localhost:5050/uploads/${singleData[0].pics}`} alt="" />
                        }
                    </div>

                    <div className='px-3'>

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
                                        <h2 className='fw-normal'>{singleData[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h2>
                                        <p className='fw-light'>00$</p>
                                    </div>
                                    <div className='d-flex align-items-top my-3 px-3 py-1 rounded-5 myBgWhite'>
                                        <h2 className='fw-normal'>{(Math.floor((singleData[0].price) / (singleData[0].quantity))).toString().split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h2>
                                        <p className='fw-light'>{(Math.round((singleData[0].price) / (singleData[0].quantity) * 100) / 100).toString().split(".")[1]}$</p>
                                        <h4 className='fw-light'>/item</h4>
                                    </div>
                                </div>
                        }
                        {
                            !singleData[0] || isLoading ?
                                <Placeholder animation="glow"><Placeholder xs={6} /></Placeholder> :
                                <div className='mb-2'>
                                    <span className='bg-success text-light p-1 px-2 rounded-5'>{singleData[0].category}</span>
                                </div>
                        }
                    </div>
                </div>

                {minimize ?
                    null
                    : <>
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
                            {!singleData[0] || isLoading ? <Placeholder.Button xs={4} aria-hidden="true" /> : <i className="bi bi-check-circle text-success display-6 myCursor" onClick={approveAnnouncement}> Approve</i>}
                            {!singleData[0] || isLoading ? <Placeholder.Button xs={4} aria-hidden="true" /> : <i className="bi bi-ban text-danger display-6 myCursor" onClick={() => setIsRejecting(true)}> Reject</i>}
                        </div>
                    </>
                }

            </div>
        </>

    )
}

export default CardPendingAnnouncement