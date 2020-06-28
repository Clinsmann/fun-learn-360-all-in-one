import {
  AuthState,
  loginUser,
  signupUser,
  logoutUser,
  clearLoginData,
  clearLoginError,
  clearSignupData,
  clearSignupError,
  clearLogoutData,
  clearLogoutError
} from "./types";

const INITIAL_STATE: AuthState = {
  login: {
    pending: false,
    error: null,
    success: false
  },
  signup: {
    pending: false,
    error: null,
    success: false
  },
  logout: {
    pending: false,
    error: null,
    success: false
  }
};

export default function auth(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    /*LOGIN*/
    case loginUser.pending:
      return {
        ...state,
        login: {
          ...state.login,
          pending: true,
          error: null
        }
      }
    case loginUser.rejected:
      return {
        ...state,
        login: {
          ...state.login,
          pending: false,
          error: action.payload
        }
      }
    case loginUser.fulfilled:
      return {
        ...state,
        login: {
          ...state.login,
          pending: false,
          error: null,
          success: true
        }
      }
    case clearLoginError.fulfilled:
      return {
        ...state,
        login: {
          ...state.login,
          error: null
        }
      }
    case clearLoginData.fulfilled:
      return {
        ...state,
        login: INITIAL_STATE.login
      }

    /*SIGNUP*/
    case signupUser.pending:
      return {
        ...state,
        signup: {
          ...state.signup,
          pending: true,
          error: null
        }
      }
    case signupUser.rejected:
      return {
        ...state,
        signup: {
          ...state.signup,
          pending: false,
          error: action.payload
        }
      }
    case signupUser.fulfilled:
      return {
        ...state,
        signup: {
          ...state.signup,
          pending: false,
          error: null,
          success: true
        }
      }
    case clearSignupError.fulfilled:
      return {
        ...state,
        signup: {
          ...state.signup,
          error: null
        }
      }
    case clearSignupData.fulfilled:
      return {
        ...state,
        signup: INITIAL_STATE.signup
      }

    /*LOGOUT*/
    case logoutUser.pending:
      return {
        ...state,
        logout: {
          ...state.logout,
          pending: true,
          error: null
        }
      }
    case logoutUser.rejected:
      return {
        ...state,
        logout: {
          ...state.logout,
          pending: false,
          error: action.payload
        }
      }
    case logoutUser.fulfilled:
      return {
        ...state,
        logout: {
          ...state.logout,
          pending: false,
          error: null,
          // success: true
          success: action.payload
        }
      }
    case clearLogoutError.fulfilled:
      return {
        ...state,
        logout: {
          ...state.logout,
          error: null
        }
      }
    case clearLogoutData.fulfilled:
      return {
        ...state,
        logout: INITIAL_STATE.logout
      }

    default:
      return state;
  }
};
