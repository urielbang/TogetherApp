import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import "./style.css";
import { useState } from "react";
import axios from "axios";
import { APIBaseUrl } from "../../config";

export default function MessageCard({ comment }) {
  const [user, setUser] = useState({});

  const getUserById = async () => {
    try {
      const res = await axios.get(`${APIBaseUrl}users/${comment.user}`);
      const data = await res.data;
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserById();
  }, []);
  return (
    <div className="cardMessage">
      <FaUser className="iconUserComment" />
      <div className="messageName">
        <div className="textAndDate">
          <span>{user ? user.name : ""}</span>

          <span>{new Date(comment.Date).toLocaleString().split(", ")[1]}</span>
        </div>
        <div className="commentContent">
          {" "}
          <p>{comment.content}</p>
        </div>
      </div>
    </div>
  );
}
