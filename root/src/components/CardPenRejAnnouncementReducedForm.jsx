import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { updateAnnouncementFunc } from "../states/storeState";
import { createPendingAnnouncementFunc } from "../states/pendingAnnState";
import { deleteRejectedAnnouncementFunc } from "../states/rejectedAnnState";

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
        deleteFile(file[imgSelectionCounter]);
        setFile(file.splice(file.indexOf(file[imgSelectionCounter]), 1));
        dispatch(updateAnnouncementFunc({ payload: {...singleData, pics: file.toString()}, id: singleData.id, status: singleData.status }));
        setImgSelectionCounter(0);
        setFile(file)//fondamentale per aggiornare la galleria immagini
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
            pics: newFile?file.concat(input.img.split(",")).toString():file.toString(),
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

    return (
        <>
            <div className='d-flex justify-content-center mt-5'>
                <Form className='text-light d-flex flex-wrap justify-content-center' encType='multipart/form-data'>

                    <div className='d-flex justify-content-center flex-wrap gap-5'>

                        <div className='position-relative'>

                            <div className='position-absolute top-0 end-0 p-3 px-4'>
                                <div>
                                    <i className="bi bi-trash-fill text-danger display-6" onClick={() => { manageImages() }}></i>
                                </div>
                            </div>

                            <div>
                                <img className='myMaxW500' src={`http://localhost:5050/uploads/${file[imgSelectionCounter]}`} alt="" />
                                <div className='w-100'>

                                    <div className='mt-1 d-flex align-items-center flex-wrap'>
                                        {
                                            file.map((el, index) => {
                                                return (
                                                    <div className='myBgImgCover me-1 myCursor'
                                                        onClick={() => setImgSelectionCounter(index)}
                                                        style={{ height: "90px", width: "90px", border: `${index===imgSelectionCounter?"3px solid #507598":""}`, backgroundImage: `${index === imgSelectionCounter ? "linear-gradient(to right, #b8b8b8de, #b8b8b8de)," : ""} url(http://localhost:5050/uploads/${file[index]})` }}
                                                    ></div>
                                                )

                                            })
                                        }
                                    </div>

                                </div>
                            </div>

                            <Form.Group className="mb-3 mt-5">
                                <input type='file' multiple onChange={(e) => { setNewFile(e.target.files) }} />
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
                            <Form.Control as="textarea" rows={10} type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>



                        <Form.Group className="mb-3">
                            <Form.Label>techDetail</Form.Label>
                            <Form.Control as="textarea" rows={10} type="text" className="form-control" id="techDetail" value={techDetail} onChange={(e) => setTechDetail(e.target.value)} />
                        </Form.Group>
                    </div>
                </Form>

            </div>

            <i className="bi bi-floppy2-fill text-info display-6 myCursor me-3" onClick={() => formCheck()}> Update</i>
        </>
    )
}

export default CardPenRejAnnouncementReducedForm