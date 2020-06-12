import React from 'react';
import Home from './Components/Home';
import Admin from './Components/Admin';
import Login from "./Components/Login";
import Todos from "./Components/Todos";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";
import {BrowserRouter as Router, Route} from "react-router-dom";

export default () => {
  return (
    <Router>
      <Navbar/>
      <div className='container'>
        <Route exact path={['/', '/home']} component={Home}/>
        <UnPrivateRoute path='/login' component={Login}/>
        <UnPrivateRoute path='/register' component={Register}/>
        <PrivateRoute path='/admin' roles={['admin']} component={Admin}/>
        <PrivateRoute path='/todos' roles={['user', 'admin']} component={Todos}/>
      </div>
    </Router>
  );
};
