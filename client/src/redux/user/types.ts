import createActionType from "../utils/createActionType";

export interface User {
  lastName?: string;
  firstLogin?: boolean;
  user_name?: string;
  mobileNo?: string;
  kyc_domain?: string;
  client_id?: string;
  firstName?: string;
  emailVerified?: boolean;
  exp?: number;
  mobileNoVerified?: boolean;
  client_name?: string;
  jti?: string;
  email: string;
  role: string;
}

export interface UserState {
  isAuthenticated: boolean;
  token?: string;
  user: User | null;
}

export const setUser = createActionType("set_user");
export const clearUser = createActionType("clear_user");
