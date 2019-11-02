//jshint esversion:6
import React, { useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../UserContext.js"

const axios = require('axios');
axios.defaults.withCredentials = true

export function Navbar() {
  // global state
  const state = useContext(UserContext);

  let history = useHistory();

  //remove token
  function logout(){
    let question = window.confirm("Are you sure you want to log out?")
    if(question){
      axios.post("/api/users/logout")
      .then(function(res){state.setAutheticated(false);history.push("/");})
      .catch(err => console.log(err))
    }
  }

  let itemNumOfCart = state.shoppingCart.length>0 ? state.shoppingCart.length : null

    return(
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid mx-5">
        <span className="navbar-brand" id="main-icon">DavidUay</span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-auto">
              <Link className="nav-link" to='/'><i className="fas fa-home fa-lg"></i></Link>
            </li>
            {state.autheticated ? <li className="nav-item mr-auto"><a className="nav-link logout-btn" onClick={logout} ><i className="fas fa-sign-out-alt fa-lg"></i></a></li>
                                : <li className="nav-item mr-auto"><Link className="nav-link" to='/login'><i className="fas fa-sign-in-alt fa-lg"></i></Link></li>}
            {state.autheticated ? <li className="nav-item mr-auto"><Link className="nav-link" to='/products'><i className="fas fa-search fa-lg"></i></Link></li>
                                : <li className="nav-item mr-auto"><Link className="nav-link" to='/register'><i className="fas fa-user-plus fa-lg"></i></Link></li>}
            {state.autheticated ? <li className="nav-item mr-auto"><Link className="nav-link" to='/mycart'><i className="fas fa-shopping-cart fa-lg badge-notification" data-badge={itemNumOfCart}></i></Link></li>
                                : state.autheticated}
            {state.autheticated ? <li className="nav-item mr-auto"><Link className="nav-link" to='/addProduct'><i className="fas fa-plus fa-lg"></i></Link></li>
                                : state.autheticated}
          </ul>
        </div>
        </div>
      </nav>
    )
  }
