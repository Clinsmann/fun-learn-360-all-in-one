import React, {useState, useRef, useEffect} from "react";
import AuthService from "../Services/AuthService";
import Message from './Message';

export default props => {
  const initUser = {username: '', password: '', role: ''};
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(initUser);
  const resetForm = () => setUser(initUser);
  const onChange = e => setUser({...user, [e.target.name]: e.target.value});
  let timerID = useRef(null)

  useEffect(() => {
    return () => {
      clearTimeout(timerID)
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    AuthService.register(user).then(({message}) => {
      setMessage(message);
      resetForm();
      if (!message.msgError)
        timerID = setTimeout(() => props.history.push('/login'), 2000);
    }).catch(({data}) => {
      setMessage(data.message);
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Please Register</h3>
        <label htmlFor="username" className="sr-only">Username: </label>
        <input
          type="text"
          name="username"
          onChange={onChange}
          value={user.username}
          className='form-control'
          placeholder='enter username'/>
        <label htmlFor="username" className="sr-only">Password: </label>
        <input
          type="password"
          name="password"
          onChange={onChange}
          value={user.password}
          className='form-control'
          placeholder='enter password'/>
        <label htmlFor="username" className="sr-only">Role: </label>
        <input
          type="test"
          name="role"
          value={user.role}
          onChange={onChange}
          className='form-control'
          placeholder='enter role (admin/user)'/>
        <button className='btn btn-lg btn-primary btn-block' type='submit'>Register</button>
      </form>
      {message && <Message message={message}/>}
    </div>
  );
};
