import React from "react";
import { setTodoItemsToLocalStorage } from "../../utils/todoItemsUtils";

const TodoListItem = ({ todo, setTodoItems }) => {
  const array = localStorage.getItem("todos");
  const todos = JSON.parse(array);

  const deleteTodoItem = (title, email) => {
    const activeTodos = todos.filter((todo) => todo.userEmail === email);

    const activeTodosFull = activeTodos.filter((t) => t.title !== title);
    setTodoItems(activeTodosFull);
    setTodoItemsToLocalStorage(activeTodosFull);
  };
  return (
    <li key={todo.title}>
      <h3>{todo.title}</h3>
      <span
        style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}
      >
        {todo.description}
      </span>
      <button onClick={() => deleteTodoItem(todo.title, todo.userEmail)}>
        Delete
      </button>
    </li>
  );
};

export default TodoListItem;
