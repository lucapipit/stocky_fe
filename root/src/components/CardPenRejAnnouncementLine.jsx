import React, { useEffect } from 'react'

const CardPenRejAnnouncementLine = ({ singleData, isLoading }) => {

    useEffect(() => {
        console.log(singleData);
    }, [])

    return (
        <div className='border d-flex w-100 m-1 myOverFlowXHidden' style={{ height: "100px" }}>

            <div className='myOverflowYHidden d-flex align-items-center bg-dark'>
                <img className='myMaxW100 ' src={`http://localhost:5050/uploads/${singleData.pics.split(",")[0]}`} alt="" />
            </div>

            <div className='border border-danger px-3 py-2 d-flex flex-column justify-content-between'>

                <h5> {singleData.modelName}</h5>
                <p className='m-0'> {singleData.price}$ - {singleData.quantity} items </p>
                <p className='m-0'>Brand: {singleData.brandName}</p>

            </div>

            <div className='border border-danger px-3 py-2 d-flex flex-column justify-content-between'>

                <h5> {singleData.modelName}</h5>
                <p className='m-0'> {singleData.price}$ - {singleData.quantity} items </p>
                <p className='m-0'>Brand: {singleData.brandName}</p>

            </div>

        </div>
    )
}

export default CardPenRejAnnouncementLine