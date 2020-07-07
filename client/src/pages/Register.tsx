import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {Dispatch} from "redux";

import {RootState} from "../redux/reducers";
import {SignupCredentials} from "../api/auth/types";
import {AuthFormState, clearSignupData, clearSignupError, signupUser} from "../redux/auth/types";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {notify, NotifyProps} from "../components/Notification";

type IProps = MapStateProps & MapDispatchProps;

const RegisterPage: React.FC<IProps> = props => {
  const {signupUser, clearSignupData, clearSignupError, signup: {success, error, pending}} = props;
  const initUser: SignupCredentials = {username: '', password: '', confirm_password: '', role: ''};
  const [user, setUser] = useState(initUser);
  const resetForm = () => setUser(initUser);
  const history = useHistory();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const validate = (): boolean => {
    let validated: boolean = true;
    let notification: NotifyProps = {message: '', variant: "error", title: 'Validation Error'};

    if (user.username.length < 3) {
      notification.message = 'Username must be more than 2 character';
      validated = false;
    }
    //todo work on the component the last error is always rendered even when there are more errors

    if (user.password !== user.confirm_password) {
      notification.message = 'password do not match';
      validated = false;
    }

    !validated && notify(notification);
    return validated;
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      clearSignupError();
      signupUser(user);
    }
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
    <Container>
      <Row>
        <Col md={6} lg={4} className='mx-auto py-5'>
          <form onSubmit={onSubmit}>
            <h4 className='text-center'>Please Register</h4>
            <Form.Group controlId="username">
              <Form.Control
                type="text"
                name="username"
                onChange={onChange}
                value={user.username}
                placeholder='enter username'/>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Control
                type="password"
                name="password"
                onChange={onChange}
                value={user.password}
                placeholder='enter password'/>
            </Form.Group>
            <Form.Group controlId="confirm_password">
              <Form.Control
                type="password"
                onChange={onChange}
                name="confirm_password"
                value={user.confirm_password}
                placeholder='confirm password'/>
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Control
                type="test"
                name="role"
                value={user.role}
                onChange={onChange}
                placeholder='enter role (admin/user)'/>
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
  clearSignupData: () => dispatch({type: clearSignupData.fulfilled}),
  clearSignupError: () => dispatch({type: clearSignupError.fulfilled}),
  signupUser: (payload: SignupCredentials) => dispatch({type: signupUser.default, payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
