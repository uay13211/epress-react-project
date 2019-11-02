//jshint esversion:6
import React, { useState, useEffect, useMemo } from 'react';
import "bootstrap-social/bootstrap-social.css"
import './App.css';
import { Home } from "./components/homePage";
import "./components/js/homePageAnimation.js";
import { Login } from "./components/loginPage";
import { Register } from "./components/registerPage";
import { Navbar } from "./components/Navbar";
import { ProductPage } from "./components/productPage";
import { ProductAddPage } from "./components/productAddPage";
import { ProductDetailPage } from "./components/productDetailPage";
import { ProductUpdatePage } from "./components/productUpdatePage";
import { ShoppingCart } from "./components/shoppingCart";
import { BrowserRouter, Route } from "react-router-dom";
import { UserContext } from "./UserContext.js";

const jwt = require('jsonwebtoken');
const axios = require('axios');
axios.defaults.withCredentials = true

export function App() {

  // global state
  const [autheticated, setAutheticated] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);
  const state = useMemo(() => ({autheticated, setAutheticated, shoppingCart, setShoppingCart}), [autheticated, shoppingCart]);

  //Check the acess token
  useEffect(()=>{
    axios.post('/api/users/auth')
    .then(function(res){
      if(res.status===200){
        setAutheticated(true)
      }else{
        setAutheticated(false);
      }
    })
    .catch(err => console.log(err));
  }, [autheticated]);

  // get the shopping cart from cookies
  useEffect(()=>{
    const existCartHash = localStorage.getItem('Cart');
    if (existCartHash){
      const decoded = jwt.verify(existCartHash, 'notimportant');
      setShoppingCart(decoded.shoppingCart);
    }
  }, [localStorage.getItem('Cart')]);

    return (
      <BrowserRouter>
      <UserContext.Provider value={state}>
        <div>
          <Navbar/>
          <div className="main">
            <Route path="/" exact component={Home}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/products" exact component={ProductPage}/>
            <Route path="/addProduct" exact component={ProductAddPage}/>
            <Route path="/products/:id/update" exact component={ProductUpdatePage}/>
            <Route path="/products/:id" exact component={ProductDetailPage}/>
            <Route path="/mycart" exact component={ShoppingCart}/>
          </div>
        </div>
      </UserContext.Provider>
      </BrowserRouter>
    );
  }
