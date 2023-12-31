import React from 'react';
import Button from 'react-bootstrap/Button';
import Placeholder from 'react-bootstrap/Placeholder';


const CardAnnouncement = ({ singleData, isLoading }) => {
    return (
        <div className='p-3 rounded-5 bg-light border myMaxW500 myW9'>
            {
                !singleData[0] || isLoading ?
                    <Placeholder animation="glow"><Placeholder xs={12} style={{ height: '400px' }} /></Placeholder> : <div className='mb-2 rounded-4 myBgImgContain' style={{ height: "400px", backgroundImage: `url(${singleData[0].pics})` }}></div>
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
                    <div className='d-flex align-items-top my-3'>
                        <h2 className='fw-normal'>{singleData[0].price}</h2>
                        <p className='mt-2'>00$</p>
                    </div>
            }
            {
                !singleData[0] || isLoading ?
                    <Placeholder animation="glow"><Placeholder xs={6} /></Placeholder> :
                    <div className='mb-5'>
                        <span className='bg-success text-light p-1 px-2 rounded-5'>{singleData[0].category}</span>
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