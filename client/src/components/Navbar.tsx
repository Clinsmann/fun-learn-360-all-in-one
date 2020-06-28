import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {notify} from "./Notification";
import {RootState} from "../redux/reducers";
import {UserState} from "../redux/user/types";
import {AuthFormState, logoutUser} from "../redux/auth/types";

type IProps = MapStateProps & MapDispatchProps;

const Navbar: React.FC<IProps> = props => {
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">MERN BOILERPLATE</Link>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          {(!isAuthenticated ? unauthenticatedNavLinks : authenticatedNavLinks).map(link => (
            <li className="nav-item" key={link}>
              <Link className="nav-link" to={`/${link.toLowerCase()}`}>{link}</Link>
            </li>
          ))}
          {isAuthenticated && (
            <li className="nav-item" key='logout'>
              <span className="nav-link" onClick={() => logUserOut()}>Logout</span>
            </li>
          )}
        </ul>
      </div>
    </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
