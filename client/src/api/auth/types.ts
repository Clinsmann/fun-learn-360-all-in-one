export interface User {
  role: string;
  username: string;
}

export interface UserAsResponse {
  isAuthenticated: boolean;
  token?: string;
  user: User;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials {
  role: string;
  username: string;
  password: string;
}

export interface SignupResponse {
}

export interface LogoutResponse {
  user: User;
  success: boolean;
}
