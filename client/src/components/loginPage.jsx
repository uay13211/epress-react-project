//jshint esversion:6
import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from "../UserContext.js"

const axios = require('axios');
axios.defaults.withCredentials = true

export function Login() {
  // global state
  const state = useContext(UserContext);
  // local state
  const [data, setData] = useState({ username: '', password: ''})
  const [errorMessage, setErrorMessage] = useState({ usernameError: '', passwordError: ''})

  let history = useHistory();

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

  const onChanegeData = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  }

  // login
  const login = (user) => {
    if(document.getElementById("username-input").classList.contains('is-invalid')){
      document.getElementById("username-input").classList.remove('is-invalid');
    }
    if(document.getElementById("password-input").classList.contains('is-invalid')){
      document.getElementById("password-input").classList.remove('is-invalid');
    }
    setErrorMessage({...errorMessage, usernameError: ''});
    setErrorMessage({...errorMessage, passwordError: ''});

    axios.post('/api/users/login', user)
    .then(function(res){
      if (res.data==='Success'){state.setAutheticated(true); history.push("/");}
      else{
        if(res.data.message==='Unknown User'){
          document.getElementById("username-input").classList.add('is-invalid');
          setErrorMessage({...errorMessage, usernameError: 'Unknown User or Email'});
        }else if(res.data.message==='Incorrect Password'){
          document.getElementById("password-input").classList.add('is-invalid');
          setErrorMessage({...errorMessage, passwordError: res.data.message});
        }
      }
    })
    .catch(err=>console.log(err));
  }

    //submit data for login
    const submitData = (e) => {
      e.preventDefault();
      const user = data;
      login(user);
      setData({username:'', password:''});
    }

      return(
        <div className='login-page'>
          <div className='login-card'>
            <div className="card">
              <div className="card-header bg-warning">
                <h2 className="text-center font-weight-bold">Login</h2>
              </div>
              <div className='card-body'>
                  <div className="login-form">
                    <form onSubmit={submitData}>
                      <div className='form-group'>
                        <label className='form-text'>Username:</label>
                        <input type='text' className="form-control" id="username-input" name="username" onChange={onChanegeData} value={data.username} placeholder="Username or Email" required autoFocus />
                        {errorMessage.usernameError ? <div className="invalid-feedback">{errorMessage.usernameError}</div> : errorMessage.usernameError}
                      </div>
                      <div className='form-group'>
                        <label className='form-text'>Password:</label>
                        <input type='password' className="form-control" id="password-input" name="password" onChange={onChanegeData} value={data.password} placeholder="Password" required/>
                        {errorMessage.passwordError ? <div className="invalid-feedback">{errorMessage.passwordError}</div> : errorMessage.passwordError}
                      </div>
                      <input type='submit' value='Login' className='btn btn-block btn-warning btn-lg my-4' />
                    </form>
                  </div>
                  <hr/>
                  <h5 className="text-center py-2">Or...</h5>
                    <div className="row">
                      <div className="col-6 pt-2">
                        <a className="btn btn-md w-100 btn-social btn-google" href="/api/users/auth/google"><i className="fab fa-google"></i>Login with Google</a>
                      </div>
                      <div className="col-6 pt-2">
                        <a className="btn btn-md w-100 btn-social btn-facebook" href="/api/users/auth/facebook"><i className="fab fa-facebook-f"></i>Login with Facebook</a>
                      </div>
                      <div className="col-6 pt-2">
                        <a className="btn btn-md w-100 btn-social btn-reddit" href="/api/users/auth/reddit"><i className="fab fa-reddit"></i>Login with Reddit</a>
                      </div>
                      <div className="col-6 pt-2">
                        <a className="btn btn-md w-100 btn-social btn-github" href="/api/users/auth/github"><i className="fab fa-github"></i>Login with GitHub</a>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
      );
}
