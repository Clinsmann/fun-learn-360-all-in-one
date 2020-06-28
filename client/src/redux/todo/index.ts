import {
  todos,
  TodoState,
  createTodo,
  clearTodosData,
  clearTodosError,
  clearCreateTodoData,
  clearCreateTodoError
} from "./types";

const INITIAL_STATE: TodoState = {
  todos: {
    pending: false,
    error: null,
    success: false,
    data: null
  },
  createTodo: {
    pending: false,
    error: null,
    success:false,
    data: null
  }
};

export default function todo(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    /*getTodos*/
    case todos.pending:
      return {
        ...state,
        todos: {
          ...state.todos,
          pending: true,
          error: null
        }
      }
    case todos.rejected:
      return {
        ...state,
        todos: {
          ...state.todos,
          success: false,
          pending: false,
          error: action.payload
        }
      }
    case todos.fulfilled:
      return {
        ...state,
        todos: {
          ...state.todos,
          pending: false,
          error: null,
          success: true,
          data: action.payload
        }
      }
    case clearTodosError.fulfilled:
      return {
        ...state,
        todos: {
          ...state.todos,
          success: false,
          error: null
        }
      }
    case clearTodosData.fulfilled:
      return {
        ...state,
        todos: INITIAL_STATE.todos
      }

    /*create todos*/
    case createTodo.pending:
      return {
        ...state,
        createTodo: {
          ...state.createTodo,
          pending: true,
          error: null
        }
      }
    case createTodo.rejected:
      return {
        ...state,
        createTodo: {
          ...state.createTodo,
          pending: false,
          success: false,
          error: action.payload
        }
      }
    case createTodo.fulfilled:
      return {
        ...state,
        createTodo: {
          ...state.createTodo,
          pending: false,
          error: null,
          success: true,
          data: action.payload
        }
      }
    case clearCreateTodoError.fulfilled:
      return {
        ...state,
        createTodo: {
          ...state.createTodo,
          success: false,
          error: null
        }
      }
    case clearCreateTodoData.fulfilled:
      return {
        ...state,
        createTodo: INITIAL_STATE.createTodo
      }

    default:
      return state;
  }
};
