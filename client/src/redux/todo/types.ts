import createActionType from "../utils/createActionType";
import {CreateTodoPayload, Todo} from "../../api/todo/types";

export interface TodoFormState {
  data: Todo[] | null;
  error: string | null;
  pending: boolean;
  success:boolean;
}

export interface TodoState {
  todos: TodoFormState;
  createTodo: TodoFormState;
}

export const todos = createActionType('todos');
export const clearTodosData = createActionType('clear_todos_data');
export const clearTodosError = createActionType('clear_todos_error');

export const createTodo = createActionType('create_todo');
export const clearCreateTodoData = createActionType('clear_create_todo_data');
export const clearCreateTodoError = createActionType('clear_create_todo_error');

export interface CreateTodoAction {
  type: string;
  payload: CreateTodoPayload;
}
