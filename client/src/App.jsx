import React from 'react';
import {ToastContainer} from "react-toastify";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from './Components/Home';
import Admin from './Components/Admin';
import Login from "./Components/Login";
import Todos from "./Components/Todos";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";

export default () => {
  return (
    <React.Fragment>
      <ToastContainer
        newestOnTop={true}
        closeButton={false}
        hideProgressBar={true}
        bodyClassName='toast__body'
        className='toast__container'
        toastClassName='toast_toast'/>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path={['/', '/home']} component={Home}/>
          <UnPrivateRoute path='/login' component={Login}/>
          <UnPrivateRoute path='/register' component={Register}/>
          <PrivateRoute path='/admin' roles={['admin']} component={Admin}/>
          <PrivateRoute path='/todos' roles={['user', 'admin']} component={Todos}/>
        </Switch>
      </Router>
    </React.Fragment>
  );
};
