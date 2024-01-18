import { React, useState } from 'react'
 import {  postCreateAnnouncementFunc } from '../states/storeState';
import { useDispatch } from 'react-redux';

function _FormAnnouncement() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    idOwner: "",
    brandName: "",
    manufacturerName:"",
    modelName: "",
    quantity: "",
    price: "",
    pics: "",
    productSize:"",
    description: "",
    techDetail:"",
    category: "",
    expireDate:"",
    textFocus:"",
    picsFocus:"",
    views:"",
    posClick:"",
    negClick:""

   
  });

  const handleCreateFormAnnouncement = (e) => {
    e.preventDefault();
    dispatch( postCreateAnnouncementFunc(formData));

    //pulisce il form
    setFormData({
      idOwner: "",
    brandName: "",
    manufacturerName:"",
    modelName: "",
    quantity: "",
    price: "",
    pics: "",
    productSize:"",
    description: "",
    techDetail:"",
    category: "",
    expireDate:"",
    textFocus:"",
    picsFocus:"",
    views:"",
    posClick:"",
    negClick:""

    });
    console.log(formData);

  };



  return (
    <div className='d-flex justify-content-center'>
      <form onSubmit={handleCreateFormAnnouncement}>
        <div className="mb-3">
          <label htmlFor='ownwerId' className="form-label">Owner ID</label>
          <input type="text" className="form-control" id="idOwner" value={formData.idOwner} onChange={(e) => setFormData({ ...formData, idOwner: e.target.value })} />
        </div>
        <div className="mb-3">
          <label htmlFor='brandName' className="form-label">Brand Name</label>
          <input type="text" className="form-control" id="brandName" value={formData.brandName} onChange={(e) => setFormData({ ...formData, brandName: e.target.value })} />
        </div>
        <div className='mb-3'>
          <label htmlFor=' manufacturerName' className=""> manufacturerName</label>
          <input type='text' className='form-control' id=' manufacturerName' value={formData.manufacturerName} onChange={(e) => setFormData({...formData,manufacturerName: e.target.value})} />

        </div>
        <div className="mb-3">
          <label htmlFor='modelName' className="form-label">Model Name</label>
          <input type="text" className="form-control" id="modelName" value={formData.modelName} onChange={(e) => setFormData({ ...formData, modelName: e.target.value })} />
        </div>
        <div className="mb-3">
          <label htmlFor='quantity' className="form-label">Quantity</label>
          <input type="text" className="form-control" id="quantity" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} />
        </div>
        <div className="mb-3">
          <label htmlFor='price' className="form-label">Price</label>
          <input type="text" className="form-control" id="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
        </div>
        <div className="mb-3">
          <label htmlFor='pics' className="form-label">Pics</label>
          <input type="text" className="form-control" id="pics" value={formData.pics} onChange={(e) => setFormData({ ...formData, pics: e.target.value })} />
        </div>
        <div className='mb-3'>
          <label htmlFor=' productSize' className="">productSize</label>
          <input type='text' className='form-control' id=' productSize' value={formData.productSize} onChange={(e) => setFormData({...formData, productSize: e.target.value})} />

        </div>
        <div className="mb-3">
          <label htmlFor='description' className="form-label">Description</label>
          <input type="text" className="form-control" id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        </div>
        <div className="mb-3">
          <label htmlFor='category' className="form-label">Category</label>
          <input type="text" className="form-control" id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
        </div>
        <div className="mb-3">
          <label htmlFor='techDetail' className="form-label">techDetail</label>
          <input type="text" className="form-control" id="techDetail" value={formData.techDetail} onChange={(e) => setFormData({ ...formData, techDetail: e.target.value })} />
        </div>
        <div className="mb-3">
          <label htmlFor='expireDate' className="form-label">expireDate</label>
          <input type="date" className="form-control" id="expireDate" value={formData.expireDate} onChange={(e) => setFormData({ ...formData, expireDate: e.target.value })} />
        </div>
        <div className="mb-3">
          <label htmlFor='textFocus' className="form-label">textFocus</label>
          <input type="text" className="form-control" id="textFocus" value={formData.textFocus} onChange={(e) => setFormData({ ...formData, textFocus: e.target.value })} />
        </div>
        <div className="mb-3">
          <label htmlFor='picsFocus' className="form-label">picsFocus</label>
          <input type="text" className="form-control" id="picsFocus" value={formData.picsFocus} onChange={(e) => setFormData({ ...formData, picsFocus: e.target.value })} />
        </div>
        <div className="mb-3">
          <label htmlFor='views' className="form-label">views</label>
          <input type="text" className="form-control" id="views" value={formData.views} onChange={(e) => setFormData({ ...formData, views: e.target.value })} />
        </div>
        <div className="mb-3">
          <label htmlFor='posClick' className="form-label"> posClick</label>
          <input type="text" className="form-control" id=" posClick" value={formData.posClick} onChange={(e) => setFormData({ ...formData, posClick: e.target.value })} />
        </div>
        <div className="mb-3">
          <label htmlFor='negClick' className="form-label">negClick</label>
          <input type="text" className="form-control" id="negClick" value={formData.negClick} onChange={(e) => setFormData({ ...formData, negClick: e.target.value })} />
        </div>
        
        
       
        <button type="submit" className="btn btn-primary">Submit</button>

      </form>

    </div>
  )
}


export default _FormAnnouncement
