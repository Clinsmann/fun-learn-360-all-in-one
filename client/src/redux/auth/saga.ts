import {all, put, call, takeLatest} from "redux-saga/effects";
import jsonwebtoken from "jsonwebtoken";

import api from "../../api";
import {AxiosResponse} from "axios";
import storage from "../../utils/storage";
import parseError from "../../utils/parseError";
import {setUser, clearUser, UserState, User} from "../user/types";
import {UserAsResponse, SignupResponse, LogoutResponse} from "../../api/auth/types";
import {loginUser, signupUser, logoutUser, LoginAction, SignupAction,} from "./types";

function* login(action: LoginAction) {
  try {
    const {payload} = action;
    yield put({type: loginUser.pending});
    const res: AxiosResponse<UserAsResponse> = yield call(api.authService.login, payload);
    yield put({type: loginUser.fulfilled, payload: res.data});
    const data: UserState = {
      ...res.data,
      user: (jsonwebtoken.decode(res.data.token || "")).user as User,
      isAuthenticated: res.data.isAuthenticated,
      token: res.data.token
    };
    yield put({type: setUser.fulfilled, payload: data});
    yield call(storage.set, "user", data);
  } catch (error) {
    const errorMessage = parseError(error);
    yield put({type: loginUser.rejected, payload: errorMessage});
  }
}

function* signup(action: SignupAction) {
  try {
    const {payload} = action;
    yield put({type: signupUser.pending});
    const res: AxiosResponse<SignupResponse> = yield call(api.authService.signup, payload);
    yield put({type: signupUser.fulfilled, payload: res.data});
  } catch (error) {
    const errorMessage = parseError(error);
    yield put({type: signupUser.rejected, payload: errorMessage});
  }
}

function* logout() {
  try {
    yield put({type: logoutUser.pending});
    const res: AxiosResponse<LogoutResponse> = yield call(api.authService.logout);
    yield put({type: logoutUser.fulfilled, payload: res.data.success});
    yield put({type: clearUser.fulfilled});
    yield call(storage.clear);
  } catch (error) {
    const errorMessage = parseError(error);
    yield put({type: logoutUser.rejected, payload: errorMessage});
  }
}

export default function* allSaga() {
  yield all([
    takeLatest(loginUser.default, login),
    takeLatest(signupUser.default, signup),
    takeLatest(logoutUser.default, logout)
  ]);
}
