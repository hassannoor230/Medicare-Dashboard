import React, { useState } from "react";
import { FaFacebook } from 'react-icons/fa';
import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import './css.css';
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [role, setRole] = useState("admin");

  const [admin, setAdmin] = useState({
    username: "admin",
    password: "admin123",
  });

  const [doctor, setDoctor] = useState({
    username: "doctor",
    password: "doctor123",
  });

  const [patient, setPatient] = useState({
    username: "patient",
    password: "patient123",
  });

  const getCurrentData = () => {
    if (role === "admin") return admin;
    if (role === "doctor") return doctor;
    return patient;
  };

  const setCurrentData = (updated) => {
    if (role === "admin") setAdmin(updated);
    else if (role === "doctor") setDoctor(updated);
    else setPatient(updated);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentData({
      ...getCurrentData(),
      [name]: value,
    });
  };

  // ===== LOGIN HANDLE =====
  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = getCurrentData();

    // Simple fixed login check
    if (
      (role === "admin" && username === "admin" && password === "admin123") ||
      (role === "doctor" && username === "doctor" && password === "doctor123") ||
      (role === "patient" && username === "patient" && password === "patient123")
    ) {
      // role save in localStorage
      localStorage.setItem("role", role);

      // Redirect to dashboard
      navigate("/dashboard");
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <div className="bg-image">
      <div
        className="back p-10"
        style={{
          border: "1px solid white",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          borderRadius: "20px",
          width: "420px",
        }}
      >
        <h2 className="txt text-4xl font-bold">Healthcare Panel</h2>
        <h2 className="txt text-3xl font-bold mt-1">Sign In</h2>
        <p className="txt mb-6 opacity-80">Enter your credentials to continue</p>
        <br />

        {/* ROLE BUTTONS */}
        <div className="role-buttons">
          <button
            onClick={() => setRole("admin")}
            className={`bg px-6 py-2 rounded-full font-medium ${
              role === "admin" ? "bg-green-600 text-white" : ""
            }`}
          >
            Admin
          </button>

          <button
            onClick={() => setRole("doctor")}
            className={`bg2 px-6 py-2 rounded-full font-medium ${
              role === "doctor" ? "bg-orange-500 text-white" : ""
            }`}
          >
            Doctor
          </button>

          <button
            onClick={() => setRole("patient")}
            className={`bg3 px-6 py-2 rounded-full font-medium ${
              role === "patient" ? "bg-blue-600 text-white" : ""
            }`}
          >
            Patient
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <label className="txt">Username*</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={getCurrentData().username}
            onChange={handleChange}
          />

          <br />

          <label className="txt">Password*</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={getCurrentData().password}
            onChange={handleChange}
          />

          <br /><br />

          <div className="txt flex items-center gap-2 mb-4">
            <input type="checkbox" />
            <span>Remember me</span>
          </div>

          <button type="submit">Login</button>
        </form>

        <br />

        <p className="txt mt-4 text-center">
          Don't have an account?
          <Link to="/Signup" className="text-blue-500"> Sign up</Link>
        </p>

        {/* SOCIAL ICONS */}
        <div className="social-buttons">
          <button className="p-3"><FaGoogle /></button>
          <button className="p-3"><FaFacebook /></button>
          <button className="p-3"><FaApple /></button>
        </div>
      </div>
    </div>
  );
}

export default Login;
