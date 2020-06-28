import request from '../request';
import {UserAsResponse, LoginCredentials, SignupResponse, SignupCredentials} from './types';

export default {
  login: async (user: LoginCredentials) => {
    return await request.post<UserAsResponse>('/user/login', user)
  },

  signup: async (user: SignupCredentials) => {
    return await request.post<SignupResponse>('/user/register', user)
  },

  logout: async () => {
    return await request.get<UserAsResponse>('/user/logout')
  },

  isAuthenticated: async () => {
    return await request.get<UserAsResponse>('/user/authenticated')
  }
};
