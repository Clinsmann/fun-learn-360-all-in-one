import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthService from "../Services/AuthService";
import {AuthContext} from "../Context/AuthContext";

export default props => {
  const {isAuthenticated, user, setIsAuthenticated, setUser} = useContext(AuthContext);
  const unauthenticatedNavLinks = ['Home', 'Login', 'Register'];
  const authenticatedNavLinks = ['Home', 'Todos', 'Logout'];
  if (user.role === 'admin')
    authenticatedNavLinks.splice(authenticatedNavLinks.length - 1 , 0, 'Admin');
  const onClickLogoutHandler = () => {
    AuthService.logout().then(data => {
      setUser(data.user);
      setIsAuthenticated(false);
    }).catch(error => console.log(error));
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">MERN BOILERPLATE</Link>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          {(!isAuthenticated ? unauthenticatedNavLinks : authenticatedNavLinks).map(link => (
            <li className="nav-item" key={link}>
              <Link
                className="nav-link"
                to={`/${link.toLowerCase()}`}
                {...(link === 'Logout' && {onClick: onClickLogoutHandler})}>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
