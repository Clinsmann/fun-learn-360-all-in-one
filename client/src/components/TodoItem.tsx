import React from "react";
import {Todo} from "../api/todo/types";

interface IProps {
  todo: Todo
}

const TodoItem: React.FC<IProps> = ({todo}) => (<li>{todo.name}</li>);

export default TodoItem;
