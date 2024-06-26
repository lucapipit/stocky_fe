
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateScore } from '../states/annScoreState';
import Placeholder from 'react-bootstrap/Placeholder';



const CardAnnouncement = ({ singleData, isLoading }) => {

    const [picsNum, setPicsNum] = useState(0);
    const [score, setScore] = useState(0);

    const dispatch = useDispatch();

    //announcement score
    const finalScore = useSelector((state) => state.annScore.finalScore);

    useEffect(() => {
        singleData[0] && dispatch(generateScore(singleData[0]));
    }, [singleData[0]])

    useEffect(() => {
        finalScore && finalScore.map((el) => { if (singleData[0].id === el.id) { setScore(el.score) } })
    }, [finalScore])

    return (


        <div className='rounded-5 bg-light border myMaxW700 myW9'>

            <div className='p-3 pb-0'>
                {
                    !singleData[0] || isLoading ?
                        <Placeholder animation="glow"><Placeholder xs={12} style={{ height: '400px' }} /></Placeholder>
                        :
                        <div>
                            <div className='myBgWhite rounded-4'>
                                <div className='mb-2 rounded-4 myBgImgContain' style={{ backgroundImage: `url("http://localhost:5050/uploads/${singleData[0].pics.split(",")[picsNum]}")`, height: "400px" }}></div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                {
                                    singleData[0].pics.split(",").map((el, index) => {
                                        return <div key={`cardannouncement1-${index}`} className={`border px-2 ${index === picsNum ? "bg-info" : "bg-secondary"} rounded-5 myCursor`} style={{ height: "13px", margin: "0 1px" }} onClick={() => setPicsNum(index)}></div>
                                    })
                                }
                            </div>
                        </div>
                }
                {
                    !singleData[0] || isLoading ?
                        <Placeholder animation="glow"><Placeholder xs={4} /></Placeholder> :
                        <div className='my-2 d-flex flex-wrap justify-content-start gap-3 align-items-center'>
                            <h6 className='m-0'><i className="bi bi-eye-fill"></i> {singleData[0].views}</h6>
                            <h6 className='m-0 myFucsiaRed'><i className="bi bi-suit-heart-fill" ></i> {singleData[0].posClick}</h6>
                        </div>
                }
                {
                    !singleData[0] || isLoading ?
                        <Placeholder animation="glow"><Placeholder xs={12} /></Placeholder> : <h3 className='fw-light'>{singleData[0].modelName}</h3>
                }

                {
                    !singleData[0] || isLoading ?
                        null :
                        <div className='d-flex justify-content-center'>
                            <div className='w-100 d-flex align-items-center mt-4 px-2 myMaxW600'>
                                <div className='m-0 border w-100 rounded-5' style={{ height: "6px" }}>
                                    <div className={`scoreBarLow rounded-5 h-100 ${score > 91 ? "scoreBarLegend" : score > 79 ? "scoreBarHigh" : score > 59 ? "scoreBarMedium" : null}`} style={{ width: `${score}%` }}></div>
                                </div>
                                <h3 className='ms-2 d-flex gap-2 align-items-center'> <p className='m-0'>score:</p> {score / 10}</h3>
                            </div>
                        </div>
                }
            </div>

            <div className='text-light rounded-5 p-3 my-3 mx-2 myBgPrimary' >
                {
                    !singleData[0] || isLoading ?
                        <Placeholder animation="glow"><Placeholder xs={4} /></Placeholder> :
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-top'>
                                <h2 className='fw-normal'>{singleData[0].price}</h2>
                                <p className='fw-light'>00$</p>
                            </div>
                            <div className='d-flex align-items-top px-3 py-1 rounded-5 myBgWhite text-dark'>
                                <h2 className='fw-normal'>{(Math.round((singleData[0].price) / (singleData[0].quantity) * 100) / 100).toString().split(".")[0]}</h2>
                                <p className='fw-light'>{(Math.round((singleData[0].price) / (singleData[0].quantity) * 100) / 100).toString().split(".")[1]}$</p>
                                <h4 className='fw-light'>/item</h4>
                            </div>
                        </div>
                }
                {
                    !singleData[0] || isLoading ?
                        <Placeholder animation="glow"><Placeholder xs={4} /></Placeholder> :
                        <div className='d-flex justify-content-between gap-3 mt-2 me-2 ms-1'>
                            <span>Qnt: <b>{singleData[0].quantity}</b></span>
                            <span>Brand: <b>{singleData[0].brandName}</b></span>
                        </div>
                }
            </div>

            <div className='p-3'>
                {
                    !singleData[0] || isLoading ?
                        <Placeholder animation="glow"><Placeholder xs={12} /></Placeholder> :
                        <div>
                            <h5 className='mb-1 fw-normal'>Description</h5>
                            <h5 className='fw-light mt-3'>{singleData[0].description}</h5>
                        </div>
                }
                {
                    !singleData[0] || isLoading ?
                        <Placeholder animation="glow"><Placeholder xs={12} /></Placeholder> :
                        <div className='mt-5'>
                            <hr />
                            <h5 className='fw-normal'> Technical detail</h5>
                            <div>
                                <ul className='mt-3'>
                                    {
                                        singleData[0].techDetail && singleData[0].techDetail.split(",").map((el, index) => {
                                            return <li key={`cardannouncement2-${index}`}>{el.split("£")[1]}</li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                }
            </div>

        </div>

    )
}

export default CardAnnouncement