import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {notify} from "./Notification";
import {RootState} from "../redux/reducers";
import {UserState} from "../redux/user/types";
import {AuthFormState, logoutUser} from "../redux/auth/types";
import {Button, Container, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";

type IProps = MapStateProps & MapDispatchProps;

const NavbarComponent: React.FC<IProps> = props => {
  const {logUserOut, logout: {success}, user: {isAuthenticated, user}} = props;
  const history = useHistory();
  const unauthenticatedNavLinks = ['Home', 'Login', 'Register'];
  const authenticatedNavLinks = ['Home', 'Todos'];
  if (!!user && user.role === 'admin') {
    authenticatedNavLinks
      .splice(authenticatedNavLinks.length - 1, 0, 'Admin');
  }

  useEffect(() => {
    if (success) {
      notify({title: 'Success', message: 'User Logged out Successfully!', variant: 'success'});
      history.push('/');
    }
  }, [success, history])

  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">MERN BP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {(!isAuthenticated ? unauthenticatedNavLinks : authenticatedNavLinks).map(link => (
              <Nav.Link as={Link} key={link} to={`/${link.toLowerCase()}`}>{link}</Nav.Link>
            ))}
            {isAuthenticated && (
              <Nav.Link as={Link} key='logout' to='#' onClick={() => logUserOut()}>Logout</Nav.Link>
            )}
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

interface MapStateProps {
  user: UserState;
  logout: AuthFormState;
}

const mapStateToProps = (state: RootState): MapStateProps => ({
  user: state.user,
  logout: state.auth.logout
});

interface MapDispatchProps {
  logUserOut: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchProps => ({
  logUserOut: () => dispatch({type: logoutUser.default})
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
