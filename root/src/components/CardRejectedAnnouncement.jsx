
import { React, useEffect, useState } from 'react';
import Placeholder from 'react-bootstrap/Placeholder';
import { useDispatch } from 'react-redux';



const CardRejectedAnnouncement = ({ singleData, isLoading }) => {

    const dispatch = useDispatch();
    const [minimize, setMinimize] = useState(true);


    return (

        <div className='border mx-4 my-2 myCursor' onClick={() => setMinimize(!minimize)}>

            <div style={{ borderLeft: "3px solid red" }}>

                <div className={`${minimize ? "myFade" : ""} p-3`}>

                    <div className='d-flex flex-wrap gap-4'>

                        <div>
                            {
                                !singleData[0] || isLoading ?
                                    <Placeholder animation="glow"><Placeholder xs={12} style={{ height: '400px' }} /></Placeholder> : <div className='d-flex align-items-center' style={{ height: `${minimize ? "250px" : "100%"}`, overflowY: "hidden" }}><img className='myMaxW300' src={`http://localhost:5050/uploads/${singleData[0].pics}`} alt="" /></div>
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
                                    <div className='mb-5'>
                                        <span className='bg-secondary text-light p-2 px-3 rounded-5'>{singleData[0].category}</span>
                                    </div>
                            }

                        </div>


                    </div>

                    <div className='mt-3 pt-1'>
                        <p className='text-danger'><i className="bi bi-ban text-danger display-6 me-4"></i>{singleData[0].rejReasons}</p>
                    </div>

                    {/* sistema di frecce per espandere la card. Da capire perchè funziona solo con due div */}
                    <div className='myCursor minimizeArrow' onClick={() => setMinimize(!minimize)}>
                        <i className={`bi bi-caret-${minimize ? "down" : "up"}-fill text-secondary`}></i>
                    </div>




                    {
                        minimize ?
                            null
                            : <div>
                                {
                                    !singleData[0] || isLoading ?
                                        <Placeholder animation="glow"><Placeholder xs={12} /></Placeholder>
                                        : <div className={`${minimize ? "line-clamp1" : ""} py-2`}>
                                            <h4 className='fw-light d-flex flex-wrap gap-1'>
                                                <h4 className={`${singleData[0].manufacturer ? "text-info" : "text-success"} me-3`}><i className="bi bi-person-vcard-fill me-2"></i>{singleData[0].manufacturer ? "Manufacturer" : "Dealer"}</h4>
                                                <i className="bi bi-buildings me-3"> {singleData[0].companyName}</i>
                                                <i className="bi bi-at me-3"> {singleData[0].email}</i>
                                                <i className="bi bi-globe-americas me-3"> {singleData[0].country}</i>
                                                <i className="bi bi-geo me-3"> {singleData[0].address} - {singleData[0].zipCode}</i>
                                            </h4>
                                        </div>
                                }
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
                    }

                    {/* sistema di frecce per espandere la card. Da capire perchè funziona solo con due div */}
                    <div className='myCursor text-center' style={{ fontSize: "2rem" }} onClick={() => setMinimize(!minimize)}>
                        <i className={`bi bi-caret-${minimize ? "down" : "up"}-fill text-secondary`}></i>
                    </div>

                </div>


            </div>

        </div>

    )
}

export default CardRejectedAnnouncement