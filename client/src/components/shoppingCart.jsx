//jshint esversion:6
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../UserContext'
import { ShoppingCartItem } from "./shoppingCartItem"

const jwt = require('jsonwebtoken');
const axios = require('axios');
axios.defaults.withCredentials = true

export function ShoppingCart () {
  const state = useContext(UserContext);
  const [totalPrice, setTotalPrice] = useState(0)

  // delete from shopping cart
  const handleDeleteFromCart = (productId) => {
    const shoppingCart = state.shoppingCart.filter(product => product.productId!==productId);
    state.setShoppingCart(shoppingCart);
    const cart = jwt.sign({shoppingCart}, 'notimportant', { expiresIn: '7d' });
    localStorage.setItem('Cart', cart, { expires: 7 });
  }

  function purchase(){
    let question = window.confirm("Do you want to purchase?")
    if(question){
      axios.post("/api/users/purchase", state.shoppingCart)
      .then(res => {if(res.status===200){
                      state.setShoppingCart([]);
                      localStorage.removeItem('Cart');
                      alert('Purchase success');
                    }else{
                      alert('Purchase failed');
                    }})
      .catch(err => console.log(err));
    }
  }

  // calculate the total price once the cart changed
  useEffect(()=>{
    let tempTotalPrice = 0
    state.shoppingCart.forEach((product)=>{
      tempTotalPrice += product.price * product.count;
    })
    setTotalPrice(tempTotalPrice);
  },[state.shoppingCart])


    return(
        <div className="container mt-5" id="cart-page">
          <div>
            <h5 className="font-weight-bold"><i className="fas fa-shopping-cart fa-2 mr-2"></i>My Cart</h5>
            <hr className="w-50"/>
            {state.shoppingCart.map(eachIdAndCount => (<ShoppingCartItem
                                                        key={eachIdAndCount.productId}
                                                        count={eachIdAndCount.count}
                                                        handleDeleteFromCart={handleDeleteFromCart}
                                                        productId={eachIdAndCount.productId}/>))}
          </div>
          <div className="mx-auto w-75 text-right mt-5">
            <h5 className="my-4">Total: ${totalPrice}</h5>
            {totalPrice===0 ? <button className="btn btn-lg btn-secondary mb-5" disabled>Purchase</button> : <button className="btn btn-lg btn-warning mb-5" onClick={purchase}>Purchase</button>}
          </div>
        </div>
    )
  }
