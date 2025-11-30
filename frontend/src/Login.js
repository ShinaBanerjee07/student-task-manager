import React, { useState } from "react";
import API from "./api";
import "./styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

 const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    window.location.href = "/dashboard";
  } catch (error) {
    setMessage("Invalid Credentials");
  }
};


  return (
    <div className="container">
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
      <button className="link-btn" onClick={() => (window.location.href = "/register")}>
        New user? Register
      </button>
    </div>
  );
};

export default Login;
