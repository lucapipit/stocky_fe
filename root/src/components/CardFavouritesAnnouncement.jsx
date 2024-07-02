import { React, useEffect, useState } from 'react';
import Placeholder from 'react-bootstrap/Placeholder';
import { useDispatch, useSelector } from 'react-redux';
import "../styles/accountCardBody.css";
import { generateScore } from '../states/annScoreState';
import { goToMyChat } from '../states/chatState';
import notificationAssigner from '../functions/notificationAssigner';



const CardFavouritesAnnouncement = ({ key, idOwn, singleData, isLoading }) => {

    const dispatch = useDispatch();


    const [minimize, setMinimize] = useState(true);
    const [imgSelectionCounter, setImgSelectionCounter] = useState(0);
    const [score, setScore] = useState(0);
    const [notify, setNotify] = useState(false);

    //loading states
    const isDeletingPics = useSelector((state) => state.uploadFile.isDeletingPics);
    const isUpdating = useSelector((state) => state.myStore.isLoading);
    //open and keep edit modal open state. 
    const isPenRejModalEditing = useSelector((state) => state.general.isPenRejModalEditing);
    //announcement score
    const finalScore = useSelector((state) => state.annScore.finalScore);
    //chat
    const allChatsNotify = useSelector((state) => state.chat.allChatsNotify);
    const notifyCount = useSelector((state) => state.chat.notifyCount);

    useEffect(() => {
        if (notificationAssigner({ allChatsNotify, idOwn, singleData })) {
            setNotify(true)
        }
    }, [allChatsNotify, notifyCount])

    useEffect(() => {
        dispatch(generateScore(singleData))
    }, [])

    useEffect(() => {
        finalScore && finalScore.map((el) => { if (singleData.id === el.id) { setScore(el.score) } })
    }, [finalScore])

    return (
        <div key={key}>

            <div className={`m-1 border ${notify?"myBgChatNotify":""} myMaxW632 pe-3`} >

                <div>

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
                                                <p className='m-0 fw-bold myPetrolColor'>{singleData.brandName}</p>
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
                                            <div className='d-flex align-items-top rounded-5 '>
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
                                            <div className='m-0 border w-100 rounded-5 myBgWhite' style={{ height: "6px" }}>
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
                                            <h6 className='m-0 myCursor' onClick={() => { dispatch(goToMyChat({ idChat: singleData.id, typeSubMenu: 2, isFavouriteChat: true, openChat: true })) }}>
                                                <i className={`bi bi-chat-dots-fill ${notify ? "myChatColor" : "text-secondary"}`}></i>
                                            </h6>
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
                                                    {singleData.dataApproved ? <span className='px-3 py-1 text-dark'><i className="bi bi-check-circle-fill me-2 text-success"></i> <i className='fw-bold'>{singleData.dataApproved.split("T")[0]}</i></span> : null}
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

        </div>

    )
}

export default CardFavouritesAnnouncement