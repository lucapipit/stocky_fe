import { React, useEffect, useState } from 'react';
import Placeholder from 'react-bootstrap/Placeholder';

const CardChatAnnouncement = ({ singleData, isLoading }) => {
    const cardBody = {
        borderBottom: "1px solid lightgray"
    }

    return (

        <div className=' mx-2 w-100 d-flex align-items-center gap-3 p-1 myCursor' style={cardBody}>
            <div className='d-flex align-items-center'>
                {
                    !singleData || isLoading ?
                        <Placeholder animation="glow"><Placeholder xs={12} style={{ height: "60px" }} /></Placeholder>
                        :
                        <div className="myBgImgCover2 imgChatMain myCursor rounded-5"
                            style={{ backgroundImage: `url(http://localhost:5050/uploads/${singleData.pics.split(",")[0]})` }}
                        ></div>

                }
            </div>
            <div>
                <div className="line-clamp1 py-2 pe-5" ><h4 className='fw-light'>{singleData.modelName}</h4></div>
                <p>last message</p>
            </div>
        </div>


    )
}

export default CardChatAnnouncement