import React, { useContext, useEffect, useState } from "react";
import { AiTwotoneLike } from "react-icons/ai";
import { UserContext } from "../../context/UserProvider";
import { APIBaseUrl } from "../../config";

import "./style.css";
import axios from "axios";

export default function LikeCard({ postId, likes }) {
  const [liked, setLiked] = useState(false);
  const [animation, setAnimation] = useState("");
  const [toglle, setToglle] = useState(false);

  const { logedUser } = useContext(UserContext);

  const toggleLike = async () => {
    const token = localStorage.getItem("token");
    setToglle(!toglle);
    if (!liked) {
      const res = await axios.post(
        `${APIBaseUrl}likes`,
        { user: logedUser._id, post: postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.data;
      console.log(data);
    }
    setLiked(!liked);
    setAnimation("bounce");
    setTimeout(() => setAnimation(""), 700);
  };

  return (
    <div className="containerLikeCard">
      <div className="like-button" onClick={toggleLike}>
        <AiTwotoneLike
          className={`icon ${liked ? "liked" : ""} ${animation}`}
        />
        <p>
          likes {likes.length} {likes.date}
        </p>
      </div>
    </div>
  );
}
