import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

import App from './App';
import AuthProvider from './Context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App/>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
