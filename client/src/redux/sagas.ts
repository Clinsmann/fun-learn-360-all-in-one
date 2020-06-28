import {all} from 'redux-saga/effects';

import authSaga from './auth/saga';
import todoSagas from "./todo/saga";

export default function* root() {
  yield all([
    authSaga(),
    todoSagas()
  ]);
};
