
import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Placeholder from 'react-bootstrap/Placeholder';
import productCategories from '../assets/JSON/productCategories.json';



const CardAnnouncement = ({ singleData, isLoading }) => {

    const [picsNum, setPicsNum] = useState(0);

    return (


        <div className='p-3 rounded-5 bg-light border myMaxW500 myW9'>
            {
                !singleData[0] || isLoading ?
                    <Placeholder animation="glow"><Placeholder xs={12} style={{ height: '400px' }} /></Placeholder>
                    :
                    <div>
                        <div className='mb-2 rounded-4 myBgImgContain' style={{ backgroundImage: `url("http://localhost:5050/uploads/${singleData[0].pics.split(",")[picsNum]}")`, height: "400px" }}></div>
                        <div className='d-flex justify-content-center'>
                            {
                                singleData[0].pics.split(",").map((el, index) => {
                                    return <div className={`border px-2 ${index === picsNum ? "bg-info" : "bg-secondary"} rounded-5 myCursor`} style={{ height: "10px", margin: "0 1px" }} onClick={() => setPicsNum(index)}></div>
                                })
                            }
                        </div>
                    </div>
            }
            {
                !singleData[0] || isLoading ?
                    <Placeholder animation="glow"><Placeholder xs={4} /></Placeholder> :
                    <div className='d-flex justify-content-between gap-3'>
                        <span>Qnt: {singleData[0].quantity}</span>
                        <span className='fw-light'>Brand: {singleData[0].brandName}</span>
                    </div>
            }
            {
                !singleData[0] || isLoading ?
                    <Placeholder animation="glow"><Placeholder xs={12} /></Placeholder> : <h3 className='fw-light'>{singleData[0].modelName}</h3>
            }
            {
                !singleData[0] || isLoading ?
                    <Placeholder animation="glow"><Placeholder xs={4} /></Placeholder> :
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className='d-flex align-items-top my-3'>
                            <h2 className='fw-normal'>{singleData[0].price}</h2>
                            <p className='fw-light'>00$</p>
                        </div>
                        <div className='d-flex align-items-top my-3 px-3 py-1 rounded-5 myBgWhite'>
                            <h2 className='fw-normal'>{(Math.round((singleData[0].price) / (singleData[0].quantity) * 100) / 100).toString().split(".")[0]}</h2>
                            <p className='fw-light'>{(Math.round((singleData[0].price) / (singleData[0].quantity) * 100) / 100).toString().split(".")[1]}$</p>
                            <h4 className='fw-light'>/item</h4>
                        </div>
                    </div>
            }
            {
                !singleData[0] || isLoading ?
                    <Placeholder animation="glow"><Placeholder xs={6} /></Placeholder> :

                    <div className='w-100'>

                        <div className='my-3 d-flex flex-wrap align-items-center'>
                            {
                                singleData[0].category && singleData[0].category.split(",").map((el) => {
                                    return (
                                        <div>
                                            {productCategories.map((item) => {
                                                if (item.id === +el) {
                                                    return <span className={`p-1 categoryTag px-3 text-light m-1 ms-0 rounded-5 d-flex align-iems-center ${item.area == "dental" ? "myBgAcqua" : "myBgRed"}`} > {item.eng} </span>
                                                }
                                            })}
                                        </div>
                                    )
                                })
                            }
                        </div>

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
            <div className='mb-5 mt-4 d-flex justify-content-center'>
                {!singleData[0] || isLoading ? <Placeholder.Button xs={4} aria-hidden="true" /> : <Button variant="success">Chat</Button>}
            </div>
        </div>

    )
}

export default CardAnnouncement