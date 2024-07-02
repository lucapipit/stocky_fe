import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import productCategories from '../assets/JSON/productCategories.json';
import { setCategoriesProduct, delCategoriesProduct, clearCategoriesProduct } from '../states/generalState';
import { updateAccountFunc } from '../states/signinState';
import { Button } from 'react-bootstrap';

const CategoriesPreferences = ({ userData }) => {

    const categoriesProduct = useSelector((state) => state.general.categoriesProduct);
    const categoriesProductId = useSelector((state) => state.general.categoriesProductId);
    const [errorMessage, setErrorMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false)
    const [zoomIn, setZoomIn] = useState({ field: "", value: false });

    const dispatch = useDispatch();

    const manageCategory = (input) => {
        const { el, e } = input;

        if (e.currentTarget.classList.toggle('borderActiveWhite')) {
            dispatch(setCategoriesProduct(el));
        } else {
            dispatch(delCategoriesProduct(el.id))
        }
    }

    const handleUpdateAccount = async () => {
        if (categoriesProduct) {
            dispatch(updateAccountFunc({ payload: { ...userData, interests: categoriesProductId.toString() }, token: localStorage.getItem("token") }))
                .then((response) => {
                    if (response.payload.statusCode !== 200) {
                        setErrorMessage(response.payload.message)
                    } else {
                        window.location.reload()
                    }
                });
        } else {
            setErrorMessage("Select at least one category")
        }

    };

    useEffect(() => {
        dispatch(clearCategoriesProduct())
        //serve per aggiungere le categorie che l'utente ha salvato nella sezione selected category/ies
        productCategories.map((el) => {
            if (userData.interests.split(",").includes(el.id.toString())) {
                dispatch(setCategoriesProduct(el))
            }
        })
    }, [])


    return (
        <div>

            <Form.Group className="mb-3 pb-5 myBgDark text-light">
                <div className='d-flex flex-wrap justify-content-center w-100 pt-5 pb-3'>
                    <div>
                        <h1 className={`d-flex justify-content-center ${isEditing ? "mb-5" : null}`}>Areas of interests</h1>

                        {isEditing ?
                            <div>
                                <h5 className='w-100 text-center mt-3 fw-light'>Dental Categories</h5>
                                <hr className='w-100 px-5 mt-1' />
                                <div className='d-flex justify-content-center gap-3 mb-3 display-6'>
                                    {
                                        zoomIn.value && zoomIn.field === "den" ?
                                            <i className="bi bi-zoom-out myCursor" onClick={() => { setZoomIn({ field: "den", value: false }) }}></i>
                                            : <i className="bi bi-zoom-in myCursor" onClick={() => { setZoomIn({ field: "den", value: true }) }}></i>
                                    }
                                </div>
                                <div className='d-flex flex-wrap justify-content-center'>
                                    {
                                        productCategories.map((el) => {
                                            if (el.area === "dental") {
                                                return <span
                                                    className={`${userData.interests.split(",").includes(el.id.toString()) ? "borderActiveWhite" : ""} ${zoomIn.value && zoomIn.field === "den" ? "display-6 px-4 py-1" : "px-2"} m-1 text-center text-light rounded-5 myBgAcqua myCursor myBorderAcqua`}
                                                    onClick={(e) => { manageCategory({ el, e }) }}>{el.eng}</span>
                                            }
                                        })
                                    }
                                </div>
                                <h5 className='w-100 text-center mt-5 fw-light'>Medical Categories</h5>
                                <hr className='w-100 px-5 mt-1' />
                                <div className='d-flex justify-content-center gap-3 mb-3 display-6'>
                                    {
                                        zoomIn.value && zoomIn.field === "med" ?
                                            <i className="bi bi-zoom-out myCursor" onClick={() => { setZoomIn({ field: "med", value: false }) }}></i>
                                            : <i className="bi bi-zoom-in myCursor" onClick={() => { setZoomIn({ field: "med", value: true }) }}></i>
                                    }
                                </div>
                                <div className="d-flex flex-wrap justify-content-center">
                                    {
                                        productCategories && productCategories.map((el) => {
                                            if (el.area === "medical") {
                                                return <span
                                                    className={`${userData.interests.split(",").includes(el.id.toString()) ? "borderActiveWhite" : ""}  ${zoomIn.value && zoomIn.field === "med" ? "display-6 px-4 py-1" : "px-2"} text-light text-center m-1 rounded-5 myBgRed myCursor myBorderRed`}
                                                    onClick={(e) => { manageCategory({ el, e }) }}>{el.eng}</span>
                                            }
                                        })
                                    }
                                </div>
                                <hr className='w-100 px-5 mt-3' />
                            </div>
                            : null
                        }

                    </div>
                </div>

                {
                    categoriesProduct.length > 0 ?
                        <div className='bg-dark rounded-4 mt-1 p-2 mx-3'>
                            <h6 className='text-center text-light fw-light'>Selected area/s:</h6>
                            <div className='d-flex flex-wrap justify-content-center my-3'>
                                {
                                    categoriesProduct && categoriesProduct.map((el) => {
                                        return <span className={`text-light p-1 px-3 m-1 rounded-5 d-flex align-iems-center ${el.area == "dental" ? "myBgAcqua" : "myBgRed"}`}>{el.eng} </span>
                                    })
                                }
                            </div>
                        </div>
                        : null
                }

                {
                    errorMessage ?
                        <div className='d-flex justify-content-center mt-4'>
                            <div className='p-3 bg-warning text-secondary'>{errorMessage}</div>
                        </div>
                        : null
                }


                <div className='d-flex justify-content-center mt-3'>
                    {
                        !isEditing ?
                            categoriesProduct.length > 0 ?
                                <i className="bi bi-pencil-fill text-light myCursor" onClick={() => setIsEditing(true)}> edit preferences</i>
                                : <i className="bi bi-plus-lg text-info myCursor" onClick={() => setIsEditing(true)}> add area</i>
                            : <Button variant="primary" disabled={categoriesProduct ? false : true} onClick={() => { handleUpdateAccount() }}><i className="bi bi-check2-square me-2"></i>done</Button>
                    }
                </div>

            </Form.Group>

        </div>
    )
}

export default CategoriesPreferences