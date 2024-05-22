import React from 'react';

const PackageCardAnn = ({ el }) => {
    return (
        <div className={` rounded-4 p-3 myMaxW300 text-light ${el.id===1?"myGradientFreely":el.id===2?"myGradientWeekly":"myGradientMonthly"}`}>
            <h3 className='text-center'>{el.name}</h3>
            <hr className='mt-2' />
            <div>
                <ul>
                    <li><p className='mb-1'><b>{el.bold1 ? el.bold1 : ""}</b>{el.text1}</p></li>
                    <li><p className='mb-1'><b>{el.bold2 ? el.bold2 : ""}</b>{el.text2}</p></li>
                    <li><p className='mb-1'>{el.text3}</p></li>
                </ul>

                <p className='text-center'><span className='display-6'>{el.price}</span>{el.period}</p>

                <p className='mt-4 myFontSize6'>{el.extra}</p>
            </div>
        </div>
    )
}

export default PackageCardAnn