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
  }, []);

  console.log(currentUser);
  return (
    <div className="main" onClick={handleToglle}>
      <div className="containerAcount">
        <div className="goBack">
          <Link to="/" className="goBack">
            <IoMdArrowRoundBack /> back
          </Link>
        </div>
        <h1> Name:{currentUser.name}</h1>
        <h4>email {currentUser.email}</h4>
        <img src={currentUser.imageUrl ? currentUser.imageUrl : imgProfile} />
        <DeleteButton userId={currentUser?._id} />
      </div>
    </div>
  );
}
