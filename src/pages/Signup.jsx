import React, { useState } from "react";
import { FaFacebook } from 'react-icons/fa'
import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import './Signup.css'


function Signup() {
    const [role, setRole] = useState("admin");

    const [admin, setAdmin] = useState({
        username: "",
        password: "",
    });

    const [doctor, setDoctor] = useState({
        username: "",
        password: "",
    });

    const [patient, setPatient] = useState({
        username: "",
        password: "",
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

    return (
    <div className="signup-bg">
        <div className="signup-card">

            <h2 className="signup-title">Healthcare Panel</h2>
            <p className="signup-subtitle">Create your account</p>

            {/* ROLE TABS */}
           

            <form className="signup-form">

                <input
                    type="text"
                    name="fullname"
                    className="signup-input"
                    placeholder="Full Name"
                    value={getCurrentData().fullname}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    className="signup-input"
                    placeholder="Email"
                    value={getCurrentData().email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    className="signup-input"
                    placeholder="Password"
                    value={getCurrentData().password}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="confirmPassword"
                    className="signup-input"
                    placeholder="Confirm Password"
                    value={getCurrentData().confirmPassword}
                    onChange={handleChange}
                />

                <button type="submit" className="signup-btn">
                    Sign Up
                </button>
            </form>

            <p className="signup-login-text">
                Already have an account?{" "}
                <Link to="/Login" className="signup-login-link">Log in</Link>
            </p>

            <div className="signup-social">
                <button className="signup-social-btn"><FaGoogle /></button>
                <button className="signup-social-btn"><FaFacebook /></button>
                <button className="signup-social-btn"><FaApple /></button>
            </div>

        </div>
    </div>
);

}
export default Signup;
