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
    return <p>No todos found.</p>;
  }
  return (
    <div className="mt-5 w-full overflow-x-hidden">
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
