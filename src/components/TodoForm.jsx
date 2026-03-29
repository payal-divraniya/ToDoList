import { useState } from "react";

const TodoForm = ({ addTask }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      alert("Task cannot be empty!");
      return;
    }

    addTask({
      text,
      date: new Date().toLocaleString(),
    });

    setText("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TodoForm;