//jshint esversion:6
import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from "../UserContext.js";

const axios = require('axios');

export function ProductUpdatePage(props){
  // global state
  const state = useContext(UserContext);
  // local state
  const [product, setProduct] = useState({name:'', price:0, description:''});
  const [image, setImage] = useState(null);
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

  useEffect(()=>{
    axios.get("/api/products/"+ props.match.params.id)
    .then(res => setProduct({name:res.data.name,
                            description:res.data.description,
                            price:res.data.price}))
    .catch(err => console.log(err));
    setImage('/api/products/getImage/' + props.match.params.id);
  },[props])

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
    console.log(image);
  }

  function onSubmitProduct(e){
    e.preventDefault();
    let question = window.confirm("Do you really want to update the product?");
    if(question){
      const productToUpdated = {
        name: product.name,
        description:product.description,
        price:product.price,
        id: props.match.params.id
      };
      console.log(productToUpdated);
      // update product data
      axios.patch("/api/products/update", productToUpdated)
      .then(function(res){
        console.log(res.data);
        // update product image
        axios.post("/api/products/uploadImage", {imageName: props.match.params.id+'.png', imageData: image})
        .then(function(res){
          console.log(res.data);
          history.push("/products");
        })
        .catch(err => console.log(err));
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
              <textarea rows="6" className="form-control" name="description" value={product.description} onChange={onChangeData} placeholder="Descripte the product" />
            </div>
            <button type="submit" className="btn btn-block btn-warning mb-3"><i className="fas fa-pen fa-lg mr-2"></i>Update</button>
        </form>
        </div>
      </div>
    )
  }
