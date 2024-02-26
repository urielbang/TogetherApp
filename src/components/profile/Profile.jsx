import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIBaseUrl } from "../../config";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState({});
  const { id } = useParams();

  const fetchUSerById = async () => {
    const res = await axios.get(`${APIBaseUrl}users/${id}`);
    const data = await res.data;
    setCurrentUser(data);
  };

  useEffect(() => {
    fetchUSerById();
  }, []);

  console.log(currentUser);
  return (
    <div className="main">
      <div className="containerAcount">
        <h1> Name:{currentUser.name}</h1>
        <h4>email {currentUser.email}</h4>
        <img src={currentUser.imageUrl} />
      </div>
    </div>
  );
}
