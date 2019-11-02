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
        <div className='w-75 mx-auto mt-5'>
          <div className='w-75 mx-auto'>
            <div>
              <h1 className="text-center font-weight-bold">Login</h1>
            </div>
            <div className="row">
              <div className="col-lg-6 mt-5 text-center">
                <div className="p-5">
                  <a className="btn btn-md w-75 btn-social btn-google my-2" href="/api/users/auth/google"><i className="fab fa-google"></i>Log in with Google</a>
                  <a className="btn btn-md w-75 btn-social btn-facebook my-2" href="/api/users/auth/facebook"><i className="fab fa-facebook-f"></i>Log in with Facebook</a>
                  <a className="btn btn-md w-75 btn-social btn-reddit my-2" href="/api/users/auth/reddit"><i className="fab fa-reddit"></i>Log in with Reddit</a>
                  <a className="btn btn-md w-75 btn-social btn-github my-2" href="/api/users/auth/github"><i className="fab fa-github"></i>Log in with Github</a>
                </div>
              </div>
              <div className="col-lg-6 mt-4 login-form">
                <form className="p-5" onSubmit={submitData}>
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
                  <input type='submit' value='Log in' className='btn btn-block btn-primary btn-lg mt-4' />
                </form>
              </div>
            </div>
          </div>
        </div>
      );
}
