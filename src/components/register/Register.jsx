import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

import axios from "axios";
import "./style.css";
import { svg } from "../../assets/svgString";
import { APIBaseUrl } from "../../config";

export default function SignIn() {
  const [inputData, setInputData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({});
  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (
        inputPasswordRef.current.value.length < 8 ||
        !inputEmailRef.current.value.includes("@")
      ) {
        return alert("Invalid input Please check your entered credentials.");
      }
      const res = await axios.post(`${APIBaseUrl}users/register`, inputData);

      if (image.name) {
        const formData = new FormData();
        formData.append("postImage", image);

        const resImg = await axios.post(
          `${APIBaseUrl}users/image/${res.data._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        await resImg.data;
      }
      console.log("registerd");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const handleChangeVideo = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <div className="main">
      <div className="svgClass" dangerouslySetInnerHTML={{ __html: svg }} />
      <div className="containerRegister">
        <h1>Sign in</h1>
        <form className="formRegister" onSubmit={handleSubmit}>
          <input
            ref={inputNameRef}
            onChange={handleChange}
            type="text"
            placeholder="Name"
            name="name"
          />
          <input
            onChange={handleChange}
            ref={inputEmailRef}
            type="email"
            placeholder="Email"
            name="email"
          />
          <input
            onChange={handleChange}
            type="password"
            ref={inputPasswordRef}
            placeholder="Password"
            name="password"
          />

          <div className="file-upload-wrapper">
            <input
              type="file"
              id="file-upload"
              hidden
              onChange={handleChangeVideo}
            />
            <label htmlFor="file-upload" className="file-upload-button">
              Upload Image
              <i className="fas fa-cloud-upload-alt"></i>
            </label>
          </div>

          <button
            className="btn-register"
            onChange={handleChange}
            type="submit"
          >
            {!isLoading ? (
              "Sign in!"
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
          <Link to="/login">alreade have account?</Link>
        </form>
      </div>
    </div>
  );
}
