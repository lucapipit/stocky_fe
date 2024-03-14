import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { updateAnnouncementFunc } from "../states/storeState";
import { createPendingAnnouncementFunc } from "../states/pendingAnnState";
import { deleteRejectedAnnouncementFunc } from "../states/rejectedAnnState";
import Resizer from "react-image-file-resizer";

const CardPenRejAnnouncementReducedForm = ({ singleData }) => {

    const dispatch = useDispatch();

    const [file, setFile] = useState(singleData.pics.split(","));
    const [newFile, setNewFile] = useState("");
    const [idOwner, setIdOwner] = useState(singleData.idOwner);
    const [idPackage, setIdPackage] = useState(singleData.idPackage);
    const [brandName, setBrandName] = useState(singleData.brandName);
    const [manufacturerName, setManufacturerName] = useState(singleData.manufacturerName);
    const [modelName, setModelName] = useState(singleData.modelName);
    const [quantity, setQuantity] = useState(singleData.quantity);
    const [price, setPrice] = useState(singleData.price);
    const [productSize, setProductSize] = useState(singleData.productSize);
    const [description, setDescription] = useState(singleData.description);
    const [techDetail, setTechDetail] = useState(singleData.techDetail);
    const [category, setCategory] = useState(singleData.category);
    const [expireDate, setExpireDate] = useState(singleData.expireDate);
    const [textFocus, setTextFocus] = useState(singleData.textFocus);
    const [picsFocus, setPicsFocus] = useState(singleData.picsFocus);

    const [isFormFilled, setIsFormFilled] = useState(false);
    const [isFirstTry, setIsFirstTry] = useState(true);

    const [imgSelectionCounter, setImgSelectionCounter] = useState(0);



    const uploadFile = async (newFile) => {
        const fileData = new FormData();

        [...Array(newFile.length)].map((el, index) => {
            fileData.append('img', newFile[index]);
            console.log(newFile[index]);
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

    const deleteFile = async (input) => {

        try {
            const response = await fetch(`http://localhost:5050/del-fileupload/${input}`, {
                method: "DELETE"
            })
            return await response.json()
        } catch (error) {
            console.log(error);
        }

    }

    const formCheck = async () => {

        const formFilled = brandName && manufacturerName && modelName && quantity /* && file */ && description && category;

        if (formFilled) {
            setIsFormFilled(true);
            setIsFirstTry(false);
            const uploadedFile = await uploadFile(newFile);
            handleUpdateFormAnnouncement(uploadedFile)
            /* if (totalPrice !== "0") {
                navigate(`/paymentmethods/xlf-${totalPrice}-jK$`)
            } */
        } else {
            setIsFormFilled(false);
            setIsFirstTry(false);
        }

    }

    const manageImages = async () => {
        if (window.confirm("Do you want to delete this image? ")) {
            deleteFile(file[imgSelectionCounter]);
            setFile(file.splice(file.indexOf(file[imgSelectionCounter]), 1));
            dispatch(updateAnnouncementFunc({ payload: { ...singleData, pics: file.toString() }, id: singleData.id, status: singleData.status }));
            setImgSelectionCounter(0);
            setFile(file)//fondamentale per aggiornare la galleria immagini
        }
    }

    const handleUpdateFormAnnouncement = async (input) => {

        const payload = {
            idPackage: idPackage,
            status: singleData.status,
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
            category: category,
            expireDate: expireDate,
            /* textFocus: textFocus,
            picsFocus: picsFocus, */
            views: 0,
            posClick: 0,
            negClick: 0
        }

        dispatch(updateAnnouncementFunc({ id: singleData.id, payload: payload, status: singleData.status }))
            .then((response) => {
                if (response.payload.statusCode === 200) {
                    if (singleData.status === 3) {
                        dispatch(createPendingAnnouncementFunc({ ...singleData, ...payload, status: 0, rejReasons: singleData.rejReasons.replace("\\", "\\\\").replace("'", "\\'") }))
                            .then((response) => {
                                if (response.payload.statusCode === 200) {
                                    dispatch(deleteRejectedAnnouncementFunc(singleData.id));
                                    window.location.reload()
                                }
                            })
                    } else {
                        window.location.reload()
                    }
                }
            });

        /* if (totalPrice === "0") {
            dispatch(createPendingAnnouncementFunc(payload))
                .then((response) => response.payload.statusCode === 200 ? navigate("/") : null)
        } else {
            dispatch(saveAnnouncementPayload(payload))
        } */

    };

    const resizeFile = async (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                500,
                500,
                "PNG",
                100,
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
            setNewFile(imgArray);
        });

        setNewFile(imgArray);
    }

    return (
        <>
            <div className='d-flex justify-content-center mt-5'>
                <Form className='text-light d-flex flex-wrap justify-content-center' encType='multipart/form-data'>

                    <div className='d-flex justify-content-center flex-wrap gap-5'>

                        <div className='position-relative'>

                            {
                                file.length > 1 ?
                                    <div className='position-absolute top-0 end-0 p-3'>
                                        <div className='bg-light border p-2 trashButtonImage'>
                                            <i className="bi bi-trash-fill myCursor text-danger" onClick={() => { manageImages() }}></i>
                                        </div>
                                    </div>
                                    : null
                            }


                            <div>

                                <img className='myMaxH500' src={`http://localhost:5050/uploads/${file[imgSelectionCounter]}`} alt="" />

                                <div className='w-100'>

                                    <div className='mt-1 d-flex align-items-center flex-wrap'>
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
                                <input type='file' style={{ display: "none" }} id="upload-input" multiple onChange={(e) => { /* setNewFile(e.target.files) */ myResize(e) }} />
                                <label className='myCursor myInputFile border rounded-5 d-flex align-items-center' htmlFor="upload-input">
                                    <div className='bg-light fw-bold text-dark p-1 px-3 rounded-5'>choose a file</div>
                                    <p className='text-light m-0 p1 px-3'>{!newFile ? "select one or multiple images" : newFile.length == 1 ? JSON.stringify(newFile[0].name) : `${JSON.stringify(newFile.length)} images selected`}</p>
                                </label>

                                {newFile ? <h4 className='fw-light'><i className="bi bi-arrow-repeat text-info ms-3 myCursor" onClick={() => { localStorage.setItem("editId", singleData.id); formCheck() }}> update image</i></h4> : null}
                            </Form.Group>
                        </div>

                        <div>
                            <Form.Group className="mb-3" style={{ minWidth: "400px" }}>
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
                                <Form.Control type="text" className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                            </Form.Group>
                        </div>
                    </div>

                    <div className='w-100 my-4 d-flex flex-wrap justify-content-center gap-5'>
                        <Form.Group className="mb-3">
                            <Form.Label>expireDate</Form.Label>
                            <Form.Control type="date" className="form-control" id="expireDate" value={expireDate} onChange={(e) => setExpireDate(e.target.value)} />
                        </Form.Group>

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

            <i className="bi bi-arrow-repeat text-info display-6 myCursor me-3" onClick={() => { formCheck(); localStorage.removeItem("editId") }}> Update</i>
        </>
    )
}

export default CardPenRejAnnouncementReducedForm