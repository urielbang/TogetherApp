import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { APIBaseUrl } from "../../config";
import imgProfile from "../../assets/profile.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./style.css";
import DeleteButton from "../delete-profile/DeleteButton";
import { UserContext } from "../../context/UserProvider";

export default function Profile({ setToglle }) {
  const [currentUser, setCurrentUser] = useState({});

  const { id } = useParams();

  const fetchUSerById = async () => {
    const res = await axios.get(`${APIBaseUrl}users/${id}`);
    const data = await res.data;
    setCurrentUser(data);
  };

  const handleToglle = () => {
    setToglle(false);
  };

  useEffect(() => {
    fetchUSerById();
    setToglle(false);
  }, [fetchUSerById, setToglle]);

  console.log(currentUser);
  return (
    <div className="main" onClick={handleToglle}>
      <div className="profile-container">
        <div className="back-button">
          <Link to="/" className="back-link">
            <IoMdArrowRoundBack /> Back
          </Link>
        </div>
        <div className="profile-details">
          <img
            className="profile-image"
            src={currentUser.imageUrl ? currentUser.imageUrl : imgProfile}
            alt="Profile"
          />
          <h1 className="profile-name">Name: {currentUser.name}</h1>
          <h4 className="profile-email">Email: {currentUser.email}</h4>
          <DeleteButton userId={currentUser?._id} className="delete-btn" />
        </div>
      </div>
    </div>
  );
}
