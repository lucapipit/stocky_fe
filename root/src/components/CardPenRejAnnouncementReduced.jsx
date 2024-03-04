
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

        <div>
            <div className='p-3 rounded-5 mx-4 my-2 ' style={{border: `2px solid ${singleData.status===3?"red":singleData.status===0?"lightgray":"yellowgreen"}`}} onClick={()=>setMinimize(!minimize)}>
                <div className='d-flex flex-wrap justify-content-between'>
                    <div className='w-100' style={{minWidth: "350px"}}>
                        {
                            !singleData || isLoading ?
                                <Placeholder animation="glow"><Placeholder xs={12} style={{ height: `${minimize?"200px":"400px"}` }} /></Placeholder> : <div className='mb-2 rounded-4 myBgImgContain' style={{height: `${minimize?"200px":"400px"}`, backgroundImage: `url("http://localhost:5050/uploads/${singleData.pics}")` }}></div>
                        }
                    </div>

                    <div className='px-3' style={{minWidth: "350px"}}>

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
                                        <h2 className='fw-normal'>{singleData.price}</h2>
                                        <p className='fw-light'>00$</p>
                                    </div>
                                    <div className='d-flex align-items-top my-3 px-3 py-1 rounded-5 myBgWhite'>
                                        <h2 className='fw-normal'>{(Math.round((singleData.price) / (singleData.quantity) * 100) / 100).toString().split(".")}</h2>
                                        <p className='fw-light'>{(Math.round((singleData.price) / (singleData.quantity) * 100) / 100).toString().split(".")[1]}$</p>
                                        <h4 className='fw-light'>/item</h4>
                                    </div>
                                </div>
                        }
                        {
                            !singleData || isLoading ?
                                <Placeholder animation="glow"><Placeholder xs={6} /></Placeholder> :
                                <div className='mb-5'>
                                    <span className='bg-success text-light p-1 px-2 rounded-5'>{singleData.category}</span>
                                </div>
                        }
                        {
                            !singleData || isLoading ?
                                <Placeholder animation="glow"><Placeholder xs={6} /></Placeholder> :
                                <div className='mb-5'>
                                    <span className='p-1 px-2'>{singleData.status===0?<i className='display-6'><Spinner animation="grow" /> on approval</i>:singleData.status===1?<i className="bi bi-check-circle text-success display-6"> approved</i>:<i className="bi bi-ban text-danger display-6"> denied</i>}</span>
                                </div>
                        }
                        
                    </div>
                </div>

                {minimize ?
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
                    </div>}

            </div>


        </div>

    )
}

export default CardPenRejAnnouncementReduced