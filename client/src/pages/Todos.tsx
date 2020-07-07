import React, {useState, useEffect} from "react";
import {connect} from 'react-redux';
import {Dispatch} from "redux";

import {RootState} from "../redux/reducers";
import TodoItem from '../components/TodoItem';
import {CreateTodoPayload/*, Todo*/} from "../api/todo/types";
import {createTodo, TodoFormState, todos} from "../redux/todo/types";

type IProps = MapStateProps & MapDispatchProps;

const Todos: React.FC<IProps> = props => {
  const {
    todos: {data: todos, pending},
    getTodos,
    createTodo,
    createTodoState: {
      pending: createTodoPending,
      success: createTodoSuccess
    }
  } = props;

  const initTodo = {name: ''};
  const [todo, setTodo] = useState(initTodo);
  const onChange = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => setTodo({name: value});
  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo(todo);
  };

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  useEffect(() => {
    if (createTodoSuccess) {
      setTodo(initTodo);
      getTodos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createTodoSuccess])

  return (
    <div className='container'>
      <div className='row'>
        <div className='mx-auto py-4 col-md-5 col-12'>
          <ul className='list-group'>
            {pending && <span>Fetching todo...</span>}
            {(!pending && todos) ?
              todos.map(todo => <TodoItem key={todo._id} todo={todo}/>)
              : <span>No todo found.</span>}
          </ul>
          <br/>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name='todo'
              value={todo.name}
              onChange={onChange}
              className='form-control mb-4'
              placeholder='please enter todo'/>
            <button
              type='submit'
              disabled={createTodoPending}
              className='btn btn-lg btn-primary btn-block'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

interface MapStateProps {
  todos: TodoFormState;
  createTodoState: TodoFormState;
}

const mapStateToProps = (state: RootState) => ({
  todos: state.todo.todos,
  createTodoState: state.todo.createTodo
});

interface MapDispatchProps {
  getTodos: () => void;
  createTodo: (payload: CreateTodoPayload) => void
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getTodos: () => dispatch({type: todos.default}),
  createTodo: (payload: CreateTodoPayload) => dispatch({type: createTodo.default, payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
