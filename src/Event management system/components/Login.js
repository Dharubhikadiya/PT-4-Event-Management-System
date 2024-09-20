import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './form.css'; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/");
    } else {
      setError("Invalid email or password. Please register if you haven't.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="lato-normal mb-4 d-flex justify-content-start">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label className="d-flex justify-content-start lato-normal mb-2">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label className="d-flex justify-content-start lato-normal mb-2">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button type="submit" className="btn btn-success btn-block">
          Login
        </button>
        <p className="lato-normal d-flex justify-content-start mt-3">Don't have an account? <a href="/register">Register</a></p>
      </form>
    </div>
  );
}

export default Login;

