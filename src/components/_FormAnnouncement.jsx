import { React, useState } from 'react'
import { postCreateFormFunc } from '../states/storeState';
import { useDispatch } from 'react-redux';

function _FormAnnouncement() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    ownerId: "",
    brandName: "",
    modelName: "",
    quantity: "",
    price: "",
    pics: "",
    description: "",
    category: "",
    subcategory: "",
    location: "",
    tags: "",
    interests: "",

  });

  const handleCreateFormAnnouncement = (e) => {
    e.preventDefault();
    dispatch(postCreateFormFunc(formData));

    //pulisce il form
    setFormData({
      ownerId: "",
      brandName: "",
      modelName: "",
      quantity: "",
      price: "",
      pics: "",
      description: "",
      category: "",
      subcategory: "",
      location: "",
      tags: "",
      interests: "",

    });
    console.log(formData);

  };



  return (
    <div className='d-flex justify-content-center vh-100'>
      <form onSubmit={handleCreateFormAnnouncement}>
        <div className="mb-3">
          <label htmlFor='ownwerId' className="form-label">Owner ID</label>
          <input type="text" className="form-control" id="ownerId" value={formData.ownerId} onChange={(e) => setFormData({ ...formData, ownerId: e.target.value })} />
        </div>
        <div className="mb-3">
          <label htmlFor='brandName' className="form-label">Brand Name</label>
          <input type="text" className="form-control" id="brandName" value={formData.brandName} onChange={(e) => setFormData({ ...formData, brandName: e.target.value })} />
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
        <div className="mb-3">
          <label htmlFor='description' className="form-label">Description</label>
          <input type="text" className="form-control" id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        </div>
        <div className="mb-3">
          <label htmlFor='category' className="form-label">Category</label>
          <input type="text" className="form-control" id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
        </div>
        <div className="mb-3">
          <label htmlFor='subcategory' className="form-label">Subcategory</label>
          <input type="text" className="form-control" id="subcategory" value={formData.subcategory} onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })} />
        </div>
        <div className="mb-3">
          <label htmlFor='location' className="form-label">Location</label>
          <input type="text" className="form-control" id="location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
        </div>
        <div className="mb-3">
          <label htmlFor='tags' className="form-label">Tags</label>
          <input type="text" className="form-control" id="tags" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} />
        </div>
        <div className="mb-3">
          <label htmlFor='interests' className="form-label">Interests</label>
          <input type="text" className="form-control" id="interests" value={formData.interests} onChange={(e) => setFormData({ ...formData, interests: e.target.value })} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>

      </form>

    </div>
  )
}


export default _FormAnnouncement
