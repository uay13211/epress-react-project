//jshint esversion:6
const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  registerDate:{
    type: Date,
    default: Date.now,
    sparse: true
  },
  orderedProducts:{
    type: [],
    sparse: true
  }
});

userSchema.plugin(findOrCreate);

const User = new mongoose.model('user', userSchema);

module.exports = User;
