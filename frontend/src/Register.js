import React, { useState } from "react";
import API from "./api";
import "./styles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", { name, email, password });
      setMessage("Registered Successfully — Login now");
      window.location.href = "/";
    } catch (error) {
      setMessage("Email already registered");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <p>{message}</p>
    </div>
  );
};

export default Register;
