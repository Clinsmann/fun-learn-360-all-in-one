import {UserState, setUser, clearUser} from "./types";
import storage from "../../utils/storage";
import jsonwebtoken from "jsonwebtoken";

const cachedUser = storage.get("user");
const INITIAL_STATE: UserState = {
  user: jsonwebtoken.decode(cachedUser?.token || "")?.user,
  isAuthenticated: null,
  token: null,
  ...cachedUser,
};

export default function user(state = INITIAL_STATE, action: any): UserState {
  switch (action.type) {
    case setUser.fulfilled:
      return {
        ...state,
        ...action.payload
      };
    case clearUser.fulfilled:
      return {
        ...state,
        user: null,
        token: undefined,
        isAuthenticated: false,
      };

    default:
      return state;
  }
}
