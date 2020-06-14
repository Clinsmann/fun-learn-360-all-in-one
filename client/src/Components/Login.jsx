import React, {useState, useContext} from "react";

import Message from './Message';
import {notify} from "./Notification";
import AuthService from "../Services/AuthService";

import {AuthContext} from "../Context/AuthContext";

export default props => {
  const authContext = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState({username: '', password: ''});
  const onChange = e => setUser({...user, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    AuthService.login(user).then(({isAuthenticated, user, message}) => {
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push('/todos')
      }
    }).catch(({message}) => setMessage(message));
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='mx-auto py-5 col-md-6 col-12'>
          <form onSubmit={onSubmit} className=''>
            <h3>Please sign in</h3>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              onChange={onChange}
              className='form-control pb-3'
              placeholder='enter username'/>
            <label htmlFor="username">Password: </label>
            <input
              type="password"
              name="password"
              onChange={onChange}
              className='form-control pb-3'
              placeholder='enter password'/>
            <button className='btn btn-lg btn-primary btn-block' type='submit'>Login</button>
            <button className='btn btn-lg btn-primary btn-block' type='button' onClick={() => {
              notify({title: 'Welcome', message: 'Welcome to the application', variant: 'success'})
            }}>show notification
            </button>
          </form>
          {message && <Message message={message}/>}
        </div>
      </div>
    </div>
  );
};
