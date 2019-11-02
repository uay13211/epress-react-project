//jshint esversion:6
import React, {useState, useEffect, useContext} from 'react';
import {ProductCard} from "./productCard";
import {UserContext} from "../UserContext.js"
import { useHistory } from "react-router-dom";

const axios = require('axios')

export function ProductPage () {
  const state = useContext(UserContext);
  // local state
  const [allProducts, setAllProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [sortMethod, setSortMethod] = useState('');
  let history = useHistory();

  function getAllProducts(){
    axios.get("/api/products")
    .then(function(res){
      setAllProducts(res.data);
      setSearchProducts(res.data.reverse());
    })
    .catch(err => console.log(err));
  }

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

  // get all products when first mount
  useEffect(()=>{
    getAllProducts();
  }, [])

  useEffect(()=>{
    const searchedProducts = allProducts.filter(product => product.name.toLowerCase().includes(searchWord));
    setSearchProducts(searchedProducts);
  }, [searchWord])

  useEffect(()=>{
    sort();
  },[sortMethod])

  const onSearchWord=(e)=>{
    setSearchWord(e.target.value.toLowerCase())
  }

  //sorting
  function sortMathodSelected(e){
    setSortMethod(e.target.value);
  }
  function sortByPriceAscending(){
    setSearchProducts([...searchProducts].sort(function(a,b){
      return (a.price-b.price);
    }))
  }
  function sortByPriceDecending(){
    setSearchProducts([...searchProducts].sort(function(a,b){
      return (b.price-a.price);
    }))
  }
  function sortByDateOldToNew(){
    setSearchProducts([...searchProducts].sort(function(a,b){
      if(a.postDate<b.postDate){
        return -1;
      }else if(a.postDate>b.postDate){
        return 1;
      }else{
        return 0;
      }
    }))
  }
  function sortByDateNewToOld(){
    setSearchProducts([...searchProducts].sort(function(a,b){
      if(a.postDate>b.postDate){
        return -1;
      }else if(a.postDate<b.postDate){
        return 1;
      }else{
        return 0;
      }
    }))
  }
  function sort(){
    switch(sortMethod){
      case('sortByDateNewToOld'):
        sortByDateNewToOld();
        break;
      case('sortByDateOldToNew'):
        sortByDateOldToNew();
        break;
      case('sortByPriceDecending'):
        sortByPriceDecending();
        break;
      case('sortByPriceAscending'):
        sortByPriceAscending();
        break;
      default:
        break;
    }
  }

  return(
      <div className='container mt-5'>
        <h5 className="font-weight-bold">Products</h5>
        <div className="input-group mt-3 shadow-sm">
          <div className="input-group-prepend">
            <button className="btn btn-warning" data-toggle="collapse" data-target="#collapseSorting" aria-expanded="false" aria-controls="collapseSorting">
              <i className="fas fa-sort-amount-down-alt fa-lg mt-1 mx-2"></i>
            </button>
          </div>
          <input type="text" className="form-control" placeholder="Search" onChange={onSearchWord}/>
          <div className="input-group-append">
            <button className='btn btn-warning'>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        <div className='collapse' id="collapseSorting">
          <select defaultValue={'DEFAULT'} onChange={sortMathodSelected} className='my-3 custom-select'>
            <option value="DEFAULT" disabled hidden></option>
            <option value='sortByDateNewToOld'>Sort from New to Old</option>
            <option value='sortByDateOldToNew'>Sort from Old to New</option>
            <option value='sortByPriceDecending'>Sort by Price from high to low</option>
            <option value='sortByPriceAscending'>Sort by Price from low to high</option>
          </select>
        </div>
        <div className="row animated zoomIn faster">
          {searchProducts ? searchProducts.map(product => (<ProductCard key={product._id} product={product}/>)) : searchProducts}
        </div>
    </div>
  )
}
