import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './form.css'; 

function Register() {
  const [userDetails, setUserDetails] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (!userDetails.username || !userDetails.email || !userDetails.password) {
      setError("All fields are required!");
      return;
    }

    const userExists = users.find((user) => user.email === userDetails.email);
    if (userExists) {
      setError("User already registered. Please login.");
    } else {
      users.push(userDetails);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful! Please login.");
      navigate("/Login");
    }
  };

  return (
    <div className="form-container">
      <h2 className="lato-normal mb-4 d-flex justify-content-start">Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label className="d-flex justify-content-start lato-normal mb-2">Username</label>
          <input
            type="text"
            className="form-control"
            value={userDetails.username}
            onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label className="d-flex justify-content-start lato-normal mb-2">Email</label>
          <input
            type="email"
            className="form-control"
            value={userDetails.email}
            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label className="d-flex justify-content-start lato-normal mb-2">Password</label>
          <input
            type="password"
            className="form-control"
            value={userDetails.password}
            onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
            placeholder="Enter password"
          />
        </div>
        <button type="submit" className="btn btn-success btn-block">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
