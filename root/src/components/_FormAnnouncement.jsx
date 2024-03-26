import { React, useEffect, useState } from 'react'
import { postCreateAnnouncementFunc } from '../states/storeState';
import { saveAnnouncementPayload } from '../states/storeState';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Resizer from "react-image-file-resizer";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import productCategories from '../assets/JSON/productCategories.json';
import { setCategoriesProduct, delCategoriesProduct } from '../states/generalState'

function _FormAnnouncement() {

  const dispatch = useDispatch();

  const [file, setFile] = useState("");
  const [idOwner, setIdOwner] = useState(null);
  const [idPackage, setIdPackage] = useState(2);
  const [brandName, setBrandName] = useState("");
  const [manufacturerName, setManufacturerName] = useState("test srl");
  const [modelName, setModelName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [productSize, setProductSize] = useState("");
  const [description, setDescription] = useState("");
  const [techDetail, setTechDetail] = useState("");
  const [category, setCategory] = useState([]);
  const [expireDate, setExpireDate] = useState("");
  const [textFocus, setTextFocus] = useState("");
  const [picsFocus, setPicsFocus] = useState("");

  const [totalPrice, setTotalPrice] = useState("1.99");

  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isFirstTry, setIsFirstTry] = useState(true);

  const navigate = useNavigate();

  const categoriesProduct = useSelector((state) => state.general.categoriesProduct);


  const uploadFile = async (file) => {
    const fileData = new FormData();

    [...Array(file.length)].map((el, index) => {
      fileData.append('img', file[index]);
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

    const formFilled = brandName && manufacturerName && modelName && quantity && file && description && category;

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
    if (totalPrice === "0") {
      dispatch(postCreateAnnouncementFunc({ payload: payload, token: localStorage.getItem("token") }))
        .then((response) => response.payload.statusCode === 200 ? navigate("/") : null)
    } else {
      dispatch(saveAnnouncementPayload(payload))
    }

  };

  const resizeFile = async (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        50,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const myResize = async (e) => {
    const file = e.target.files[0];
    const images = await resizeFile(file);
    console.log(images);
    setFile(images);
  }

  const manageCategory = (input) => {
    console.log(categoriesProduct);
    if(!categoriesProduct.includes(input.id))
    dispatch(setCategoriesProduct(input))
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tkn = jwtDecode(token, process.env.JWT_SECRET);
      setIdOwner(tkn.id)
    }
  }, [])




  return (
    <div className='d-flex justify-content-center mt-5'>
      <form className='myMaxW500' encType='multipart/form-data'>

        <Form.Group className="my-5 d-flex align-items-center justify-content-center">
          <label className='myCursor myInputFile border rounded-5 d-flex align-items-center' htmlFor="upload-input">
            <div className='bg-light fw-bold text-dark p-1 px-3 rounded-5'>choose a file</div>
            <p className='text-light m-0 p1 px-3'>{!file ? "select one or multiple images" : file.length == 1 ? JSON.stringify(file[0].name) : `${JSON.stringify(file.length)} images selected`}</p>
          </label>
          <input type='file' style={{ display: "none" }} id="upload-input" multiple onChange={(e) => { /* setFile(e.target.files); */ myResize(e) }} />
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
          <Form.Control type="number" className="form-control" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Product Size</Form.Label>
          <Form.Control type='text' className='form-control' id="productSize" value={productSize} onChange={(e) => setProductSize(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <DropdownButton id="dropdown-basic-button" title={categoriesProduct.length ? categoriesProduct.length === 1 ? "1 item" : `${categoriesProduct.length} items` : "select one or more categories"}>
            <h4 className='w-100 text-center mt-3'>Dental Categories</h4>
            <hr className='w-100 px-5 mt-1' />
            {
              productCategories && productCategories.map((el) => {
                if (el.area === "dental") { return <span className=" text-light p-1 px-3 m-1 rounded-5 myBgAcqua myCursor" onClick={() => { manageCategory(el) }}>{el.eng}</span> }
              })
            }
            <h4 className='w-100 text-center mt-3'>Medical Categories</h4>
            <hr className='w-100 px-5 mt-1' />
            {
              productCategories && productCategories.map((el) => {
                if (el.area === "medical") { return <span className=" text-light p-1 px-3 m-1 rounded-5 myBgRed myCursor" onClick={() => { manageCategory(el) }}>{el.eng}</span> }
              })
            }
          </DropdownButton>
          <div className='d-flex flex-wrap justify-content-center my-3'>
            {
              categoriesProduct && categoriesProduct.map((el) => {
                return <span className={`text-light p-1 px-3 m-1 rounded-5 d-flex align-iems-center ${el.area == "dental" ? "myBgAcqua" : "myBgRed"}`}>{el.eng} <i className="bi bi-trash-fill ms-2 myCursor" onClick={() => { dispatch(delCategoriesProduct(el.id)) }}></i></span>
              })
            }
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tech Detail</Form.Label>
          <Form.Control type="text" className="form-control" id="techDetail" value={techDetail} onChange={(e) => setTechDetail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Expire Date</Form.Label>
          <Form.Control type="date" className="form-control" id="expireDate" value={expireDate} onChange={(e) => setExpireDate(e.target.value)} />
        </Form.Group>

        {/* <Form.Group className="mb-3">
          <Form.Label>textFocus</Form.Label>
          <Form.Control type="text" className="form-control" id="textFocus" value={textFocus} onChange={(e) => setTextFocus(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>picsFocus</Form.Label>
          <Form.Control type="text" className="form-control" id="picsFocus" value={picsFocus} onChange={(e) => setPicsFocus(e.target.value)} />
        </Form.Group> */}

        <div className='d-flex justify-content-center align-items-center gap-3 mb-4'>
          <div className={`${totalPrice === '0' ? 'mb-5' : ''} p-3 border rounded-5 myCursor`} onClick={() => { setTotalPrice("0"); setIdPackage(1) }}>Free</div>
          <div className={`${totalPrice === '1.99' ? 'mb-5' : ''} p-3 bg-primary text-light rounded-5 myCursor`} onClick={() => { setTotalPrice("1.99"); setIdPackage(2) }}>Standard</div>
          <div className={`${totalPrice === '9.99' ? 'mb-5' : ''} p-3 bg-warning text-light rounded-5 myCursor`} onClick={() => { setTotalPrice("9.99"); setIdPackage(3) }}>Boost</div>
        </div>
        {/* <button className="btn btn-primary" onClick={handleCreateFormAnnouncement}>Submit</button> */}

        <Button onClick={formCheck}>Checkout</Button>
        {
          !isFirstTry && !isFormFilled ? <Alert className='mt-3' key="danger" variant="danger">
            Fill the form correctly!
          </Alert> : null
        }

        {/* <Link to='/payment'><button className="btn btn-primary m-3">payment</button></Link> */}
      </form>
    </div>


  )
}


export default _FormAnnouncement
