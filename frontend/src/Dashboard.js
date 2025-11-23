import React from "react";
import "./styles.css";

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="container">
      <h1>Student Task Manager</h1>
      <p>Manage your tasks effortlessly</p>

      <button onClick={() => (window.location.href = "/tasks")}>Go to Tasks</button>
      <button className="link-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
