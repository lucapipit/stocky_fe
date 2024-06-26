
import { React, useEffect, useState } from 'react';
import Placeholder from 'react-bootstrap/Placeholder';
import { updateAnnouncementFunc } from '../states/storeState';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import productCategories from '../assets/JSON/productCategories.json';


const CardPendingAnnouncement = ({ singleData, isLoading }) => {

    const dispatch = useDispatch();
    const [isRejecting, setIsRejecting] = useState(false);
    const [rejectionReasons, setRejectionReasons] = useState("");
    const [minimize, setMinimize] = useState(true);
    const [imgSelectionCounter, setImgSelectionCounter] = useState(0);

    const approveAnnouncement = async () => {
        if (window.confirm("Do you want to approve this announcement? ")) {
            dispatch(updateAnnouncementFunc({ payload: { ...singleData[0], status: 1, dataApproved: new Date() }, token: localStorage.getItem("token") }))
                .then((response) => response.payload.statusCode === 200 ? window.location.reload() : null)
        };
    }

    const rejectAnnouncement = async () => {
        if (window.confirm("Do you want to reject this announcement? ")) {
            dispatch(updateAnnouncementFunc({ payload: { ...singleData[0], status: 3, rejReasons: rejectionReasons, dataRejected: new Date() }, token: localStorage.getItem("token") }))
                .then((response) => response.payload.statusCode === 200 ? window.location.reload() : null)
        };
    }


    return (

        <>
            {/* rejection modal */}
            {
                isRejecting ?
                    <div className='w-100 p-5 position-absolute d-flex justify-content-center align-items-center'>
                        <div className='myMaxW1000 w-100 p-5 bg-dark rounded-4'>
                            <h1 className='text-light text-center mb-4 fw-light'>Reasons of rejection</h1>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" rows={10} onChange={(e) => setRejectionReasons(e.target.value)} />
                            </Form.Group>
                            <div className='d-flex justify-content-center gap-5'>
                                <i className="bi bi-ban text-danger display-6 myCursor" onClick={rejectAnnouncement}> Reject</i>
                                <i className="bi bi-arrow-return-left text-secondary display-6 myCursor" onClick={() => setIsRejecting(false)}> Cancel</i>
                            </div>
                        </div>
                    </div>
                    : null
            }

            <div className=' bg-light border mx-4 my-3 myCursor'  >

                <div className='p-3' style={{ borderLeft: `3px solid ${singleData[0].status === 3 ? "red" : singleData[0].status === 0 ? "lightgray" : "yellowgreen"}` }}>

                    <div className='d-flex gap-4'>
                        <div>
                            {
                                !singleData[0] || isLoading ?
                                    <Placeholder animation="glow"><Placeholder xs={12} style={{ height: '400px' }} /></Placeholder> : <div className='d-flex align-items-center' style={{ height: `${minimize ? "250px" : "100%"}`, overflowY: "hidden" }}><img className='myMaxW300' src={`http://localhost:5050/uploads/${singleData[0].pics.split(",")[imgSelectionCounter]}`} alt="" /></div>
                            }
                        </div>

                        <div className='px-3'>

                            {
                                !singleData[0] || isLoading ?
                                    <Placeholder animation="glow"><Placeholder xs={12} /></Placeholder> : <div className={`${minimize ? "line-clamp1" : ""} py-2`}><h1 className='fw-light'>{singleData[0].modelName}</h1></div>
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

                            <div className='d-flex flex-wrap mb-3'>
                                {
                                    singleData[0].category && singleData[0].category.split(",").map((el) => {
                                        return (
                                            <div>
                                                {productCategories.map((item) => {
                                                    if (item.id === +el) {
                                                        return <span className={`text-light p-1 px-3 m-1 rounded-5 d-flex align-iems-center ${item.area == "dental" ? "myBgAcqua" : "myBgRed"}`}> {item.eng} </span>
                                                    }
                                                })}
                                            </div>
                                        )
                                    })
                                }
                            </div>

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


                        </div>
                    </div>

                    <div className='w-100'>
                        {
                            minimize ?
                                null
                                :
                                <div className='mt-1 d-flex align-items-center flex-wrap'>
                                    {
                                        singleData[0].pics.split(",").map((el, index) => {
                                            return (
                                                <div className={`myBgImgCover imgGalleryCarousel me-1 myCursor ${index === imgSelectionCounter ? "imgGalleryCarouselActive" : ""}`}
                                                    onClick={() => setImgSelectionCounter(index)}
                                                    style={{ backgroundImage: `url(http://localhost:5050/uploads/${singleData[0].pics.split(",")[index]})` }}
                                                ></div>
                                            )

                                        })
                                    }
                                </div>
                        }
                    </div>

                    {minimize ?
                        null
                        : <>
                            {
                                singleData[0].rejReasons ?
                                    <div className='mt-3 pt-1'>
                                        <p className='text-danger'><i className="bi bi-ban text-danger display-6 me-4"></i>{singleData[0].rejReasons}</p>
                                    </div>
                                    : null
                            }

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

                            <div className='mt-5'>
                                <hr />
                                <span className='border border-primary me-4 px-3 py-2 rounded-5 text-primary'>Created at: <i className='fw-bold'>{singleData[0].dataIns.split("T")[0]}</i></span>
                                <span className='border border-info px-3 py-2 rounded-5 text-info'>Last update at: <i className='fw-bold'>{singleData[0].dataMod.split("T")[0]}</i></span>

                            </div>

                            <div className='mb-5 mt-4 d-flex justify-content-center gap-5'>
                                {!singleData[0] || isLoading ? <Placeholder.Button xs={4} aria-hidden="true" /> : <i className="bi bi-check-circle text-success display-6 myCursor" onClick={approveAnnouncement}> Approve</i>}
                                {!singleData[0] || isLoading ? <Placeholder.Button xs={4} aria-hidden="true" /> : <i className="bi bi-ban text-danger display-6 myCursor" onClick={() => setIsRejecting(true)}> Reject</i>}
                            </div>

                        </>
                    }

                    <div className='myCursor text-center mt-2' style={{ fontSize: "2rem" }} onClick={() => setMinimize(!minimize)}>
                        <i className={`bi bi-caret-${minimize ? "down" : "up"}-fill text-secondary`}></i>
                    </div>

                </div>

            </div>
        </>

    )
}

export default CardPendingAnnouncement