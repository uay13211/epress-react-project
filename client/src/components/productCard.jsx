//jshint esversion:6
import React, { useState, useEffect } from 'react';

export function ProductCard(props){
  const [product, setProduct] = useState({})

  useEffect(()=>{
    setProduct({
      name:props.product.name,
      price:props.product.price,
      id:props.product._id
    })
  },[props])

  let productName;
  if (product.name){
    if (product.name.length>10){
      productName = product.name.slice(0, 10) + '...';
    }else{
      productName = product.name;
    }
  }else{
    productName = 'Loading';
  }


    let productDetailPage = '/products/' + props.product._id;
    return(
        <div className="col-lg-3 col-md-6 mt-4">
          <div className="card product-card">
            <div className="product-card-img-div">
              <span className="helper"></span><img src={'/api/products/getImage/' + props.product._id} className="img-fluid product-card-img" alt="product-img"/>
            </div>
            <div className='card-body form-body'>
                <table className='w-100'>
                  <tbody>
                    <tr>
                      <th className='w-100 product-name'>{productName}</th>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <th className='w-100 product-price'> ${product.price}</th>
                    </tr>
                  </tbody>
                </table>
                <button className="btn btn-outline-warning my-3"><a href={productDetailPage} className='stretched-link'>Detail</a></button>
            </div>
          </div>
        </div>
    )
  }
