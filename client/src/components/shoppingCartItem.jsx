//jshint esversion:6
import React, { useState, useEffect } from 'react';

const axios = require('axios')

export function ShoppingCartItem(props){
  const [product, setProduct] = useState({name:'', price:0})

  useEffect(()=>{
    getProductOfCart();
  }, [])

  function getProductOfCart(){
    axios.get("/api/products/"+ props.productId)
    .then(res => setProduct({name:res.data.name, price:res.data.price}))
    .catch(err => console.log(err));
  }

  let productPath = '/products/' + props.productId;

  return(
    <div>
      <table className='w-100 cart-table mb-4 animated lightSpeedIn faster'>
        <tbody>
          <tr>
            <th><a href={productPath}><img className='img-fluid' src={'/api/products/getImage/' + props.productId} alt="product-img"/></a></th>
            <th>{product.name}</th>
            <th>Qty:&emsp;{props.count}</th>
            <th className="item-price">Price:&emsp;${product.price}</th>
            <th><button onClick={() => {props.handleDeleteFromCart(props.productId)}} className="btn btn-sm btn-danger mr-3">X</button></th>
          </tr>
        </tbody>
      </table>
      <hr className="w-50"/>
    </div>
  )
}


export default ShoppingCartItem;
