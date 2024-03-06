import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {updateAnnouncementFunc} from "../states/storeState"

const CardPenRejAnnouncementReducedForm = ({singleData}) => {

    const dispatch = useDispatch();

    const [file, setFile] = useState("");
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

    const [totalPrice, setTotalPrice] = useState("1.99");

    const [isFormFilled, setIsFormFilled] = useState(false);
    const [isFirstTry, setIsFirstTry] = useState(true);

    const navigate = useNavigate();

    const announcementPayload = useSelector((state) => state.myStore.announcementPayload);


    const uploadFile = async (file) => {
        const fileData = new FormData();
        fileData.append('img', file);

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
            const uploadedFile = await uploadFile(file);
            handleCreateFormAnnouncement(uploadedFile)
            if (totalPrice !== "0") {
                navigate(`/paymentmethods/xlf-${totalPrice}-jK$`)
            }
        } else {
            setIsFormFilled(false);
            setIsFirstTry(false);
        }

    }

    const handleCreateFormAnnouncement = async (input) => {

        const payload = {
            idOwner: idOwner,//compilazione automatica
            idPackage: idPackage,
            status: 0,
            relevance: idPackage,
            brandName: brandName,
            manufacturerName: manufacturerName,//compilazione automatica
            modelName: modelName,
            quantity: quantity,
            price: price,
            pics: input.img,
            productSize: productSize,
            description: description,
            techDetail: techDetail,
            category: category,
            expireDate: expireDate,
            textFocus: textFocus,
            picsFocus: picsFocus,
            views: 0,
            posClick: 0,
            negClick: 0
        }
        /* if (totalPrice === "0") {
            dispatch(createPendingAnnouncementFunc(payload))
                .then((response) => response.payload.statusCode === 200 ? navigate("/") : null)
        } else {
            dispatch(saveAnnouncementPayload(payload))
        } */

    };

    return (
        <div>
            <div className='d-flex justify-content-center mt-5'>
                <Form className='text-light' encType='multipart/form-data'>

                    <img className='myMaxW700 mb-5' src={`http://localhost:5050/uploads/${singleData.pics}`} alt="" />
                    {/* <Form.Group className="mb-3">
                        <input type='file' onChange={(e) => setFile(e.target.files[0])} />
                    </Form.Group> */}

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

                    <Form.Group className='mb-3'>
                        <Form.Label>productSize</Form.Label>
                        <Form.Control type='text' className='form-control' id="productSize" value={productSize} onChange={(e) => setProductSize(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={10} type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>techDetail</Form.Label>
                        <Form.Control as="textarea" rows={10} type="text" className="form-control" id="techDetail" value={techDetail} onChange={(e) => setTechDetail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>expireDate</Form.Label>
                        <Form.Control type="date" className="form-control" id="expireDate" value={expireDate} onChange={(e) => setExpireDate(e.target.value)} />
                    </Form.Group>
                </Form>

            </div>
        </div>
    )
}

export default CardPenRejAnnouncementReducedForm