export const setTodoItemsToLocalStorage = (todo) => {
  localStorage.setItem("todos", JSON.stringify(todo));
};
