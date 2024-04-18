import { React, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { updateAnnouncementFunc } from "../states/storeState";
import { deleteFileFunc } from '../states/uploadFileState';
import { setIsPenRejModalEditing } from '../states/generalState';
import Resizer from "react-image-file-resizer";
import Spinner from 'react-bootstrap/Spinner';
import { escapeString } from '../functions/general';
import productCategories from '../assets/JSON/productCategories.json';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { setCategoriesProduct, delCategoriesProduct, clearCategoriesProduct } from '../states/generalState'

const CardPenRejAnnouncementReducedForm = ({ singleData }) => {

    const dispatch = useDispatch();

    const [file, setFile] = useState(singleData.pics.split(","));
    const [idOwner, setIdOwner] = useState(singleData.idOwner);
    const [newFile, setNewFile] = useState("");
    const [idPackage, setIdPackage] = useState(singleData.idPackage);
    const [rejReasons, setRejReasons] = useState(singleData.rejReasons);
    const [brandName, setBrandName] = useState(singleData.brandName);
    const [manufacturerName, setManufacturerName] = useState(singleData.manufacturerName);
    const [modelName, setModelName] = useState(singleData.modelName);
    const [quantity, setQuantity] = useState(singleData.quantity);
    const [price, setPrice] = useState(singleData.price);
    const [productSize, setProductSize] = useState(singleData.productSize);
    const [description, setDescription] = useState(singleData.description);
    const [techDetail, setTechDetail] = useState(singleData.techDetail);
    const [category, setCategory] = useState(singleData.category.split(","));
    const [expireDate, setExpireDate] = useState(singleData.expireDate);
    const [textFocus, setTextFocus] = useState(singleData.textFocus);
    const [picsFocus, setPicsFocus] = useState(singleData.picsFocus);

    const [isFormFilled, setIsFormFilled] = useState(false);
    const [isFirstTry, setIsFirstTry] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const [imgSelectionCounter, setImgSelectionCounter] = useState(0);
    const [newFileItems, setNewFileItems] = useState("");


    /* selectors */
    const isPenRejModalEditing = useSelector((state) => state.general.isPenRejModalEditing);
    /* loading states */
    const isDeletingPics = useSelector((state) => state.uploadFile.isDeletingPics);
    const isLoading = useSelector((state) => state.myStore.isLoading);
    /* category states */
    const categoriesProduct = useSelector((state) => state.general.categoriesProduct);
    const categoriesProductId = useSelector((state) => state.general.categoriesProductId);

    const uploadFile = async (newFile) => {
        const fileData = new FormData();

        [...Array(newFile.length)].map((el, index) => {
            fileData.append('img', newFile[index]);
        })

        try {
            const response = await fetch('http://localhost:5050/fileupload', {
                method: 'POST',
                body: fileData,
            });
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    };

    const formCheck = async () => {

        const formFilled = brandName && manufacturerName && modelName && quantity /* && file */ && description && category;

        if (formFilled) {
            setIsFormFilled(true);
            setIsFirstTry(false);
            const uploadedFile = await uploadFile(newFile);
            handleUpdateFormAnnouncement(uploadedFile)
        } else {
            setIsFormFilled(false);
            setIsFirstTry(false);
        }

    }

    const manageImages = async () => {
        if (window.confirm("Do you want to delete this image? ")) {
            dispatch(deleteFileFunc(file[imgSelectionCounter]))
                .then((response) => {
                    if (response.payload.statusCode !== 200) {
                        setErrorMessage(response.payload.message)
                    }
                });
            setFile(file.splice(file.indexOf(file[imgSelectionCounter]), 1));
            handleUpdateFormAnnouncement();
            setImgSelectionCounter(0);
            setFile(file)//fondamentale per aggiornare la galleria immagini
        }
    }

    const handleUpdateFormAnnouncement = async (input) => {

        const payload = {
            idPackage: idPackage,
            status: singleData.status,
            rejReasons: rejReasons,
            relevance: idPackage,
            brandName: brandName,
            manufacturerName: manufacturerName,
            modelName: modelName,
            quantity: quantity,
            price: price,
            pics: newFile ? file.concat(input.img.split(",")).toString() : file.toString(),
            productSize: productSize,
            description: description,
            techDetail: techDetail,
            category: categoriesProductId.toString(),
            dataApproved: singleData.dataApproved,
            expireDate: expireDate,
            /* textFocus: textFocus,
            picsFocus: picsFocus, */
            views: 0,
            posClick: 0,
            negClick: 0
        }

        dispatch(updateAnnouncementFunc({ payload: { ...payload, id: singleData.id }, token: localStorage.getItem("token") }))
            .then((response) => {
                if (response.payload.statusCode === 200) {
                    if (singleData.status === 3) {
                        dispatch(updateAnnouncementFunc({ payload: { ...payload, id: singleData.id, status: 0, dataRejected: singleData.dataRejected }, token: localStorage.getItem("token") }))
                            .then((response) => {
                                if (response.payload.statusCode === 200) {
                                    dispatch(clearCategoriesProduct());
                                    window.location.reload()
                                }
                            })
                    } else {
                        window.location.reload()
                    }
                } else {
                    setErrorMessage(response.payload.message)
                }
            });
    };

    const resizeFile = async (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                1300,
                1100,
                "JPEG",
                file.size > 200000 ? file.size > 600000 ? file.size > 5000000 ? 30 : 40 : 70 : 90,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });

    const myResize = async (e) => {
        let imgArray = [];
        [...Array(e.target.files.length)].map(async (el, index) => {
            const myFile = e.target.files[index];
            const image = await resizeFile(myFile);
            imgArray.push(image);
        });
        setNewFile(imgArray);
    };

    const manageCategory = (input) => {
        const { el, e } = input;
        if (e.currentTarget.classList.toggle('borderActive')) {
            dispatch(setCategoriesProduct(el));
        } else {
            dispatch(delCategoriesProduct(el.id))
        }

    };

    useEffect(() => {
        category.map((el) => {
            productCategories.map((item) => {
                if (+el === item.id) {
                    dispatch(setCategoriesProduct(item));
                }
            })
        })
    }, [])



    return (
        <>
            <div className='d-flex justify-content-center mt-5'>

                <Form className='text-light d-flex flex-wrap justify-content-center' encType='multipart/form-data'>

                    <div className='d-flex justify-content-center flex-wrap gap-5'>

                        <div className='position-absolute top-0 end-0 display-6 p-4 pt-4 myCursor'>
                            <i class="bi bi-x-lg" onClick={() => { document.body.style.overflow = ''; dispatch(setIsPenRejModalEditing(!isPenRejModalEditing)); localStorage.removeItem("editId"); dispatch(clearCategoriesProduct()) }}></i>
                        </div>

                        <div className='position-relative'>


                            {
                                file.length > 1 ?
                                    <div className='position-absolute top-0 end-0 p-3'>
                                        <div className='bg-light border p-2 trashButtonImage'>
                                            {
                                                isDeletingPics ?
                                                    <Spinner animation="border" variant='danger' />
                                                    : <i className="bi bi-trash-fill myCursor text-danger" onClick={() => { manageImages() }}></i>
                                            }
                                        </div>
                                    </div>
                                    : null
                            }


                            <div>

                                <img className='myMaxH500' src={`http://localhost:5050/uploads/${file[imgSelectionCounter]}`} alt="" />

                                <div className='w-100'>

                                    <div className='mt-1 d-flex align-items-center justify-content-center flex-wrap myMaxW600'>
                                        {
                                            file.map((el, index) => {
                                                return (
                                                    <div className={`myBgImgCover imgGalleryCarousel me-1 myCursor ${index === imgSelectionCounter ? "imgGalleryCarouselActive" : ""}`}
                                                        onClick={() => setImgSelectionCounter(index)}
                                                        style={{ backgroundImage: `url(http://localhost:5050/uploads/${file[index]})` }}
                                                    ></div>
                                                )

                                            })
                                        }
                                    </div>

                                </div>
                            </div>

                            <Form.Group className="mb-3 mt-5 d-flex align-items-center justify-content-center">
                                <input type='file' style={{ display: "none" }} id="upload-input" multiple onChange={(e) => { myResize(e); setNewFileItems(e.target.files); }} />
                                <label className='myCursor myInputFile border rounded-5 d-flex align-items-center' id="upload-input" htmlFor="upload-input">
                                    <div className='bg-light fw-bold text-dark p-1 px-3 rounded-5'>choose a file</div>
                                    <p className='text-light m-0 p1 px-3' htmlFor="upload-input">{!newFile ? "select one or multiple images" : newFileItems.length == 1 ? JSON.stringify(newFileItems[0].name) : `${JSON.stringify(newFileItems.length)} images selected`}</p>
                                </label>
                                {newFile ? isLoading ? <div className='ms-4'><Spinner animation="border" variant='info' /></div> : <h4 className='fw-light' onClick={() => { localStorage.setItem("editId", singleData.id); formCheck() }}><i className="bi bi-arrow-repeat text-info ms-3 myCursor" > update image</i></h4> : null}
                            </Form.Group>
                        </div>

                        <div className='myMinW375'>
                            <Form.Group className="mb-3">
                                <Form.Label>Brand Name</Form.Label>
                                <Form.Control type="text" className="form-control" id="brandName" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Model Name</Form.Label>
                                <Form.Control type="text" className="form-control" id="modelName" value={modelName} onChange={(e) => setModelName(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="number" className="form-control" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </Form.Group>


                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <DropdownButton id="dropdown-basic-button" drop='down-centered' title={categoriesProduct.length ? categoriesProduct.length === 1 ? "1 item" : `${categoriesProduct.length} items` : "select one or more categories"}>
                                    <h4 className='w-100 text-center mt-3'>Dental Categories</h4>
                                    <hr className='w-100 px-5 mt-1' />
                                    {
                                        productCategories && productCategories.map((el) => {
                                            if (el.area === "dental") { return <span className={`${category.includes(el.id.toString()) ? "borderActive" : ""} text-light p-1 px-3 m-1 rounded-5 myBgAcqua myCursor myBorderAcqua`} onClick={(e) => { manageCategory({ el, e }) }}>{el.eng}</span> }
                                        })
                                    }
                                    <h4 className='w-100 text-center mt-3'>Medical Categories</h4>
                                    <hr className='w-100 px-5 mt-1' />
                                    {
                                        productCategories && productCategories.map((el) => {
                                            if (el.area === "medical") { return <span className={`${category.includes(el.id.toString()) ? "borderActive" : ""} text-light p-1 px-3 m-1 rounded-5 myBgRed myCursor myBorderRed`} onClick={(e) => { manageCategory({ el, e }) }}>{el.eng}</span> }
                                        })
                                    }
                                </DropdownButton>

                                <div className='d-flex flex-wrap justify-content-center my-3 myMaxW700'>
                                    {
                                        categoriesProduct && categoriesProduct.map((el) => {
                                            return (
                                                <div>
                                                    {productCategories.map((item) => {
                                                        if (item.id === el.id) {
                                                            return <span className={`text-light p-1 px-3 m-1 rounded-5 d-flex align-iems-center ${item.area == "dental" ? "myBgAcqua" : "myBgRed"}`}> {item.eng} </span>
                                                        }
                                                    })}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </Form.Group>

                        </div>
                    </div>

                    <div className='w-100 my-4 d-flex flex-wrap justify-content-center gap-5'>
                        {/* <Form.Group className="mb-3">
                            <Form.Label>expireDate</Form.Label>
                            <Form.Control type="date" className="form-control" id="expireDate" value={expireDate} onChange={(e) => setExpireDate(e.target.value)} />
                        </Form.Group> */}

                        <Form.Group className='mb-3'>
                            <Form.Label>productSize</Form.Label>
                            <Form.Control type='text' className='form-control' id="productSize" value={productSize} onChange={(e) => setProductSize(e.target.value)} />
                        </Form.Group>
                    </div>

                    <div className='w-100 my-5'>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={10} type="text" className="form-control p-3" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>



                        <Form.Group className="mb-3">
                            <Form.Label>Tech Detail</Form.Label>
                            <Form.Control as="textarea" rows={10} type="text" className="form-control p-3" id="techDetail" value={techDetail} onChange={(e) => setTechDetail(e.target.value)} />
                        </Form.Group>
                    </div>

                </Form>

            </div>

            <div className='pb-5'>
                {isLoading ? <span><Spinner animation="border" variant='info' /><i className='text-info display-6 me-3'> Update</i></span> : <i className="bi bi-arrow-repeat text-info display-6 myCursor me-3" onClick={() => { formCheck(); localStorage.removeItem("editId") }}> Update</i>}
                <i className="bi bi-arrow-return-left text-light display-6 myCursor ms-3" onClick={() => { dispatch(setIsPenRejModalEditing(!isPenRejModalEditing)); localStorage.removeItem("editId"); document.body.style.overflow = ''; }}> Cancel</i>
                {
                    errorMessage ?
                        <div className='d-flex align-items-center justify-content-center mt-4 fw-light'><p className='text-light p-3 myMaxW700 bg-danger'>{errorMessage}</p></div>
                        : null
                }
            </div>

        </>
    )
}

export default CardPenRejAnnouncementReducedForm