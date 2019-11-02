//jshint esversion:6
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from "../UserContext.js";
import { useHistory } from "react-router-dom";

const jwt = require('jsonwebtoken');
const axios = require('axios');

export function ProductDetailPage(props){
  // global state
  const state = useContext(UserContext);
  //local state
  const [product, setProduct] = useState({name:'', description:'', price:0})
  const [count, setCount] = useState(0);
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

  // retrieve product data
  useEffect(() => {
    getProductInfo();
  },[])

  // fetch the product data
  function getProductInfo(){
    axios.get("/api/products/"+ props.match.params.id)
    .then(res => setProduct({name:res.data.name,
                             description:res.data.description,
                             price:res.data.price}))
    .catch(err => console.log(err));
  }

  function deleteProduct(){
    let question = window.confirm("Do you really want to delete this product?");
    if (question){
      axios.delete("/api/products/delete/"+ props.match.params.id)
      .then(res => res.status===200 ? setProduct({name:'', description:'', price:0}) : console.log('delete failed'))
      .then(result => history.push("/products"))
      .catch(err => console.log(err));
    }
  }

  // add to shopping cart
  const handleAddToCart = (productId, count, price) => {
    let shoppingCart = state.shoppingCart;
    shoppingCart = shoppingCart.filter(product => product.productId!==productId)
    shoppingCart.push({productId, count, price});
    state.setShoppingCart(shoppingCart);
    const cart = jwt.sign({shoppingCart}, 'notimportant', { expiresIn: '7d' });
    localStorage.setItem('Cart', cart);
  }

  function handleIncrement(){
    setCount(count+1);
  }

  function handleDecrement(){
    if(count>0){setCount(count-1)}
  }

    let updateLink = props.match.params.id + "/update";

    return(
        <div className="w-75 mt-5 mx-auto detail-page">
          <div className="row">
            <div className="col-lg-6 col-md-12 ">
              <div className='m-3'>
                <img className="img-fluid detail-image" src={'/api/products/getImage/' + props.match.params.id} alt="product-img"/>
              </div>
            </div>
            <div className='col-lg-6 col-md-12'>
                <h2 className='my-3 font-weight-bolder'>{product.name}</h2>
                <h4 className='my-3 font-weight-bold'>$ {product.price}</h4>
                {count===0 ? <button className="btn btn-sm btn-secondary mr-3" disabled>-</button>
                           : <button onClick={handleDecrement} className="btn btn-sm btn-warning mr-3">-</button>}
                <span className='my-3 count-number'>{count}</span>
                <button onClick={handleIncrement} className="btn btn-sm btn-warning m-3">+</button>
                {count===0 ? <button className="btn btn-sm btn-secondary" disabled>Add To Cart</button>
                           : <button onClick={()=>handleAddToCart(props.match.params.id, count, product.price)} className="btn btn-sm btn-warning">Add To Cart</button>}
                <a href={updateLink} className="btn btn-sm btn-warning m-3">Change</a>
                <button className="btn btn-sm btn-danger" onClick={deleteProduct}>Delete</button>
                <br/>
                <p className="mt-3">{product.description}</p>
            </div>
          </div>
        </div>
    )
  }
