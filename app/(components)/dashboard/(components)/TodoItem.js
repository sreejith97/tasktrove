"use client";
import React from "react";
import moment from "moment";
import {
  FaEllipsisVertical,
  FaPrescriptionBottle,
  FaRegSquare,
  FaRegSquareCheck,
  FaRegStar,
  FaRotateLeft,
  FaStar,
  FaTrash,
} from "react-icons/fa6";

const TodoItem = ({
  todo,
  toggleTodoCompletion,
  toggleFavorite,
  deleteTodo,
  undoDeleteTodo,
  deletePermanently,
}) => {
  return (
    <div className="flex flex-row w-full items-center border-b-2 py-3">
      <div className="px-4">
        {!todo.isDeleted && (
          <>
            {todo.status ? (
              <button
                className="flex-shrink-0 text-sm rounded"
                onClick={() => toggleTodoCompletion(todo.id, todo.status)}
              >
                <FaRegSquareCheck className="text-[30px]" />
              </button>
            ) : (
              <button
                className="flex-shrink-0 text-sm rounded"
                onClick={() => toggleTodoCompletion(todo.id, todo.status)}
              >
                <FaRegSquare className="text-[30px]" />
              </button>
            )}
          </>
        )}
      </div>
      <div className="flex-1 flex flex-col select-none">
        <h1
          className={`font-semibold text-[20px] ${
            todo.status ? "line-through" : ""
          }`}
        >
          {todo.title}
        </h1>
        <p className="text-[15px] w-full text-gray-500 max-w-[200px] lg:max-w-[500px] truncate">
          {todo.description}
        </p>
        <span className="text-[12px] text-gray-500 select-none ">
          {moment(todo?.time?.toDate().getTime()).format("LT")}
        </span>
      </div>
      <div className="flex-1 flex flex-row justify-end gap-3 items-center select-none">
        {!todo.isDeleted && (
          <>
            <button
              className="p-3"
              onClick={() => toggleFavorite(todo.id, todo.isFavorite)}
            >
              {todo.isFavorite ? (
                <FaStar className="text-[20px] text-yellow-500" />
              ) : (
                <FaRegStar className="text-[20px]" />
              )}
            </button>
            <button className="rounded p-3" onClick={() => deleteTodo(todo.id)}>
              <FaTrash className="text-[20px] text-red-500" />
            </button>
            <button>
              <FaEllipsisVertical className="text-[20px]" />
            </button>
          </>
        )}
        {todo.isDeleted && (
          <>
            <button
              className="py-2 px-2"
              onClick={() => undoDeleteTodo(todo.id)}
            >
              <FaRotateLeft className="text-[25px] text-yellow-500 font-semibold" />
            </button>

            <button
              className="py-2 px-2"
              onClick={() => deletePermanently(todo.id)}
            >
              <FaTrash className="text-[25px] text-red-500 font-semibold" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
