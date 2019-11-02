//jshint esversion:6
import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from "../UserContext.js";

const axios = require('axios')

export function ProductAddPage(){
  // global state
  const state = useContext(UserContext);
  // local state
  const [product, setProduct] = useState({name:'', price:0, description:''})
  const [image, setImage] = useState(null)
  let history = useHistory();

  // have to login
  useEffect(()=>{
    axios.post('/api/users/auth')
    .then(function(res){
      if(res.status===200){
        state.setAutheticated(true);
      }
    })
    .catch(err => {state.setAutheticated(false);
                  history.push('/')});
  }, [state.autheticated])

  function onChangeData(e){
    setProduct({...product, [e.target.name]:e.target.value});
  }

  function onChangeImage(e){
    e.preventDefault();
    let reader = new FileReader();
    reader.onload = function(event) {
      setImage(event.target.result)
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  function onSubmitProduct(e){
    e.preventDefault();
    let question = window.confirm("Do you want to add the new product?");
    if(question){
      // post the product first
      axios.post("/api/products/add", product)
      .then(function(res){
        if(res.status===200){
          console.log('product added');
          // post the image later on
          axios.post("/api/products/uploadImage", {imageName: res.data+'.png', imageData: image})
          .then(res => {
            console.log(res.data);
            history.push("/products");
          })
          .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
    }
  }

    return(
      <div className="w-75 row mx-auto mt-5">
        <div className="col-lg-6">
            {image ? <img className="img-fluid product-update-image my-3" src={image} alt="product-img"/> : image}
            {!image ? <div className="file-upload-input my-4">
              <input onChange={onChangeImage} type="file" name="productImage" accept="image/*" id="customFileUpload" required />
              <i className="fas fa-upload fa-3x file-upload-icon"></i>
              <label className="file-upload-label">Or Drop It Here.</label>
              </div> :
              <div className="file-upload-input text-center my-4">
                <input onChange={onChangeImage} className='text-center' type="file" name="productImage" accept="image/*" required />
              </div>}
        </div>
        <div className="col-lg-6">
        <form  onSubmit={onSubmitProduct}>
            <div className="form-group">
              <label>Product name</label>
              <input type="text" className="form-control" name="name" value={product.name} onChange={onChangeData} placeholder="Enter product name" />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="number" className="form-control" name="price" value={product.price} onChange={onChangeData} placeholder="Enter product price" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea rows="10" className="form-control" name="description" value={product.description} onChange={onChangeData} placeholder="Descripte the product" />
            </div>
            <button type="submit" className="btn btn-block btn-warning my-3">Add</button>
        </form>
        </div>
      </div>
    )
}
