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
import { setCategoriesProduct, delCategoriesProduct } from '../states/generalState';
import countriesArray from '../assets/JSON/countriesIso2Arry.json';
import { setSellingAreaExcluded, delSellingAreaExcluded, clearSellingAreaExcluded } from '../states/generalState';
import PackageCardAnn from './PackageCardAnn';
import packageAnnouncement from '../assets/JSON/packageAnnouncement.json';

function _FormAnnouncement() {

  const dispatch = useDispatch();

  const [file, setFile] = useState("");
  const [idOwner, setIdOwner] = useState(null);
  const [idPackage, setIdPackage] = useState(2);
  const [brandName, setBrandName] = useState("");
  const [manufacturerName, setManufacturerName] = useState("");
  const [modelName, setModelName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [productSize, setProductSize] = useState("");
  const [description, setDescription] = useState("");
  const [techDetail, setTechDetail] = useState("");
  const [techDetailView, setTechDetailView] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [textFocus, setTextFocus] = useState("");
  const [picsFocus, setPicsFocus] = useState("");
  const [step, setStep] = useState(0);

  const [totalPrice, setTotalPrice] = useState("9.99");

  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isFirstTry, setIsFirstTry] = useState(true);

  const [addArea, setAddArea] = useState(false);
  const [sellWholeWorld, setSellWholeWorld] = useState(true);

  //errors
  const [techDetailValueError, setTechDetailValueError] = useState(false);

  const navigate = useNavigate();

  const categoriesProduct = useSelector((state) => state.general.categoriesProduct);
  const categoriesProductId = useSelector((state) => state.general.categoriesProductId);
  const sellingAreaExcludedISO = useSelector((state) => state.general.sellingAreaExcludedISO);


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

  /* base64 image preview*/
  const [base64Img, setBase64Img] = useState([]);
  const uploadBase64 = async (e) => {
    let img64Arry = [];
    [...Array(e.target.files.length)].map(async (el, index) => {
      const myFile = e.target.files[index];
      const base64 = await convertBase64(myFile);
      img64Arry.push(base64);
      setBase64Img(img64Arry);
    })
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  const formCheck = async () => {

    const formFilled = brandName && modelName && quantity && file && description && categoriesProduct;

    if (formFilled) {
      setIsFormFilled(true);
      setIsFirstTry(false);
      const uploadedFile = await uploadFile(file);
      console.log(uploadedFile);
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
      rejReasons: "",
      brandName: brandName,
      manufacturerName: manufacturerName,//compilazione automatica
      modelName: modelName,
      quantity: quantity,
      price: price,
      pics: input.img.toString(),
      productSize: productSize,
      description: description,
      techDetail: techDetail.toString(),
      category: categoriesProductId.toString(),
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
      setFile(imgArray);
    });
  }

  const manageCategory = (input) => {
    const { el, e } = input;
    if (e.currentTarget.classList.toggle('borderActive')) {
      dispatch(setCategoriesProduct(el));
    } else {
      dispatch(delCategoriesProduct(el.id))
    }

  }

  const manageStep = (input) => {
    if (input && step < 5) {
      setStep(step + 1)
    }
    if (!input && step > 0) {
      setStep(step - 1)
    }
  };

  const deleteTechItem = (input) => {
    let newTechDetailArry = [];
    techDetail.map((el) => {
      if (el.split("£")[0] !== input) {
        newTechDetailArry.push(el);
      }
    })
    setTechDetail(newTechDetailArry)
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tkn = jwtDecode(token, process.env.JWT_SECRET);
      setIdOwner(tkn.id)
    }
  }, [])


  return (

    <div className='d-flex justify-content-center'>
      <div className='myMaxW1000 w-100 mt-5'>

        <h1 className='text-center text-secondary fw-light'>New Announcement</h1>
        {/* progress bar */}
        <div className='d-flex justify-content-center mt-3'>
          <div className='myMaxW300 position-relative progressStepBar d-flex justify-content-center align-items-center'>
            <div className='d-flex align-items-center justify-content-between'>
              <div className={`${step >= 0 ? "active" : ""}`}></div>
              <div className={`${step >= 1 ? "active" : ""}`}></div>
              <div className={`${step >= 2 ? "active" : ""}`}></div>
              <div className={`${step >= 3 ? "active" : ""}`}></div>
              <div className={`${step >= 4 ? "active" : ""}`}></div>
              <div className={`${step >= 5 ? "active" : ""}`}></div>
            </div>
            <div className='position-absolute'></div>
            <div className='position-absolute'
              style={{
                background: `${step === 0 ?
                  "linear-gradient(to right, #14a7ad 10%, #fff 10%, #fff, #fff)"
                  : step === 1 ?
                    "linear-gradient(to right, #14a7ad 30%, #fff 10%, #fff)"
                    : step === 2 ?
                      "linear-gradient(to right, #14a7ad 50%, #fff 10%)"
                      : step === 3 ?
                        "linear-gradient(to right, #14a7ad 70%, #fff 10%)"
                        : step === 4 ?
                          "linear-gradient(to right, #14a7ad 90%, #fff 10%)"
                          : step === 5 ?
                            "linear-gradient(to right, #14a7ad 100%, #fff 10%)"
                            : "#14a7ad"
                  }`
              }}></div>
          </div>
        </div>

        <form encType='multipart/form-data'>

          {
            step === 0 ?
              <div>
                <Form.Group className="my-5 d-flex align-items-center justify-content-center">
                  <label className='myCursor myInputFile border rounded-5 d-flex align-items-center' htmlFor="upload-input">
                    <div className='bg-light fw-bold text-dark p-1 px-3 rounded-5'>choose a file</div>
                    <p className='text-light m-0 p1 px-3'>{!file ? "select one or multiple images" : file.length == 1 ? JSON.stringify(file[0].name) : `${JSON.stringify(file.length)} images selected`}</p>
                  </label>
                  <input type='file' style={{ display: "none" }} id="upload-input" multiple onChange={(e) => { myResize(e); uploadBase64(e) }} />
                </Form.Group>

                <div className='d-flex justify-content-center myOverFlowXHidden'>
                  {
                    base64Img && base64Img.map((el) => {
                      return <div className='mySquare80 myOverflowYHidden border d-flex align-items-center'><img className='w-100' src={el} alt="" /></div>
                    })
                  }
                </div>

              </div>
              : null
          }

          {
            step === 1 ?
              <div className='px-2 mt-5'>
                <Form.Group className="mb-3">
                  {brandName ? <Form.Label className='ms-3'>Brand Name</Form.Label> : null}
                  <Form.Control type="text" placeholder="Brand name" className="form-control" id="brandName" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                  {modelName ? <Form.Label className='ms-3'>Model Name</Form.Label> : null}
                  <Form.Control type="text" placeholder="Model name" className="form-control" id="modelName" value={modelName} onChange={(e) => setModelName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                  {price ? <Form.Label className='ms-3'>Price</Form.Label> : null}
                  <Form.Control type="number" placeholder="Price" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </Form.Group>

                <Form.Group >
                  {quantity ? <Form.Label className='ms-3'>Quantity</Form.Label> : null}
                  <Form.Control type="number" placeholder="Quantity" className="form-control" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </Form.Group>

                <div className='text-center my-4'><span className=' display-6 bg-dark text-light py-2 px-4 rounded-5'>{price && quantity && quantity != 0 ? (Math.round(price * 1000 / quantity) / 1000) : 0} € /item</span></div>

                <Form.Group className='mb-3 pt-2'>
                  {productSize ? <Form.Label className='ms-3'>Product Size</Form.Label> : null}
                  <div className='d-flex flex-column align-items-center'>
                    <Form.Control disabled={productSize === "Spaceless" ? true : false} type='text' placeholder='Product size' className='form-control' id="productSize" value={productSize} onChange={(e) => setProductSize(e.target.value)} />
                    <Form className='mt-2'><Form.Check defaultChecked={productSize === "Spaceless" ? "checked" : ""} type="switch" id="custom-switch" label="The product is spaceless" onClick={() => { setProductSize(productSize === "Spaceless" ? "" : "Spaceless") }} /></Form>
                  </div>
                </Form.Group>
              </div>
              : null
          }

          {
            step === 2 ?
              <Form.Group className="mb-3">
                <div className='d-flex flex-wrap justify-content-center w-100 pt-5 pb-3'>
                  <div>
                    <div className='d-flex justify-content-center'><Form.Label >Select one or more categories</Form.Label></div>

                    <h4 className='w-100 text-center mt-3'>Dental Categories</h4>
                    <hr className='w-100 px-5 mt-1' />
                    <div className='d-flex flex-wrap justify-content-center'>
                      {
                        productCategories && productCategories.map((el) => {
                          if (el.area === "dental") { return <span className="text-light px-2 m-1 rounded-5 myBgAcqua myCursor myBorderAcqua" onClick={(e) => { manageCategory({ el, e }) }}>{el.eng}</span> }
                        })
                      }
                    </div>
                    <h4 className='w-100 text-center mt-3'>Medical Categories</h4>
                    <hr className='w-100 px-5 mt-1' />
                    <div className="d-flex flex-wrap justify-content-center">
                      {
                        productCategories && productCategories.map((el) => {
                          if (el.area === "medical") { return <span className=" text-light px-2 m-1 rounded-5 myBgRed myCursor myBorderRed" onClick={(e) => { manageCategory({ el, e }) }}>{el.eng}</span> }
                        })
                      }
                    </div>

                  </div>
                </div>

                {
                  categoriesProduct.length > 0 ?
                    <div className='border bg-dark rounded-5 mt-3 p-2 mx-2'>
                      <h6 className='text-center text-light fw-light'>Selected category/ies:</h6>
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
              </Form.Group>
              : null
          }

          {
            step === 3 ?
              <div className='px-2 mt-5'>
                <Form.Group className="mb-3">
                  {description ? <Form.Label className='ms-3'>Description</Form.Label> : null}
                  <Form.Control type="text" placeholder='Description' as="textarea" rows={5} className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3 mt-5">
                  <Form.Label className='ms-3'>Tech Detail</Form.Label>
                  {
                    techDetail ?
                      <ul className='bg-light py-2 rounded-2'>
                        {
                          techDetail && techDetail.map((el) => {
                            return <li className='me-3 mt-2' style={{ borderBottom: "1px solid lightGray" }}>{el.split("£")[1]}<i className="bi bi-x-lg text-danger ms-2 myCursor" onClick={() => { deleteTechItem(el.split("£")[0]) }}></i></li>
                          })
                        }
                      </ul>
                      : null
                  }
                  <div className='d-flex gap-1 rounded-5 align-items-center pe-1 bg-dark border'>
                    <Form.Control type="text" placeholder='type a detail and click plus' className="form-control" id="techDetail" value={techDetailView} onChange={(e) => { if (e.nativeEvent.data !== "£" && e.nativeEvent.data !== ",") { setTechDetailView(e.target.value) } else { setTechDetailValueError(true) } }} />
                    <button className={`rounded-5 ${techDetailView ? "bg-info" : "bg-secondary"}`} disabled={techDetailView ? false : true} onClick={() => { setTechDetail([...techDetail, `${techDetail.length + 1}£` + techDetailView]); setTechDetailView("") }}><i className="bi bi-plus-lg text-light text-info" ></i></button>
                  </div>
                  {techDetailValueError ? <div className='mt-2 ms-3'>The "£" and "," values are not permitted!</div> : null}
                </Form.Group>
              </div>
              : null
          }

          {
            step === 4 ?
              <div className='py-4 px-3'>
                <div>{/* per i Produttori */}
                  <h4 className='text-secondary fw-light mb-2'>Selling Area</h4>
                  <p className='text-secondary fw-light mb-4'>Select country/ies you would like to exclude from your Selling Area. Your announcements will not be visible in selected country/ies automatically. This preferences affects only this announcement.</p>
                  <div className='d-flex justify-content-start'>
                    {
                      addArea ?
                        <DropdownButton className="mb-3 w-100" variant='dark' id="dropdown-basic-button" title="exclude a country">
                          {
                            countriesArray && countriesArray.iso2.map((el) => {
                              return <Dropdown.Item onClick={() => { dispatch(setSellingAreaExcluded(el)); setAddArea(false) }}>{el.split(":")[0]}</Dropdown.Item>
                            })
                          }
                        </DropdownButton>
                        :
                        <div className='d-flex gap-4 align-items-center flex-wrap'>
                          <Form><Form.Check defaultChecked={sellWholeWorld ? "checked" : ""} type="switch" id="custom-switch" label="I wanto to sell to the entire world" onClick={() => { setSellWholeWorld(!sellWholeWorld); dispatch(clearSellingAreaExcluded()) }} /></Form>
                          <div className={`${sellWholeWorld ? "disabledPlus" : null} d-flex align-items-center flex-wrap gap-2 text-primary myCursor`} onClick={() => { setAddArea(true) }}><div className='myBgWhite plusDistributionArea d-flex align-items-center justify-content-center border' ><i className="bi bi-plus-lg text-primary"></i></div>exclude a country</div>
                        </div>
                    }

                  </div>
                  <div className='mt-3'>
                    {
                      sellingAreaExcludedISO && sellingAreaExcludedISO.map((item) => {
                        return <span className='bg-dark text-light me-2 my-1 p-1 px-3 rounded-5 distAreaCountry'>{item.split(":")[0]}<i className="bi bi-trash-fill text-danger ms-2 myCursor" onClick={() => { dispatch(delSellingAreaExcluded(item)) }}></i></span>
                      })
                    }
                  </div>
                </div>
              </div>
              :
              null
          }

          {
            step === 5 ?
              <div>

                <div className='d-flex justify-content-center align-items-center gap-3 mt-5'>

                  <div className=' d-flex align-items-center gap-2'>
                    <div className={`${totalPrice === '0' ? 'myBorderActive myGradientFreely' : 'bg-secondary'} p-3 py-2 rounded-5 myCursor text-light`} onClick={() => { setTotalPrice("0"); setIdPackage(1) }}>Freely</div>
                    <div className={`${totalPrice === '9.99' ? 'myBorderActive myGradientWeekly' : 'bg-secondary'} p-3 py-2 text-light rounded-5 myCursor`} onClick={() => { setTotalPrice("9.99"); setIdPackage(2) }}>Weekly</div>
                    <div className={`${totalPrice === '29.99' ? 'myBorderActive myGradientMonthly' : 'bg-secondary'} p-3 py-2 text-light rounded-5 myCursor`} onClick={() => { setTotalPrice("29.99"); setIdPackage(3) }}>Monthly</div>
                  </div>

                </div>

                <div className='d-flex justify-content-center mt-4'>
                  {
                    packageAnnouncement.map((el) => {
                      if (el.id === idPackage) {
                        return <PackageCardAnn el={el} />
                      }
                    })
                  }

                </div>
                <div className='d-flex justify-content-center mt-4'>
                  <Button className='mb-2' onClick={formCheck}>Purchase</Button>
                </div>

              </div>
              : null
          }



          <div className='d-flex align-items-center justify-content-center pt-3'>
            {
              step === 0 ?
                <Button variant="primary" disabled={file ? false : true} onClick={() => { manageStep(true) }}><i className="bi bi-check2-square me-2"></i>done</Button>
                : step === 1 ?
                  <div className='d-flex gap-4 align-items-center mb-5'>
                    <h5 className='bi bi-arrow-return-left myCursor m-0' variant="secondary" onClick={() => { manageStep(false) }}> back</h5>
                    <Button variant="primary" disabled={brandName && modelName && quantity && quantity != 0 && price && price != 0 && productSize ? false : true} onClick={() => { manageStep(true) }}><i className="bi bi-check2-square me-2"></i>done</Button>
                  </div>
                  : step === 2 ?
                    <div className='d-flex gap-4 align-items-center mb-5'>
                      <h5 className='bi bi-arrow-return-left myCursor m-0' variant="secondary" onClick={() => { manageStep(false) }}> back</h5>
                      <Button variant="primary" disabled={categoriesProduct.length > 0 ? false : true} onClick={() => { manageStep(true) }}><i className="bi bi-check2-square me-2"></i>done</Button>
                    </div>
                    : step === 3 ?
                      <div className='d-flex gap-4 align-items-center mb-5'>
                        <h5 className='bi bi-arrow-return-left myCursor m-0' variant="secondary" onClick={() => { manageStep(false) }}> back</h5>
                        <Button variant="primary" disabled={description && techDetail ? false : true} onClick={() => { manageStep(true) }}><i className="bi bi-check2-square me-2"></i>done</Button>
                      </div>
                      : step === 4 ?
                        <div className='d-flex gap-4 align-items-center mb-5'>
                          <h5 className='bi bi-arrow-return-left myCursor m-0' variant="secondary" onClick={() => { manageStep(false) }}> back</h5>
                          <Button variant="primary" disabled={sellingAreaExcludedISO.length > 0 || sellWholeWorld ? false : true} onClick={() => { manageStep(true) }}><i className="bi bi-check2-square me-2"></i>done</Button>
                        </div>
                        : null
            }
          </div>

          {
            !isFirstTry && !isFormFilled ? <Alert className='mt-3' key="danger" variant="danger">
              Fill the form correctly!
            </Alert> : null
          }

          {/* <Link to='/payment'><button className="btn btn-primary m-3">payment</button></Link> */}
        </form>
      </div>
    </div>


  )
}


export default _FormAnnouncement
