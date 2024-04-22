import React, { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import "../styles/accountCardBody.css";

const CardPenRejAnnouncementLine = ({ singleData, isLoading }) => {

    useEffect(() => {
        console.log(singleData);
    }, [])

    return (
        <div className='w-100 d-flex justify-content-center'>

            <div className='border d-flex w-100 m-1 lineCard myMaxW1200'>

                <div className='myBgImgCover2' style={{ backgroundImage: `url(http://localhost:5050/uploads/${singleData.pics.split(",")[0]})`}}>
                </div>

                <div className='px-3 py-2 mainInfoLineCard'>
                    <div className='line-clampBeta'>
                        <h5 className='me-3'> {singleData.modelName}</h5>
                    </div>
                    <div className='d-flex align-items-center mt-1 gap-2'>
                        <p className='m-0'> <span className='fw-bold'>{singleData.price}$</span> - <span className='bg-dark text-light px-2 rounded-1'>{singleData.quantity} items</span> </p>
                        <p className='m-0 fw-bold myPrimaryColor'>{singleData.brandName}</p>
                        <h6 className='m-0'><i className="bi bi-eye-fill"></i> {singleData.views}</h6>
                        <h6 className='m-0' style={{ color: "#E52C5D" }}><i className="bi bi-suit-heart-fill" ></i> {singleData.posClick}</h6>
                        <h6 className='m-0'><i className="bi bi-chat-dots-fill text-secondary" style={{ color: "#84BD00" }}></i> </h6>
                    </div>

                </div>

                <div className='position-relative'>
                    <div className='position-absolute end-0 me-0'>
                        {singleData.status === 0 ?
                            <Spinner className='ms-1 statusCircular' animation="grow" size="sm" />
                            : singleData.status === 1 ?
                                <div className='rounded-5 bg-danger statusCircular mt-2' ></div>
                                : <div className='rounded-5 bg-success statusCircular mt-2' ></div>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CardPenRejAnnouncementLine