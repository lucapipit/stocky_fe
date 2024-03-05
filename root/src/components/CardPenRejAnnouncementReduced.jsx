
import { React, useEffect, useState } from 'react';
import Placeholder from 'react-bootstrap/Placeholder';
import { useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';


const CardPenRejAnnouncementReduced = ({ singleData, isLoading }) => {

    const dispatch = useDispatch();

    const [minimize, setMinimize] = useState(true);

    useEffect(() => {
        console.log(singleData, isLoading);
    }, [])

    return (


        <div className='m-2 myCursor border myMaxW700' onClick={() => setMinimize(!minimize)}>

            <div className='p-3' style={{ borderLeft: `3px solid ${singleData.status === 3 ? "red" : singleData.status === 0 ? "lightgray" : "yellowgreen"}` }}>

                <div className='d-flex gap-4'>

                    <div >
                        {
                            !singleData || isLoading ?
                                <Placeholder animation="glow"><Placeholder xs={12} style={{ height: `${minimize ? "200px" : "400px"}` }} /></Placeholder>
                                : <img className='myMaxW300' src={`http://localhost:5050/uploads/${singleData.pics}`} alt="" />
                        }
                    </div>

                    <div className='px-3' >

                        {
                            !singleData || isLoading ?
                                <Placeholder animation="glow"><Placeholder xs={12} /></Placeholder> : <h1 className='fw-light'>{singleData.modelName}</h1>
                        }
                        {
                            !singleData || isLoading ?
                                <Placeholder animation="glow"><Placeholder xs={4} /></Placeholder> :
                                <div className='d-flex gap-3'>
                                    <span>Qnt: {singleData.quantity}</span>
                                    <span className='fw-light'>Brand: {singleData.brandName}</span>
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
                            <div>
                                <span className='p-1 px-2'>{singleData.status === 0 ? <i className='display-6'><Spinner animation="grow" /> on approval</i> : singleData.status === 1 ? <i className="bi bi-check-circle text-success display-6"> approved</i> : <i className="bi bi-ban text-danger display-6"> denied</i>}</span>
                                <p className='text-danger'>{singleData.rejReasons}</p>
                            </div>
                    }
                   
                </div>

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



    )
}

export default CardPenRejAnnouncementReduced