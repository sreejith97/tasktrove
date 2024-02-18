// Dashboard.js
"use client";
import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/config/firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

import TodoList from "./(components)/TodoList";
import FilterOptions from "./(components)/FilterOptions";
import SearchInput from "./(components)/SearchInput";

const Dashboard = () => {
  console.log(process.env.SDSD);
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(5);
  const [user] = useAuthState(auth);

  // Function to add a new todo
  const addTodo = () => {
    addDoc(collection(db, `user/${user?.uid}/todo`), {
      title: input,
      description: description,
      status: false,
      isDeleted: false,
      isFavorite: false,
      time: serverTimestamp(),
    })
      .then(() => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 4000);
        setInput("");
        setDescription("");
        setIsModalOpen(false);
      })
      .catch((err) => alert(err.message));
  };

  // Function to toggle completion status of a todo
  const toggleTodoCompletion = async (id, status) => {
    const todoRef = doc(db, `user/${user?.uid}/todo`, id);
    await updateDoc(todoRef, { status: !status });
  };

  // Function to toggle favorite status of a todo
  const toggleFavorite = async (id, isFavorite) => {
    const todoRef = doc(db, `user/${user?.uid}/todo`, id);
    await updateDoc(todoRef, { isFavorite: !isFavorite });
  };

  // Function to mark a todo as deleted
  const deleteTodo = async (id) => {
    const todoRef = doc(db, `user/${user?.uid}/todo`, id);
    await updateDoc(todoRef, { isDeleted: true });
  };

  // Function to undo deletion of a todo
  const undoDeleteTodo = async (id) => {
    const todoRef = doc(db, `user/${user?.uid}/todo`, id);
    await updateDoc(todoRef, { isDeleted: false });
  };

  // Function to handle filter change
  const handleFilterChange = (e) => {
    setFilteredStatus(e.target.value);
    setCurrentPage(1); // Reset to first page when changing filters
  };

  // Function to handle search
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const deletePermanently = (id) => {
    deleteDoc(doc(db, `user/${user?.uid}/todo/${id}`));
  };

  // Effect to fetch todos based on filter, search term, and user ID
  useEffect(() => {
    let q;
    if (filteredStatus === "all") {
      q = query(
        collection(db, `user/${user?.uid}/todo`),
        where("isDeleted", "==", false)
      );
    } else if (filteredStatus === "deleted") {
      q = query(
        collection(db, `user/${user?.uid}/todo`),
        where("isDeleted", "==", true)
      );
    } else if (filteredStatus === "favorite") {
      q = query(
        collection(db, `user/${user?.uid}/todo`),
        where("isFavorite", "==", true),
        where("isDeleted", "==", false)
      );
    } else {
      q = query(
        collection(db, `user/${user?.uid}/todo`),
        where("isDeleted", "==", false),
        where("status", "==", filteredStatus === "completed")
      );
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todos = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        status: doc.data().status,
        isDeleted: doc.data().isDeleted,
        isFavorite: doc.data().isFavorite,
        time: doc.data().time,
      }));

      // Filter todos based on search term
      const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Sort todos: incomplete first, then completed
      const sortedTodos = [...filteredTodos].sort((a, b) => {
        if (a.status && !b.status) return 1;
        if (!a.status && b.status) return -1;
        return 0;
      });

      setTodoList(sortedTodos);
    });

    return unsubscribe;
  }, [filteredStatus, searchTerm, user?.uid]);

  // pagination
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todoList.slice(indexOfFirstTodo, indexOfLastTodo);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="flex justify-center flex-col">
      <Header />

      <main className="w-full  flex flex-col lg:flex-row lg:h-screen mt-[80px] lg:mt-[0px]  max-w-[1700px] ">
        <div
          className="w-16 h-16 flex items-center justify-center bg-blue-500 rounded-full absolute bottom-7 right-7 lg:hidden hover:scale-110 duration-300 transition ease-in-out hover:bg-blue-600"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <h1 className="text-[33px] font-bold text-white">+</h1>
        </div>
        <div className="flex-1 p-4 border-r-2 border-gray-300 lg:flex flex-col justify-center items-center gap-y-5 hidden lg:mt-[80px]">
          <h1 className="text-3xl font-bold">TODO</h1>
          <p className="max-w-[500px] text-justify text-gray-500 ">
            Simplify your daily routine with our intuitive todo app. Efficiently
            manage tasks, mark important ones as favorites with a single tap,
            and utilize our powerful search functionality to quickly locate
            specific tasks
          </p>
          <div className="w-full lg:w-[40%]">
            <form action="" className="flex flex-col gap-y-4 w-full">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border-2 border-gray-300 p-2 rounded-md "
                placeholder="Title"
                required
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-2 border-gray-300 p-2 rounded-md "
                placeholder="Desciption"
                required
              />

              <button
                className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-2 px-2 rounded mx-4 disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
                type="button"
                onClick={addTodo}
                disabled={!input || !description}
              >
                Add New
              </button>
            </form>
          </div>
        </div>
        <div className="flex-1 p-4 flex flex-col justify-start items-center gap-y-5 lg:mt-[80px]">
          <div className="w-full">
            <p className="text-[23px] font-bold uppercase lg:text-start text-center ">
              Todo List
            </p>
          </div>
          <FilterOptions
            filteredStatus={filteredStatus}
            handleFilterChange={handleFilterChange}
            handleSearch={handleSearch}
          />

          <TodoList
            todos={currentTodos}
            toggleTodoCompletion={toggleTodoCompletion}
            toggleFavorite={toggleFavorite}
            deleteTodo={deleteTodo}
            undoDeleteTodo={undoDeleteTodo}
            deletePermanently={deletePermanently}
          />
          <div>
            <ul className="flex list-none mt-4">
              {Array.from({
                length: Math.ceil(todoList.length / todosPerPage),
              }).map((_, index) => (
                <li key={index}>
                  <button
                    className={`mr-2 px-3 py-1 rounded ${
                      currentPage === index + 1 ? "bg-blue-500" : "bg-blue-400"
                    }`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      {isModalOpen && (
        <div className="modal bg-[#4b4b4b64] w-full h-screen absolute top-0 flex items-center justify-center lg:hidden px-4">
          <div className=" shadow-lg bg-white p-4 w-full py-8 rounded-md">
            <div className="flex-1 p-4 flex flex-col justify-center items-center gap-y-5 ">
              <h1 className="text-3xl font-bold uppercase">Add New TODO</h1>

              <div className="w-full lg:w-[40%]">
                <form action="" className="flex flex-col gap-y-4 w-full">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border-2 border-gray-300 p-2 rounded-md "
                    placeholder="Title"
                    required
                  />
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border-2 border-gray-300 p-2 rounded-md"
                    placeholder="Desciption"
                    required
                  />

                  <button
                    className={`flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-2 px-2 rounded mx-4 disabled:bg-gray-400 disabled:border-gray-400 `}
                    type="button"
                    onClick={addTodo}
                    disabled={!input || !description}
                  >
                    Add New
                  </button>
                  <button
                    className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-2 px-2 rounded mx-4"
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAlert && (
        <div className="absolute top-0 right-0 mt-14 mr-4 bg-green-500 text-white px-5 py-3 rounded">
          Successfully added new Todo
        </div>
      )}
    </div>
  );
};

export default Dashboard;
