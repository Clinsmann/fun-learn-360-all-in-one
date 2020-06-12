import React, {useContext} from "react";
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from "../Context/AuthContext";

export default ({component: Component, ...rest}) => {
  const {isAuthenticated} = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props => isAuthenticated ?
        <Redirect to={{pathname: "/", state: {from: props.location}}}/>
        : <Component {...props}/>}/>
  );
};
