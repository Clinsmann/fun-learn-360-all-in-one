import React, {useState, useContext, useEffect} from "react";
import TodoItem from './TodoItem';
import TodoService from '../Services/TodoService';
import {AuthContext} from "../Context/AuthContext";
import Message from "./Message";

export default props => {
  const initTodo = {name: ''};
  const authContext = useContext(AuthContext);
  const [todo, setTodo] = useState(initTodo);
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);

  const getTodos = () => {
    TodoService
      .getTodos()
      .then(({data}) => setTodos(data.todos))
      .catch(({response}) => setMessage({
          message: {
            msgBody: response.status === 401 ? "Unauthorized" : "Error fetching todos",
            msgError: true
          }
        })
      );
  };

  useEffect(() => {
    getTodos();
  }, []);

  const onChange = e => setTodo({name: e.target.value});

  const onSubmit = async e => {
    e.preventDefault();

    await setMessage(null);

    TodoService.createTodo(todo)
      .then(async ({data}) => {
        setTodo(initTodo);
        setMessage(data);
        getTodos();
      })
      .catch(({response}) => {
        setMessage(response.data);
        if (response.status === 401) {
          authContext.setUser({username: '', role: ''});
          authContext.setIsAuthenticated(false);
        }
      });
  };

  return (
    <div>
      <ul className='list-group'>
        {todos.map(todo => <TodoItem key={todo._id} todo={todo}/>)}
      </ul>
      <br/>
      <form onSubmit={onSubmit}>
        <label htmlFor="todo">Enter Todo</label>
        <input type="text"
               name='todo'
               value={todo.name}
               onChange={onChange}
               className='form-control'
               placeholder='please enter todo'/>
        <button type='submit'
                className='btn btn-lg btn-primary btn-block'>
          Submit
        </button>
        {message && <Message message={message}/>}
      </form>
    </div>
  );
}
