import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
export default function SignIn() {
  const [inputData, setInputData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post(
        "http://localhost:2000/api/v1/users/register",
        inputData
      );
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  return (
    <div className="main">
      <div className="containerRegister">
        <h1>Sign in</h1>
        <form className="formRegister" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Name"
            name="name"
          />
          <input
            onChange={handleChange}
            type="email"
            placeholder="Email"
            name="email"
          />
          <input
            onChange={handleChange}
            type="password"
            placeholder="Password"
            name="password"
          />
          <button onChange={handleChange} type="submit">
            {" "}
            Sign in!
          </button>
          <Link to="/login">alreade have account?</Link>
        </form>
      </div>
    </div>
  );
}
