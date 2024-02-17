// TodoList.js
import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({
  todos,
  toggleTodoCompletion,
  toggleFavorite,
  deleteTodo,
  undoDeleteTodo,
  deletePermanently,
}) => {
  if (todos.length === 0) {
    return <p>No todos found.</p>; // Render a message if no todos are found
  }
  return (
    <div className="mt-5 w-full">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodoCompletion={toggleTodoCompletion}
          toggleFavorite={toggleFavorite}
          deleteTodo={deleteTodo}
          undoDeleteTodo={undoDeleteTodo}
          deletePermanently={deletePermanently}
        />
      ))}
    </div>
  );
};

export default TodoList;
