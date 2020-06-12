import request from './request';

export default {
  getTodos: () => request.get('/user/todo'),

  createTodo: todo => request.post('/user/todo', todo)
}
