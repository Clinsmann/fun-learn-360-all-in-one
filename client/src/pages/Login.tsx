import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState} from "../redux/reducers";
import {notify} from "../components/Notification";
import {LoginCredentials} from "../api/auth/types";
import {Button, Col, Container, Row, Form} from "react-bootstrap";
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
    <Container>
      <Row>
        <Col md={6} lg={4} className='mx-auto py-5'>
          <form onSubmit={onSubmit}>
            <h4 className='text-center mb-3'>Please sign in</h4>
            <Form.Group controlId="email">
              <Form.Control
                type="text"
                name='username'
                onChange={onChange}
                value={user.username}
                placeholder="Enter username"/>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Control
                type="password"
                name="password"
                onChange={onChange}
                value={user.password}
                placeholder="Enter password"/>
            </Form.Group>
            <Button
              type='submit'
              variant='primary'
              disabled={pending}
              className='btn-block'>
              Login
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
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
