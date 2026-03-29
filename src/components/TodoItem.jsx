import { useState } from "react";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";

const TodoItem = ({ task, deleteTask, toggleTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleSave = () => {
    if (!newText.trim()) return;
    editTask(task.id, newText);
    setIsEditing(false);
  };

  return (
    <div className={`todo ${task.completed ? "completed" : ""}`}>
      <div className="todo-content">
        {isEditing ? (
          <>
            <input
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <h3>{task.text}</h3>
            <p>{task.date}</p>
          </>
        )}
      </div>

      <div className="actions">
        <button onClick={() => toggleTask(task.id)}>
          <FaCheck />
        </button>

        <button onClick={() => setIsEditing(true)}>
          <FaEdit />
        </button>

        <button onClick={() => deleteTask(task.id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;