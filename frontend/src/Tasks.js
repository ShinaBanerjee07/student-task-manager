import React, { useState, useEffect } from "react";
import API from "./api";
import { FaTrash, FaCheckCircle, FaRegCircle } from "react-icons/fa";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const res = await API.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const addTask = async () => {
    if (!title.trim()) return;
    const token = localStorage.getItem("token");
    await API.post(
      "/tasks",
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTitle("");
    fetchTasks();
  };

  // Toggle task completion
  const toggleTask = async (id) => {
    const token = localStorage.getItem("token");
    await API.put(`/tasks/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    await API.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchTasks();
  };

  return (
    <div className="task-page">
      <h2>Your Tasks</h2>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter your task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="add-btn" onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div className={`task-item ${task.isCompleted ? "completed" : ""}`} key={task._id}>
            <span className="check-icon" onClick={() => toggleTask(task._id)}>
              {task.isCompleted ? <FaCheckCircle color="#1dd75e" size={22} /> :
               <FaRegCircle color="#444" size={22} />}
            </span>

            <span className="task-text">{task.title}</span>

            <button className="delete-btn" onClick={() => deleteTask(task._id)}>
              <FaTrash color="white" />
            </button>
          </div>
        ))}
      </div>

      <button
        className="logout"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >Logout</button>
    </div>
  );
};

export default Tasks;
