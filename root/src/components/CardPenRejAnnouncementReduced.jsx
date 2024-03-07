import { React, useEffect, useState } from 'react';
import Placeholder from 'react-bootstrap/Placeholder';
import { useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import CardPenRejAnnouncementReducedForm from './CardPenRejAnnouncementReducedForm';


const CardPenRejAnnouncementReduced = ({ singleData, isLoading }) => {

    const dispatch = useDispatch();

    const [minimize, setMinimize] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        console.log(singleData, isLoading);
    }, [])

    return (
        <>

            {/* rejection modal */}
            {
                isEditing ?
                    <div className='w-100 p-5 position-absolute d-flex justify-content-center top-50' style={{ zIndex: "2" }}>
                        <div className='myMaxW1200 w-100 p-5 bg-secondary rounded-3 text-center'>
                            <h1 className='text-light text-center mb-4 fw-light'>Reasons of rejection</h1>
                            <CardPenRejAnnouncementReducedForm singleData={singleData} />
                            <i className="bi bi-arrow-return-left text-light display-6 myCursor ms-3" onClick={() => setIsEditing(false)}> Cancel</i>
                        </div>
                    </div>

                    : <div className="m-2 myCursor border myMaxW800" onClick={() => setMinimize(!minimize)}>

                        <div className='' style={{ borderLeft: `3px solid ${singleData.status === 3 ? "red" : singleData.status === 0 ? "lightgray" : "yellowgreen"}` }}>

                            <div className={`${minimize ? "myFade" : "position-relative"} p-3`}>

                                <div className='d-flex gap-4'>

                                    {
                                        singleData.status !== 1 ?
                                            <div className='position-absolute editPencil' onClick={() => setIsEditing(true)}>
                                                <i className="bi bi-pencil-fill text-secondary"></i>
                                            </div>
                                            : null
                                    }

                                    <div >
                                        {
                                            !singleData || isLoading ?
                                                <Placeholder animation="glow"><Placeholder xs={12} style={{ height: `${minimize ? "200px" : "400px"}` }} /></Placeholder>
                                                : <div className='d-flex align-items-center' style={{ height: `${minimize ? "250px" : "100%"}`, overflowY: "hidden" }}><img className='myMaxW300' src={`http://localhost:5050/uploads/${singleData.pics}`} alt="" /></div>
                                        }
                                    </div>

                                    <div className='px-3' >

                                        {
                                            !singleData || isLoading ?
                                                <Placeholder animation="glow"><Placeholder xs={12} /></Placeholder> : <div className={`${minimize ? "line-clamp1" : ""} py-2 pe-5`}><h1 className='fw-light'>{singleData.modelName}</h1></div>
                                        }
                                        {
                                            !singleData || isLoading ?
                                                <Placeholder animation="glow"><Placeholder xs={4} /></Placeholder> :
                                                <div className='d-flex align-items-center gap-3'>
                                                    <div className='d-flex align-items-center'>
                                                        <h6 className='m-0 me-1'>Qnt:</h6>
                                                        <span>{singleData.quantity}</span>
                                                    </div>
                                                    <div className='d-flex align-items-center'>
                                                        <h6 className='m-0 me-1'>Brand:</h6>
                                                        <span>{singleData.brandName}</span>
                                                    </div>
                                                </div>
                                        }
                                        {
                                            !singleData || isLoading ?
                                                <Placeholder animation="glow"><Placeholder xs={4} /></Placeholder> :
                                                <div className='d-flex flex-wrap align-items-center gap-1'>
                                                    <div className='d-flex align-items-top my-3'>
                                                        <h2 className='fw-normal'>{singleData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h2>
                                                        <p className='fw-light'>00$</p>
                                                    </div>
                                                    <div className='d-flex align-items-top px-3 py-1 rounded-5 myBgWhite'>
                                                        <h2 className='fw-normal'>{(Math.floor((singleData.price) / (singleData.quantity))).toString().split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h2>
                                                        <p className='fw-light me-1'>{(Math.round((singleData.price) / (singleData.quantity) * 100) / 100).toString().split(".")[1]}</p>
                                                        <h4 className='fw-light'>$/item</h4>
                                                    </div>
                                                </div>
                                        }
                                        {
                                            !singleData || isLoading ?
                                                <Placeholder animation="glow"><Placeholder xs={6} /></Placeholder> :
                                                <div className='mb-5 mt-2 d-flex flex-wrap align-items-center gap-4'>
                                                    <div className='bg-secondary text-light p-1 px-3 rounded-5'>{singleData.category}</div>
                                                    <h5 className='m-0'><i class="bi bi-eye-fill "></i> {singleData.views}</h5>
                                                </div>
                                        }
                                    </div>


                                </div>

                                <div className='mb-4 mt-3 text-center'>
                                    {
                                        !singleData || isLoading ?
                                            <Placeholder animation="glow"><Placeholder xs={6} /></Placeholder> :
                                            <div className={`${minimize ? "line-clamp2" : ""}`}>
                                                <span className='p-1 px-2'>{singleData.status === 0 ? <i className='display-6'><Spinner animation="grow" /> on approval</i> : singleData.status === 1 ? <i className="bi bi-check-circle text-success display-6"> approved</i> : <i className="bi bi-ban text-danger display-6"> denied</i>}</span>
                                                <p className='text-danger px-3'>{singleData.rejReasons}</p>
                                            </div>
                                    }

                                </div>

                                {
                                    minimize ?
                                        <div className=' minimizeArrow'>
                                            <i class="bi bi-caret-down-fill text-secondary"></i>
                                        </div>
                                        : null
                                }

                                {
                                    minimize ?
                                        null :
                                        <div>
                                            {
                                                !singleData || isLoading ?
                                                    <Placeholder animation="glow"><Placeholder xs={12} /></Placeholder> :
                                                    <div>
                                                        <hr />
                                                        <h5 className='mb-1 fw-normal'>Description</h5>
                                                        <h5 className='fw-light'>{singleData.description}</h5>
                                                    </div>
                                            }
                                            {
                                                !singleData || isLoading ?
                                                    <Placeholder animation="glow"><Placeholder xs={12} /></Placeholder> :
                                                    <div className='mt-5'>
                                                        <hr />
                                                        <h5 className='fw-normal'> Technical detail</h5>
                                                        <p>{singleData.techDetail}</p>
                                                    </div>
                                            }
                                        </div>
                                }



                            </div>

                        </div>
                    </div>
            }

        </>

    )
}

export default CardPenRejAnnouncementReduced