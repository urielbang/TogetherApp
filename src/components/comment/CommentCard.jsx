import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useState } from "react";
import axios from "axios";
import { APIBaseUrl } from "../../config";

export default function CommentCard({ comment }) {
  const [user, setUser] = useState({});

  const getUserById = async () => {
    try {
      const res = await axios.get(`${APIBaseUrl}users/${comment.user}`);
      const data = await res.data;
      setUser(data);
    } catch (error) {}
  };
  useEffect(() => {
    getUserById();
  }, []);
  return (
    <div className="cardMessage">
      <Link className="userImg" to={`profile/${user?._id}`}>
        {" "}
        <img className="userCommentImg" src={user?.imageUrl} />
      </Link>

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
