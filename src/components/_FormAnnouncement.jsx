import { React, useState } from 'react'
import { postCreateAnnouncementFunc } from '../states/storeState';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';

function _FormAnnouncement() {
  const dispatch = useDispatch();

  const [file, setFile] = useState("");
  const [idOwner, setIdOwner] = useState(99);
  const [brandName, setBrandName] = useState("");
  const [manufacturerName, setManufacturerName] = useState("test srl");
  const [modelName, setModelName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [productSize, setProductSize] = useState("");
  const [description, setDescription] = useState("");
  const [techDetail, setTechDetail] = useState("");
  const [category, setCategory] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [textFocus, setTextFocus] = useState("");
  const [picsFocus, setPicsFocus] = useState("");


  const uploadFile = async (file) => {
    const fileData = new FormData();
    fileData.append('img', file);
    console.log(fileData);

    try {
      const response = await fetch('http://localhost:5050/upload', {
        method: 'POST',
        body: fileData,
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };


  const handleCreateFormAnnouncement = async () => {

    const uploadedFile = await uploadFile(file);

    const payload = {
      idOwner: 99,//compilazione automatica
      brandName: brandName,
      manufacturerName: manufacturerName,//compilazione automatica
      modelName: modelName,
      quantity: quantity,
      price: price,
      pics: `http://localhost:5050/uploads/images/${uploadedFile.imgName}`,
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
    console.log(payload);
    dispatch(postCreateAnnouncementFunc(payload))
    /*  .then((res) => {
       if (res.payload.statusCode === 200) {
         console.log("tutto okjkko");
         setBrandName("");
         setManufacturerName("");
         setModelName("");
         setQuantity(null);
         setPrice(null);
         setFile(null);
         setProductSize("");
         setDescription("");
         setTechDetail("");
         setCategory("");
         setExpireDate("");
         setTextFocus("");
         setPicsFocus("") 

       }
     }) */
  };



  return (
    <div className='d-flex justify-content-center'>
      <div className='myMaxW500'>
        <Form.Group>
          <input type='file' onChange={(e) => setFile(e.target.files[0])} />
        </Form.Group>

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
          <Form.Control type="text" className="form-control" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>productSize</Form.Label>
          <Form.Control type='text' className='form-control' id="productSize" value={productSize} onChange={(e) => setProductSize(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>techDetail</Form.Label>
          <Form.Control type="text" className="form-control" id="techDetail" value={techDetail} onChange={(e) => setTechDetail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>expireDate</Form.Label>
          <Form.Control type="date" className="form-control" id="expireDate" value={expireDate} onChange={(e) => setExpireDate(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>textFocus</Form.Label>
          <Form.Control type="text" className="form-control" id="textFocus" value={textFocus} onChange={(e) => setTextFocus(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>picsFocus</Form.Label>
          <Form.Control type="text" className="form-control" id="picsFocus" value={picsFocus} onChange={(e) => setPicsFocus(e.target.value)} />
        </Form.Group>

        <button className="btn btn-primary" onClick={handleCreateFormAnnouncement}>Submit</button>

      </div>
    </div>


  )
}


export default _FormAnnouncement
