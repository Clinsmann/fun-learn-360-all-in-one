import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {Dispatch} from "redux";

import {RootState} from "../redux/reducers";
import {SignupCredentials} from "../api/auth/types";
import {AuthFormState, clearSignupData, clearSignupError, signupUser} from "../redux/auth/types";

type IProps = MapStateProps & MapDispatchProps;

const RegisterPage: React.FC<IProps> = props => {
  const {signupUser, clearSignupData, clearSignupError, signup: {success, error, pending}} = props;
  const initUser: SignupCredentials = {username: '', password: '', role: ''};
  const [user, setUser] = useState(initUser);
  const resetForm = () => setUser(initUser);
  const history = useHistory();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearSignupError();
    signupUser(user);
  };

  useEffect(() => {
    if (!error && success) {
      resetForm();
      history.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, error, history]);

  useEffect(() => {
    return () => {
      clearSignupData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3 className='text-center'>Please Register</h3>
        <input
          type="text"
          name="username"
          onChange={onChange}
          value={user.username}
          className='form-control mb-4'
          placeholder='enter username'/>
        <label htmlFor="username" className="sr-only">Password: </label>
        <input
          type="password"
          name="password"
          onChange={onChange}
          value={user.password}
          className='form-control mb-4'
          placeholder='enter password'/>
        <label htmlFor="username" className="sr-only">Role: </label>
        <input
          type="test"
          name="role"
          value={user.role}
          onChange={onChange}
          className='form-control'
          placeholder='enter role (admin/user)'/>
        <button
          type='submit'
          disabled={pending}
          className='btn btn-lg btn-primary btn-block'>
          Register
        </button>
      </form>
    </div>
  );
};

interface MapStateProps {
  signup: AuthFormState;
}

const mapStateToProps = (state: RootState): MapStateProps => ({
  signup: state.auth.signup
});

interface MapDispatchProps {
  clearSignupData: () => void;
  clearSignupError: () => void;
  signupUser: (payload: SignupCredentials) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchProps => ({
  clearSignupData: () => dispatch({type: clearSignupData}),
  clearSignupError: () => dispatch({type: clearSignupError}),
  signupUser: (payload: SignupCredentials) => dispatch({type: signupUser, payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
