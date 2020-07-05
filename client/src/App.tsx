import React from 'react';
import './App.scss';
import './assets/styles/index.scss';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from './components/Home';
import Admin from './components/Admin';
import Login from "./components/Login";
import Todos from "./components/Todos";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";

function App() {
  return (
    <React.Fragment>
      <ToastContainer
        newestOnTop={true}
        closeButton={false}
        hideProgressBar={true}
        bodyClassName='toast__body'
        className='toast__container'
        toastClassName='toast__toast'/>
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
}

export default App;
