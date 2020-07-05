import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {notify} from "./Notification";
import {RootState} from "../redux/reducers";
import {LoginCredentials} from "../api/auth/types";
import {AuthFormState, clearLoginData, loginUser, clearLogoutData, clearLoginError} from "../redux/auth/types";

type IProps = MapStateProps & MapDispatchProps;

const Login: React.FC<IProps> = props => {
  const history = useHistory();
  const [user, setUser] = useState({username: '', password: ''});
  const {loginUser, clearLoginData, clearLoginError, clearLogoutData, login: {success, pending/*, error*/}} = props;
  const onChange = ({target: {name, value}}: React.ChangeEvent<HTMLInputElement>) => setUser({...user, [name]: value});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearLoginError();
    loginUser(user);
  };

  useEffect(() => {
    clearLogoutData();
    return () => {
      clearLoginData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (success) {
      notify({title: 'Success', message: 'Login Successful!', variant: 'success'});
      history.push('/todos');
    }
  }, [success, history]);

  return (
    <div className='container'>
      <div className='row'>
        <div className='mx-auto py-5 col-md-5 col-12'>
          <form onSubmit={onSubmit} className=''>
            <h3 className='text-center mb-3'>Please sign in</h3>
            <input
              type="text"
              name="username"
              onChange={onChange}
              className='form-control mb-4 form-control-lg'
              placeholder='enter username'/>
            <input
              type="password"
              name="password"
              onChange={onChange}
              className='form-control mb-4 form-control-lg'
              placeholder='enter password'/>
            <button
              type='submit'
              disabled={pending}
              className='btn btn-lg btn-primary btn-block mt-3'>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

type MapStateProps = {
  login: AuthFormState;
}

const mapStateToProps = (state: RootState): MapStateProps => ({
  login: state.auth.login
});

type MapDispatchProps = {
  clearLoginData: () => void;
  clearLoginError: () => void;
  clearLogoutData: () => void;
  loginUser: (payload: LoginCredentials) => void;
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchProps => ({
  clearLoginData: () => dispatch({type: clearLoginData.fulfilled}),
  clearLoginError: () => dispatch({type: clearLoginError.fulfilled}),
  clearLogoutData: () => dispatch({type: clearLogoutData.fulfilled}),
  loginUser: (payload: LoginCredentials) => dispatch({type: loginUser.default, payload})
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
