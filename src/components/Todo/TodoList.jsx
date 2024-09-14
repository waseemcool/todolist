import React, { useEffect } from "react";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todoItems, setTodoItems }) => {
  //const todosLS = localStorage.getItem("todos");

  //   const array = localStorage.getItem("todos");
  //   const todos = JSON.parse(array);
  return (
    <ul>
      {todoItems &&
        todoItems.map((todo) => (
          <TodoListItem
            todo={todo}
            key={todo.title}
            setTodoItems={setTodoItems}
          />
        ))}
    </ul>
  );
};

export default TodoList;
