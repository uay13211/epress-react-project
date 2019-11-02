//jshint esversion:6
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim: true
  },
  description:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  imgpath:{
    type: String,
  },
  postDate:{
    type: Date,
    default: Date.now,
    sparse: true
  }
});

const Product = new mongoose.model('product', productSchema);

module.exports = Product;
