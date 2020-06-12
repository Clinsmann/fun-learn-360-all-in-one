import React, {useState, useContext} from "react";
import AuthService from "../Services/AuthService";
import {AuthContext} from "../Context/AuthContext";
import Message from '../Components/Message';

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
    <div>
      <form onSubmit={onSubmit}>
        <h3>Please sign in</h3>
        <label htmlFor="username" className="sr-only">Username: </label>
        <input
          type="text"
          name="username"
          onChange={onChange}
          className='form-control'
          placeholder='enter username'/>
        <label htmlFor="username" className="sr-only">Password: </label>
        <input
          type="password"
          name="password"
          onChange={onChange}
          className='form-control'
          placeholder='enter password'/>
        <button className='btn btn-lg btn-primary btn-block' type='submit'>Login</button>
      </form>
      {message && <Message message={message}/>}
    </div>
  );
};
