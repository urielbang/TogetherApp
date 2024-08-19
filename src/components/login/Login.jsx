import React, { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { Oval } from "react-loader-spinner";
import { svg } from "../../assets/svgString";

import "./style.css";

import { Link } from "react-router-dom";

export default function Login() {
  const { handleChange, handleSubmit, isLoading } = useContext(UserContext);

  return (
    <div className="main">
      {/* <div className="picLogin"></div> */}

      <div className="svgClass" dangerouslySetInnerHTML={{ __html: svg }} />

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
          <button className="btn-register" type="submit">
            {!isLoading ? (
              "Login!"
            ) : (
              <Oval
                height="30"
                width="80"
                color="blue"
                ariaLabel="loading"
                secondaryColor="lightgreen"
                strokeWidth={2}
                strokeWidthSecondary={2}
                wrapperStyle={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            )}
          </button>
          <Link to="/register">d'ont have account?</Link>
        </form>
      </div>
    </div>
  );
}
