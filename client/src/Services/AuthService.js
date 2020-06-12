import axios from 'axios';

const unAuthenticated = {
  isAuthenticated: false,
  user: {username: '', role: ''}
};

export default {
  login: user => axios.post('/user/login', user)
    .then(response => response.data)
    .catch(() => unAuthenticated),

  register: user => axios.post('/user/register', user)
    .then(response => response.data)
    .catch(({response: {data}}) => data),

  logout: () => axios.get('/user/logout')
    .then(({data}) => data)
    .catch(({response: {data}}) => data),

  isAuthenticated: () => axios.get('/user/authenticated')
    .then(response => response.data)
    .catch(() => unAuthenticated)
};
