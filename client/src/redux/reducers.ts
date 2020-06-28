import {combineReducers} from 'redux';
import {StateType} from 'typesafe-actions';

import auth from './auth';
import user from "./user";
import todo from "./todo";

const RootReducer = combineReducers({auth, user, todo});

export default RootReducer;

export type RootState = StateType<typeof RootReducer>;
