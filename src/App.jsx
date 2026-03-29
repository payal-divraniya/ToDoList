import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(""); // ✅ for toast

  // ✅ Load tasks
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  // ✅ Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ✅ Load user
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(savedUser);
  }, []);

  // ✅ Show message function
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  // ✅ Logout
  const handleLogout = () => {
    showMessage("Logging out...");
    setTimeout(() => {
      localStorage.removeItem("user");
      setUser(null);
    }, 1000);
  };

  // Add task
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    showMessage("Task added ✅");
  };

  // Delete task (NO confirm popup)
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    showMessage("Task deleted 🗑");
  };

  // Toggle complete
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Edit task
  const editTask = (id, newText) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
    showMessage("Task updated ✏️");
  };

  // ✅ Improved Filter + Search
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .filter((task) =>
      (task.text || "")
        .toLowerCase()
        .includes(search.trim().toLowerCase())
    );

  return (
    <div className="app">
      <h1>Todo App 🚀</h1>

      {/* ✅ Toast Message */}
      {message && <div className="toast">{message}</div>}

      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <>
          <h2 className="welcome">Welcome, {user} 🎉</h2>

          <button onClick={handleLogout} className="logout">
            Logout
          </button>

          <TodoForm addTask={addTask} />

          {/* ✅ Improved Search UI */}
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            className="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="filters">
            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("completed")}>
              Completed
            </button>
            <button onClick={() => setFilter("pending")}>
              Pending
            </button>
          </div>

          <TodoList
            tasks={filteredTasks}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            editTask={editTask}
          />
        </>
      )}
    </div>
  );
};

export default App;