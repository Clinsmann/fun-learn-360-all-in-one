import request from '../request';
import {MessageResponse} from "../types";
import {CreateTodoPayload, GetTodoResponse} from "./types";

export default {
  getTodos: async () => {
    return await request.get<GetTodoResponse>('/user/todo')
  },

  createTodo: async (todo: CreateTodoPayload) => {
    return await request.post<MessageResponse>('/user/todo', todo)
  }
}
