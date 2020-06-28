import {all, put, call, takeLatest} from "redux-saga/effects";

import api from "../../api";
import {AxiosResponse} from "axios";
// import parseError from "../../utils/parseError";
import {notify} from "../../components/Notification";
import {todos, createTodo, CreateTodoAction} from "./types";
import {GetTodoResponse, CreateTodoResponse} from "../../api/todo/types";

function* fetchTodos() {
  try {
    yield put({type: todos.pending});
    const res: AxiosResponse<GetTodoResponse> = yield call(api.todoService.getTodos);
    yield put({type: todos.fulfilled, payload: res.data.todos});
  } catch (error) {
    const errorMessage = error.response.status === 401 ? "User not authorized" :
      (error.response.data.message.body || "Error fetching todos");
    // const errorMessage = parseError(error);
    notify({title: 'Error', message: errorMessage, variant: 'error'});
    yield put({type: todos.rejected, payload: error.response.data.message.body});
  }
}

function* createNewTodos(action: CreateTodoAction) {
  try {
    const {payload} = action;
    yield put({type: createTodo.pending});
    const res: AxiosResponse<CreateTodoResponse> = yield call(api.todoService.createTodo, payload);
    notify({title: 'Success', message: res.data.message.message.body, variant: 'success'});
    yield put({type: createTodo.fulfilled, payload: res.data.message.message.body});
  } catch (error) {
    const errorMessage = error.response.data.message.body;
    // const errorMessage = parseError(error);
    notify({title: 'Error', message: errorMessage, variant: 'error'});
    yield put({type: createTodo.rejected, payload: errorMessage});
  }
}

export default function* allSaga() {
  yield all([
    takeLatest(todos.default, fetchTodos),
    takeLatest(createTodo.default, createNewTodos)
  ]);
}
