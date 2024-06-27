import React from 'react'

const CardChatUser = ({ user }) => {
    
    return (
        <div className='d-flex gap-2'>
            <div className='myMaxW65 d-flex justify-content-center p-2 bg-dark display-6' >
                <div className={`${user.manufacturer ? "text-info" : "text-success"} py-2 px-2`} >
                    <div className='fw-bold'>{user.manufacturer ? "M" : "D"}</div>
                </div>
            </div>
            <div className='p-2'>
                <div className='d-flex gap-2 justify-content-between'>
                    {
                        user.accountActive ?
                            <div className=' bg-dark border activeUserIcon d-flex align-items-center justify-content-center'><i className="bi bi-person-check-fill text-info"></i></div>
                            : null
                    }
                    <h5 className=''>{user.companyName}</h5>
                </div>
                <div className='d-flex gap-3 mt-2 text-secondary'>
                    {user.distributionArea ? <div><span>distribution area:</span> <span className='fw-bold'>{user.distributionArea}</span></div> : null}
                    <div><span>City:</span> <span className='fw-bold'>{user.city}</span></div>
                </div>
            </div>
        </div>
    )
}

export default CardChatUser