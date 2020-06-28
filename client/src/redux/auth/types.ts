import createActionType from "../utils/createActionType";
import {LoginCredentials, SignupCredentials} from "../../api/auth/types";

export interface AuthFormState {
  success: boolean;
  pending: boolean;
  error: string | null;
}

export interface AuthState {
  login: AuthFormState;
  signup: AuthFormState;
  logout: AuthFormState;
}

export const loginUser = createActionType('login_user');
export const clearLoginData = createActionType('clear_login_data');
export const clearLoginError = createActionType('clear_login_error');

export const signupUser = createActionType('signup_user');
export const clearSignupData = createActionType('clear_signup_data');
export const clearSignupError = createActionType('clear_signup_error');

export const logoutUser = createActionType('logout_user');
export const clearLogoutData = createActionType('clear_logout_data');
export const clearLogoutError = createActionType('clear_logout_error');

export interface LoginAction {
  type: string;
  payload: LoginCredentials;
}

export interface SignupAction {
  type: string;
  payload: SignupCredentials;
}
