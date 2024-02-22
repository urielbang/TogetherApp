import React, { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import "./style.css";

import { Link } from "react-router-dom";

export default function Login() {
  const { handleChange, handleSubmit } = useContext(UserContext);
  return (
    <div className="main">
      <div className="containerLogin">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
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
          <button type="submit"> Login!</button>
          <Link to="/register">not have account?</Link>
        </form>
      </div>
    </div>
  );
}
