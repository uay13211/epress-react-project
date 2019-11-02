//jshint esversion:6
require('dotenv').config();
const router = require('express').Router();
const fs = require('fs');
let Product = require('./product.model');

router.route('/').get((req, res) => {
  Product.find()
    .then(foundProducts => res.send(foundProducts))
    .catch(err => res.status(400).send('Error: ' + err));
});

router.route('/:productId').get((req, res) => {
  Product.findOne({_id: req.params.productId}, (err, foundProduct) => {
    if (err){
      res.status(400).send('Error: ' + err);
    }else{
      res.status(200).send(foundProduct);
    }
  });
});

router.route('/getImage/:productId').get((req, res)=> {
  const path = __dirname+'/image/products/'+req.params.productId+'.png';
  res.sendFile(path);
});

router.route('/add').post((req, res) => {
    const newProduct = new Product({
      name:req.body.name,
      description: req.body.description,
      price: req.body.price,
    });
    newProduct.save(err => {
      if(!err){
        const path = __dirname+'/image/products/'+newProduct.id+'.png';
        Product.findByIdAndUpdate(newProduct.id, {imgpath: path}, (err, foundProduct) => {
          res.status(200).send(foundProduct.id);
        });
      }else{
        res.status(400);
      }
    });
});

router.route('/uploadImage').post((req, res) => {
  let base64Image = req.body.imageData.split(';base64,').pop();
  const path = __dirname+'/image/products/'+ req.body.imageName;
  fs.writeFile(path, base64Image, {encoding: 'base64'}, function(err) {
    if(!err){
      res.status(200).send('image uploaded');
      console.log('File created');
    }else{
      res.status(400).send('Error: ' + err);
    }
  });
});

router.route('/update').patch((req, res) => {
    const updatedProduct = {
      name:req.body.name,
      description: req.body.description,
      price: req.body.price,
    };
    Product.findByIdAndUpdate(req.body.id, updatedProduct, (err, foundProduct)=>{
      if(err){
        res.status(400).send('Error: ' + err);
      }else{
        res.status(200).send('Product ' + foundProduct.name + ' updated');
      }
    });
});

router.route('/deleteAll').delete((req, res) => {
  if(req.isAuthenticated()){
    Product.deleteMany({}, (err) => {
      if(!err){
        res.status(200).send('Successfully delete all');
      }else{
        console.log(err);
      }
    });
  }
});

router.route('/delete/:productId').delete((req, res) => {
  if(req.isAuthenticated()){
    // delete product in DB
    Product.deleteOne({_id:req.params.productId}, (err) => {
      if(!err){
        // delete product image
        fs.unlink(__dirname+'/image/products/'+req.params.productId+'.png', (err) => {
          if(!err){
            res.status(200).send('Successfully delete product');
          }else{
            console.log(err);
            res.status(404).send('Product delete but image still exist');
          }
        });
      }else{
        console.log(err);
        res.status(404).send('Product not found');
      }
    });
  }else{
    res.status(401).send('Unauth');
  }
});

module.exports = router;
