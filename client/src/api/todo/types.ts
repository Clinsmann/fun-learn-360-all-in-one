import {MessageResponse} from "../types";

export interface Todo {
  _id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTodoPayload {
  name: string;
}

export interface CreateTodoResponse {
  message: MessageResponse
}

export interface GetTodoResponse {
  isAuthenticated: boolean;
  todos: Todo[];
}
