import { React, useEffect, useState } from 'react';
import Placeholder from 'react-bootstrap/Placeholder';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import CardPenRejAnnouncementReducedForm from './CardPenRejAnnouncementReducedForm';
import { setIsPenRejModalEditing } from '../states/generalState';
import productCategories from '../assets/JSON/productCategories.json';
import "../styles/accountCardBody.css";
import { generateScore } from '../states/annScoreState';
import { goToMyChat } from '../states/chatState';



const CardPenRejAnnouncementReduced = ({ singleData, isLoading }) => {

    const dispatch = useDispatch();


    const [minimize, setMinimize] = useState(true);
    const [imgSelectionCounter, setImgSelectionCounter] = useState(0);
    const [category, setCategory] = useState(singleData.category);
    const [score, setScore] = useState(0);

    //loading states
    const isDeletingPics = useSelector((state) => state.uploadFile.isDeletingPics);
    const isUpdating = useSelector((state) => state.myStore.isLoading);

    //open and keep edit modal open state. 
    const isPenRejModalEditing = useSelector((state) => state.general.isPenRejModalEditing);

    //announcement score
    const finalScore = useSelector((state) => state.annScore.finalScore);

    useEffect(() => {
        dispatch(generateScore(singleData))
    }, [])

    useEffect(() => {
        finalScore && finalScore.map((el) => { if (singleData.id === el.id) { setScore(el.score) } })
    }, [finalScore])

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

                    : <div className="m-1 border myMaxW632" >

                        <div style={{ borderLeft: `3px solid ${singleData.status === 3 ? "red" : singleData.status === 0 ? "lightgray" : "yellowgreen"}` }}>

                            <div className={`${minimize ? "myFade" : "position-relative p-3"}`}>

                                {/* account card body. Css --> accountCardBody.css */}
                                <div className='accountCardBody d-flex gap-3'>

                                    <div className='d-flex align-items-center bg-light'>
                                        {
                                            !singleData || isLoading ?
                                                <Placeholder animation="glow"><Placeholder xs={12} style={{ height: `${minimize ? "200px" : "400px"}` }} /></Placeholder>
                                                :
                                                <div className={`${minimize ? "myBgImgCover2" : "myBgImgContain"} imgGalleryMain myCursor`}
                                                    style={{ backgroundImage: `url(http://localhost:5050/uploads/${singleData.pics.split(",")[imgSelectionCounter]})` }}
                                                ></div>

                                        }
                                    </div>


                                    <div className='mainInfo pt-1' >

                                        {
                                            !singleData || isLoading ?
                                                <Placeholder animation="glow"><Placeholder xs={12} /></Placeholder>
                                                : <div className={`${minimize ? "line-clamp1" : ""} py-2 pe-5`}><h4 className='fw-light'>{singleData.modelName}</h4></div>
                                        }
                                        {
                                            !singleData || isLoading ?
                                                <Placeholder animation="glow"><Placeholder xs={4} /></Placeholder> :
                                                <div className='d-flex align-items-center gap-3'>
                                                    <div className='d-flex'>
                                                        <h6 className='fw-light bg-dark text-light px-2 rounded-5'>{singleData.quantity} items</h6>
                                                    </div>
                                                    <div className='d-flex align-items-center brandName'>
                                                        <p className='m-0 fw-bold myPrimaryColor'>{singleData.brandName}</p>
                                                    </div>
                                                </div>
                                        }
                                        {
                                            !singleData || isLoading ?
                                                <Placeholder animation="glow"><Placeholder xs={4} /></Placeholder> :
                                                <div className='d-flex flex-wrap align-items-center gap-2 py-1'>
                                                    <div className='d-flex align-items-top '>
                                                        <h3 className='fw-normal'>{singleData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h3>
                                                        <p className='fw-light m-0'>00$</p>
                                                    </div>
                                                    <div className='d-flex align-items-top rounded-5 myBgWhite'>
                                                        <h3 className='fw-normal'>{(Math.floor((singleData.price) / (singleData.quantity))).toString().split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h3>
                                                        <p className='fw-light m-0 me-1'>{(Math.round((singleData.price) / (singleData.quantity) * 100) / 100).toString().split(".")[1]}</p>
                                                        <p className='fw-light m-0'>$/item</p>
                                                    </div>
                                                </div>
                                        }
                                        {
                                            !singleData || isLoading ?
                                                null :
                                                <div className='w-100 d-flex align-items-center mb-2'>
                                                    <div className='m-0 border w-100 rounded-5' style={{ height: "6px" }}>
                                                        <div className={`scoreBarLow rounded-5 h-100 ${score > 91 ? "scoreBarLegend" : score > 79 ? "scoreBarHigh" : score > 59 ? "scoreBarMedium" : null}`} style={{ width: `${score}%` }}></div>
                                                    </div>
                                                    <h6 className='ms-2'>{score / 10}</h6>
                                                </div>
                                        }
                                        {
                                            !singleData || isLoading ?
                                                <Placeholder animation="glow"><Placeholder xs={6} /></Placeholder> :
                                                <div className='mb-2 d-flex flex-wrap justify-content-end gap-3 align-items-center'>
                                                    <h6 className='m-0'><i className="bi bi-eye-fill"></i> {singleData.views}</h6>
                                                    <h6 className='m-0 myFucsiaRed'><i className="bi bi-suit-heart-fill" ></i> {singleData.posClick}</h6>
                                                    <h6 className='m-0'><i className="bi bi-chat-dots-fill text-secondary myCursor" onClick={() => dispatch(goToMyChat({ typeSubMenu: 2 }))}></i> </h6>
                                                </div>
                                        }
                                    </div>

                                    {
                                        singleData.status !== 1 ?
                                            <div className='position-relative'>
                                                <div className='position-absolute editPencil rounded-5 myCursor' onClick={() => { document.body.style.overflow = 'hidden'; dispatch(setIsPenRejModalEditing({ value: true, id: singleData.id })) }}>
                                                    <i className="bi bi-pencil-fill text-secondary"></i>
                                                </div>
                                            </div>
                                            : <div></div>
                                    }

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

                                <div className='w-100'>
                                    {
                                        !minimize ?
                                            <div className='my-3 d-flex flex-wrap align-items-center'>
                                                {
                                                    singleData.category && singleData.category.split(",").map((el) => {
                                                        return (
                                                            <div>
                                                                {productCategories.map((item) => {
                                                                    if (item.id === +el) {
                                                                        return <span className={`p-1 categoryTag px-3 text-light m-1 ms-0 rounded-5 d-flex align-iems-center ${item.area == "dental" ? "myBgAcqua" : "myBgRed"}`} > {minimize ? item.code : item.eng} </span>
                                                                    }
                                                                })}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            : null
                                    }
                                </div>


                                {
                                    minimize ?
                                        null :
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
                                                    <div className='my-5'>
                                                        <hr />
                                                        <h5 className='fw-normal'> Technical detail</h5>
                                                        <ul className='mt-3'>
                                                            {singleData.techDetail && singleData.techDetail.split(",").map((el) => {
                                                                return <li>{el.split("£")[1]}</li>
                                                            })}
                                                        </ul>
                                                    </div>
                                            }

                                            {
                                                !singleData || isLoading ?
                                                    <Placeholder animation="glow"><Placeholder xs={12} /></Placeholder> :
                                                    <div className='my-5'>
                                                        <hr />
                                                        <div className='d-flex gap-2 flex-wrap myFontSize12px'>
                                                            <span className='px-3 py-1 text-dark'>Created at: <i className='fw-bold'>{singleData.dataIns.split("T")[0]}</i></span>
                                                            <span className='px-3 py-1 text-dark'><i class="bi bi-pencil-fill me-2"></i> <i className='fw-bold'>{singleData.dataMod.split("T")[0]}</i></span>
                                                            {singleData.dataApproved ? <span className='px-3 py-1 text-dark'><i className="bi bi-check-circle-fill me-2 text-success"></i> <i className='fw-bold'>{singleData.dataApproved.split("T")[0]}</i></span> : null}
                                                            {singleData.dataRejected ? <span className='px-3 py-1 text-dark'><i className="bi bi-ban me-2 text-danger"></i> <i className='fw-bold'>{singleData.dataRejected.split("T")[0]}</i></span> : null}
                                                        </div>
                                                    </div>
                                            }

                                        </div>
                                }

                                <div className='position-relative'>
                                    <div className='myCursor minimizeArrow' onClick={() => setMinimize(!minimize)}>
                                        <i className={`bi bi-caret-${minimize ? "down" : "up"}-fill text-secondary`}></i>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div >
            }

        </>

    )
}

export default CardPenRejAnnouncementReduced