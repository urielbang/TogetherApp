import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { APIBaseUrl } from "../../config";

export default function SignIn() {
  const [inputData, setInputData] = useState({});
  const [image, setImage] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:2000/api/v1/users/register",
        inputData
      );

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
        console.log("registerd");
      }
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
            {" "}
            Sign in!
          </button>
          <Link to="/login">alreade have account?</Link>
        </form>
      </div>
    </div>
  );
}
