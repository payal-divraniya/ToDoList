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
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);

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

  // ✅ Load dark mode
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") setDarkMode(true);
  }, []);

  // ✅ Save dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // ✅ Toast message
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

  // ✅ Add task
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    showMessage("Task added ✅");
  };

  // ✅ Delete task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    showMessage("Task deleted 🗑");
  };

  // ✅ Toggle complete
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // ✅ Edit task
  const editTask = (id, newText) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
    showMessage("Task updated ✏️");
  };

  // ✅ Filter + Search
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
    <div className={darkMode ? "app dark" : "app"}>
      {/* 🌙 DARK MODE BUTTON */}
      <button
        className="mode-toggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="container">
        <h1>Todo App 🚀</h1>

        {/* ✅ Toast */}
        {message && <div className="toast">{message}</div>}

        {!user ? (
          <Login setUser={setUser} />
        ) : (
          <>
            {/* 🔥 TOP BAR */}
            <div className="top-bar">
              <h2 className="welcome">Welcome, {user} 🎉</h2>
              <button onClick={handleLogout} className="logout">
                Logout
              </button>
            </div>

            {/* ADD TASK */}
            <TodoForm addTask={addTask} />

            {/* SEARCH */}
            <input
              type="text"
              placeholder="🔍 Search tasks..."
              className="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* FILTER */}
            <div className="filters">
              <button onClick={() => setFilter("all")}>All</button>
              <button onClick={() => setFilter("completed")}>
                Completed
              </button>
              <button onClick={() => setFilter("pending")}>
                Pending
              </button>
            </div>

            {/* TASK LIST */}
            <div className="task-container">
              <TodoList
                tasks={filteredTasks}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
                editTask={editTask}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;