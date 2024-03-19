import { React, useEffect, useState } from 'react';
import Placeholder from 'react-bootstrap/Placeholder';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import CardPenRejAnnouncementReducedForm from './CardPenRejAnnouncementReducedForm';


const CardPenRejAnnouncementReduced = ({ singleData, isLoading }) => {

    const dispatch = useDispatch();

    const [minimize, setMinimize] = useState(true);
    const [isEditing, setIsEditing] = useState(localStorage.getItem("editId") == singleData.id ? true : false);
    const [imgSelectionCounter, setImgSelectionCounter] = useState(0);

    //loading states
    const isDeletingPics = useSelector((state) => state.uploadFile.isDeletingPics);
    const isUpdating = useSelector((state) => state.myStore.isLoading);

    return (
        <>

            {/* rejection modal */}
            {
                isEditing ?

                    <div className='position-absolute myZindex2 d-flex justify-content-center top-0 '>
                        {
                            isDeletingPics || isUpdating ?
                                <div className='position-absolute myZindex2 myBgTransparentHigh rounded-3 w-100 h-100 border d-flex align-items-center justify-content-center '>
                                    {/* My Loading Overlay */}
                                    {isLoading ? <Spinner animation="grow" /> : null}
                                </div>
                                : null
                        }
                        <div className='p-5 myMainGradient  rounded-3 text-center'>
                            <CardPenRejAnnouncementReducedForm singleData={singleData} />
                            <i className="bi bi-arrow-return-left text-light display-6 myCursor ms-3" onClick={() => { setIsEditing(false); localStorage.removeItem("editId") }}> Cancel</i>
                        </div>
                    </div>


                    : <div className="m-2 border myMaxW800" >

                        <div className='' style={{ borderLeft: `3px solid ${singleData.status === 3 ? "red" : singleData.status === 0 ? "lightgray" : "yellowgreen"}` }}>

                            <div className={`${minimize ? "myFade" : "position-relative"} p-3`}>

                                <div className='d-flex gap-4'>

                                    {
                                        singleData.status !== 1 ?
                                            <div className='position-absolute editPencil myCursor' onClick={() => setIsEditing(true)}>
                                                <i className="bi bi-pencil-fill text-secondary"></i>
                                            </div>
                                            : null
                                    }

                                    <div >
                                        {
                                            !singleData || isLoading ?
                                                <Placeholder animation="glow"><Placeholder xs={12} style={{ height: `${minimize ? "200px" : "400px"}` }} /></Placeholder>
                                                :
                                                <div className='myMaxW300'>
                                                    <div className='d-flex align-items-center' style={{ height: `${minimize ? "250px" : "100%"}`, overflowY: "hidden" }}>
                                                        <img className='myMaxW300' src={`http://localhost:5050/uploads/${singleData.pics.split(",")[imgSelectionCounter]}`} alt="" />
                                                    </div>
                                                </div>
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
                                                    <h5 className='m-0'><i className="bi bi-eye-fill "></i> {singleData.views}</h5>
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
                                                    singleData.pics.split(",").map((el, index) => {
                                                        return (
                                                            <div className={`myBgImgCover imgGalleryCarousel me-1 myCursor ${index === imgSelectionCounter ? "imgGalleryCarouselActive" : ""}`}
                                                                onClick={() => setImgSelectionCounter(index)}
                                                                style={{ backgroundImage: `url(http://localhost:5050/uploads/${singleData.pics.split(",")[index]})` }}
                                                            ></div>
                                                        )

                                                    })
                                                }
                                            </div>
                                    }
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


                                <div className='myCursor minimizeArrow' onClick={() => setMinimize(!minimize)}>
                                    <i className={`bi bi-caret-${minimize ? "down" : "up"}-fill text-secondary`}></i>
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
                                                    <div className='my-5'>
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