//jshint esversion:6
import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from "../UserContext.js"

const axios = require('axios');
axios.defaults.withCredentials = true

export function Register () {
  // global state
  const state = useContext(UserContext);
  // local state
  const [data, setData] = useState({ username: '', email: '', password: ''})
  const [errorMessage, setErrorMessage] = useState({ usernameError: '', emailError: '', passwordError: ''})
  let history = useHistory();

  const onChanegeData = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  }

  // if already login, redirect to homepage
  useEffect(()=>{
    axios.post('/api/users/auth')
    .then(function(res){
      if(res.status===200){
        state.setAutheticated(true);
        history.push('/');
      }
    })
    .catch(err => state.setAutheticated(false));
  }, [state.autheticated])

  //submit data for register
  const submitData = (e) => {
    e.preventDefault();
    // check the password if it is too short
    if(data.password.length<8){
      document.getElementById("password-input").classList.add('is-invalid')
      setErrorMessage({...errorMessage, passwordError: 'Password must be at least 8 characters'});
      return;
    }
    if(document.getElementById("username-input").classList.contains('is-invalid')){
      document.getElementById("username-input").classList.remove('is-invalid');
    }
    if(document.getElementById("email-input").classList.contains('is-invalid')){
      document.getElementById("email-input").classList.remove('is-invalid');
    }
    setErrorMessage({...errorMessage, usernameError: ''});
    setErrorMessage({...errorMessage, emailError: ''});
    axios.post('/api/users/add', data)
    .then(function(res){
      if(res.data==='User added'){
        // auto login after register
        login(data);
      }else if(res.data==="user already exists"){
        document.getElementById("username-input").classList.add('is-invalid');
        setErrorMessage({...errorMessage, usernameError: res.data});
      }else if(res.data==='email already signed up'){
        document.getElementById("email-input").classList.add('is-invalid');
        setErrorMessage({...errorMessage, emailError: res.data});
      }
    })
    .catch(err=>console.log(err));
    setData({username:'',email:'',password:''});
  }

  // login
  const login = (user) => {
    axios.post('/api/users/login', user)
    .then(function(res){
      if(res.data==='Success'){state.setAutheticated(true); history.push("/");}
    })
    .catch(err=>console.log(err));
  }

    return(
      <div className='w-75 mx-auto mt-5'>
        <div className='w-75 mx-auto'>
          <div>
            <h1 className="text-center font-weight-bold">Sign Up</h1>
          </div>
          <div className="row">
            <div className="col-lg-6 mt-5 text-center">
              <div className="p-5">
                <a className="btn btn-md w-75 btn-social btn-google my-2" href="/users/auth/google"><i className="fab fa-google"></i>Sign Up with Google</a>
                <a className="btn btn-md w-75 btn-social btn-facebook my-2" href="/users/auth/facebook"><i className="fab fa-facebook-f"></i>Sign Up with Facebook</a>
                <a className="btn btn-md w-75 btn-social btn-reddit my-2" href="/users/auth/reddit"><i className="fab fa-reddit"></i>Sign Up with Reddit</a>
                <a className="btn btn-md w-75 btn-social btn-github my-2" href="/users/auth/github"><i className="fab fa-github"></i>Sign Up with Github</a>
              </div>
            </div>
            <div className="col-lg-6 mt-4 login-form">
              <form className="p-5" onSubmit={submitData}>
                <div className='form-group'>
                  <label className='form-text'>Username:</label>
                  <input type='text' className="form-control" id="username-input" name="username" onChange={onChanegeData} value={data.username} placeholder="Username" required autoFocus />
                  {errorMessage.usernameError ? <div className="invalid-feedback">{errorMessage.usernameError}</div> : errorMessage.usernameError}
                </div>
                <div className='form-group'>
                  <label className='form-text'>Email:</label>
                  <input type='email' className="form-control" id="email-input" name="email" onChange={onChanegeData} value={data.email} placeholder="Email" required />
                  {errorMessage.emailError ? <div className="invalid-feedback">{errorMessage.emailError}</div> : errorMessage.emailError}
                </div>
                <div className='form-group'>
                  <label className='form-text'>Password:</label>
                  <input type='password' className="form-control" id="password-input" name="password" onChange={onChanegeData} value={data.password} placeholder="Password" required/>
                  {errorMessage.passwordError ? <div className="invalid-feedback">{errorMessage.passwordError}</div> : errorMessage.passwordError}
                </div>
                <input type='submit' value='Sign Up' className='btn btn-block btn-primary btn-lg mt-4' />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
