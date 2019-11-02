//jshint esversion:6
require('dotenv').config();
const router = require('express').Router();
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//import user model
let User = require('./user.model');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const RedditStrategy = require('passport-reddit').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// local Strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({$or: [{email: username}, {username: username}]}, function (err, foundUser) {
      if (err) { return done(err, null, null); }
      if (!foundUser) { return done(null, false, { message: 'Unknown User'}); }
      bcrypt.compare(password, foundUser.password).then(corr => {
        if (corr){
          return done(null, foundUser, {'confirmation':'success', 'result':foundUser});
        }else if(!corr){
          return done(null, false, { message: 'Incorrect Password'});
        }
    });
  });
}));

// google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://uay-mern-demo.herokuapp.com/api/users/auth/google/secret",
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({username: profile.displayName},
      {username: profile.displayName,
      password: profile.id,
      email: profile.displayName+"@gmail.com"}, function (err, user) {
     return cb(err, user);
   });
  }));

  // google Strategy
  passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "https://uay-mern-demo.herokuapp.com/api/users/auth/facebook/secret",
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({username: profile.displayName},
        {username: profile.displayName,
        password: profile.id,
        email: profile.displayName+"@facebook.com"}, function (err, user) {
       return cb(err, user);
     });
    }));

// reddit Strategy
  passport.use(new RedditStrategy({
    clientID: process.env.REDDIT_CONSUMER_KEY,
    clientSecret: process.env.REDDIT_CONSUMER_SECRET,
    callbackURL: "https://uay-mern-demo.herokuapp.com/api/users/auth/reddit/secret"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({username: profile.name},
      {username: profile.name,
      password: profile.id,
      email: profile.name+"@reddit.com"}, function (err, user) {
     return cb(err, user);
   });
  }));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "https://uay-mern-demo.herokuapp.com/api/users/auth/github/secret"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({username: profile.username},
      {username: profile.username,
      password: profile.id,
      email: profile.username+"@github.com"}, function (err, user) {
     return cb(err, user);
   });
  }));

// auth request to google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email']}));
router.get('/auth/google/secret',
  passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
    res.redirect("/");
});

// auth request to facebook
router.get('/auth/facebook',
  passport.authenticate('facebook'));
router.get('/auth/facebook/secret',
  passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
    res.redirect("/");
});

// auth request to reddit
router.get('/auth/reddit', function(req, res, next){
  req.session.state = crypto.randomBytes(32).toString('hex');
  passport.authenticate('reddit', {
    state: req.session.state,
    duration: 'permanent',
  })(req, res, next);
});
router.get('/auth/reddit/secret', function(req, res, next){
  // Check for origin via state token
  if (req.query.state == req.session.state){
    passport.authenticate('reddit', {
      successRedirect: "/",
      failureRedirect: '/login'
    })(req, res, next);
  }
  else {
    next( new Error(403) );
  }
});

// auth request to github
router.get('/auth/github',
  passport.authenticate('github'));
router.get('/auth/github/secret',
  passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// find all user
router.route('/').get((req, res) => {
  User.find()
    .then(foundUsers => res.send(foundUsers))
    .catch(err => res.status(400).send('Error: ' + err));
});
// find user
router.route('/:username').get((req, res) => {
  User.findOne({username: req.params.username}, (err, foundUser) => {
    if (err){
      res.status(400).send('Error: ' + err);
    }else{
      res.send(foundUser);
    }
  });
});

// signup user
router.route('/add').post((req, res) => {
  //check if the user already exists
  User.findOne({username:req.body.username}, (err, foundUser) => {
    if(foundUser){
      res.status(200).send("user already exists");
      //if it is a new user
    }else if(!foundUser){
      //check if the email already sign up
      User.findOne({email:req.body.email}, (err, foundUserWithEmail) => {
        if(foundUserWithEmail){
          res.status(200).send("email already signed up");
        }else if(!foundUserWithEmail){
          bcrypt.hash(req.body.password, saltRounds, (err, hash)=>{
            const newUser = new User({
              username:req.body.username,
              email:req.body.email,
              password:hash
            });
            newUser.save()
            .then(() => res.status(200).send('User added'))
            .catch(err => res.status(400).send('Error: ' + err));
          });
        }});
    }else{
      res.status(404).send('Error: ' + err);
      console.log(err);
    }
  });
});

// for logout
router.route('/logout').post((req, res) =>{
  req.logout();
  res.send('Logged out');
});

// for login

router.route('/login').post(function(req, res, next ){
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.status(200).send( { message: info.message }); }
      req.logIn(user, err => {
        if(!err){
          res.status(200).send('Success');
        }
      });
    })(req, res, next);
});

// for Authetication
router.route('/auth').post((req, res) => {
  if(req.isAuthenticated()){
    res.status(200).send("auth");
  }else{
    res.status(401).send("unauth");
  }
});

// update user data
router.route('/update').patch((req, res) => {
  if(req.isAuthenticated()){
    bcrypt.hash(req.body.password, saltRounds, (err, hash)=>{
      User.findByIdAndUpdate(req.session.passport.user, {
          username:req.body.username,
          email:req.body.email,
          password:hash
      }, (err, updatedUser) => {
        res.status(200).send('Successfully update the user');
      });
    });
  }else{
    res.status(401).send("unauth");
  }
});

// for adding products
router.route('/purchase').post((req, res) => {
  const [...products] = req.body;
    User.findByIdAndUpdate(req.session.passport.user, { $push: {orderedProducts: products}}, (err, updatedUser) => {
      if(updatedUser){
        res.status(200).send(updatedUser);
      }else if(err){
        res.status(404);
      }
  });
});

router.route('/delete/').delete((req, res) => {
  if(req.isAuthenticated()){
    User.deleteMany({}, (err)=>{
      if(!err){
        res.status(200).send("Successfully delete all user");
      }else{
        console.log(err);
        res.status(401).send("unauth");
      }
    });
  }
});

router.route('/delete/:userId').delete((req, res) => {
  if(req.isAuthenticated()){
    User.deleteOne({_id: req.params.userId}, (err)=>{
      if(!err){
        res.status(200).send("Successfully delete user");
      }else{
        console.log(err);
        res.status(401).send("unauth");
      }
    });
  }
});

module.exports = router;
