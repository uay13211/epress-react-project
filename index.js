//jshint esversion:6
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:true, limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false,
  name: "token"
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });

const connection = mongoose.connection;
connection.once('open', ()=> {
  console.log('db connected');
});

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization,\'Origin\',Accept,X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// users model for mongodb
const usersRouter = require('./users');
app.use('/api/users', usersRouter);

const productRouter = require('./products');
app.use('/api/products', productRouter);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));

  app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, ()=>console.log('running on port: '+PORT));
