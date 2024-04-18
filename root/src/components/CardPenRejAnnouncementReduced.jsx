import { React, useEffect, useState } from 'react';
import Placeholder from 'react-bootstrap/Placeholder';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import CardPenRejAnnouncementReducedForm from './CardPenRejAnnouncementReducedForm';
import { setIsPenRejModalEditing } from '../states/generalState';
import productCategories from '../assets/JSON/productCategories.json';


const CardPenRejAnnouncementReduced = ({ singleData, isLoading }) => {

    const dispatch = useDispatch();


    const [minimize, setMinimize] = useState(true);
    const [imgSelectionCounter, setImgSelectionCounter] = useState(0);
    const [category, setCategory] = useState(singleData.category)

    //loading states
    const isDeletingPics = useSelector((state) => state.uploadFile.isDeletingPics);
    const isUpdating = useSelector((state) => state.myStore.isLoading);

    //open and keep edit modal open state. 
    const isPenRejModalEditing = useSelector((state) => state.general.isPenRejModalEditing);


    return (
        <>

            {
                isPenRejModalEditing.value && isPenRejModalEditing.id === singleData.id || localStorage.getItem("editId") == singleData.id ?


                    <div className='position-fixed mt-5 myZindex2 d-flex justify-content-center top-0'>
                        {
                            isDeletingPics || isUpdating ?
                                <div className='position-absolute myZindex2 myBgTransparentHigh rounded-3 w-100 h-100 border d-flex align-items-center justify-content-center '>
                                    {/* My Loading Overlay */}
                                    {isLoading ? <Spinner animation="grow" /> : null}
                                </div>
                                : null
                        }

                        <div className='p-5 myMainGradient text-center myOverflowY' style={{ height: "100vh" }}>
                            <CardPenRejAnnouncementReducedForm singleData={singleData} />
                        </div>

                    </div>

                    : <div className="m-2 border myMaxW800" >

                        <div style={{ borderLeft: `3px solid ${singleData.status === 3 ? "red" : singleData.status === 0 ? "lightgray" : "yellowgreen"}` }}>

                            <div className={`${minimize ? "myFade" : "position-relative"} p-3`}>

                                <div className='d-flex gap-4'>

                                    {
                                        singleData.status !== 1 ?
                                            <div className='position-absolute editPencil myCursor' onClick={() => { document.body.style.overflow = 'hidden'; dispatch(setIsPenRejModalEditing({ value: true, id: singleData.id })) }}>
                                                <i className="bi bi-pencil-fill text-secondary"></i>
                                            </div>
                                            : null
                                    }

                                    <div >
                                        {
                                            !singleData || isLoading ?
                                                <Placeholder animation="glow"><Placeholder xs={12} style={{ height: `${minimize ? "200px" : "400px"}` }} /></Placeholder>
                                                :
                                                <div className={`myBgImgContain imgGalleryMain me-1 myCursor`}
                                                    style={{ backgroundImage: `url(http://localhost:5050/uploads/${singleData.pics.split(",")[imgSelectionCounter]})` }}
                                                ></div>

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
                                                <div className='d-flex flex-wrap align-items-center gap-2 py-2'>
                                                    <div className='d-flex align-items-top '>
                                                        <h2 className='fw-normal'>{singleData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h2>
                                                        <p className='fw-light m-0'>00$</p>
                                                    </div>
                                                    <div className='d-flex align-items-top rounded-5 myBgWhite'>
                                                        <h2 className='fw-normal'>{(Math.floor((singleData.price) / (singleData.quantity))).toString().split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h2>
                                                        <p className='fw-light m-0 me-1'>{(Math.round((singleData.price) / (singleData.quantity) * 100) / 100).toString().split(".")[1]}</p>
                                                        <h4 className='fw-light'>$/item</h4>
                                                    </div>
                                                </div>
                                        }
                                        {
                                            !singleData || isLoading ?
                                                <Placeholder animation="glow"><Placeholder xs={6} /></Placeholder> :
                                                <div className='mb-2 d-flex flex-wrap align-items-center'>
                                                    <h5 className='m-0'><i className="bi bi-eye-fill "></i> {singleData.views}</h5>
                                                </div>
                                        }
                                        <div className='my-3 d-flex flex-wrap align-items-center'>
                                            {
                                                singleData.category && singleData.category.split(",").map((el) => {
                                                    return (
                                                        <div>
                                                            {productCategories.map((item) => {
                                                                if (item.id === +el) {
                                                                    return <span className={`p-1 ${minimize ? "myFontSize5 px-2" : "px-3"} text-light px-2 m-1 ms-0 rounded-5 d-flex align-iems-center ${item.area == "dental" ? "myBgAcqua" : "myBgRed"}`} > {minimize ? item.code : item.eng} </span>
                                                                }
                                                            })}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
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

                                <div className='mb-4 mt-3 text-start'>
                                    {
                                        !singleData || isLoading ?
                                            <Placeholder animation="glow"><Placeholder xs={6} /></Placeholder> :
                                            <div className={`${minimize ? "line-clamp2" : ""} mt-4`}>
                                                <span className='p-1 px-2'>{singleData.status === 0 ? <i><Spinner animation="grow" size="sm" /> on approval</i> : singleData.status === 1 ? <i className="bi bi-check-circle-fill text-success"> approved</i> : <i className="bi bi-ban text-danger"> denied:</i>}</span>
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

                                            {
                                                !singleData || isLoading ?
                                                    <Placeholder animation="glow"><Placeholder xs={12} /></Placeholder> :
                                                    <div className='my-5'>
                                                        <hr />
                                                        <div className='d-flex flex-wrap'>
                                                            <span className='border border-primary me-2 px-3 py-2 rounded-5 text-primary'>Created at: <i className='fw-bold'>{singleData.dataIns.split("T")[0]}</i></span>
                                                            <span className='border border-info px-3 me-2 py-2 rounded-5 text-info'><i class="bi bi-pencil-fill me-2"></i> <i className='fw-bold'>{singleData.dataMod.split("T")[0]}</i></span>
                                                            {singleData.dataApproved ? <span className='border border-success px-3 py-2 rounded-5 text-success'><i className="bi bi-check-circle-fill me-2"></i> <i className='fw-bold'>{singleData.dataApproved.split("T")[0]}</i></span> : null}
                                                            {singleData.dataRejected ? <span className='border border-danger px-3 py-2 rounded-5 text-danger'><i className="bi bi-ban me-2"></i> <i className='fw-bold'>{singleData.dataRejected.split("T")[0]}</i></span> : null}
                                                        </div>
                                                    </div>
                                            }

                                        </div>
                                }



                            </div>

                        </div>
                    </div >
            }

        </>

    )
}

export default CardPenRejAnnouncementReduced