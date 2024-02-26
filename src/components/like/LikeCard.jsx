import React, { useContext, useEffect, useState } from "react";
import { AiTwotoneLike } from "react-icons/ai";
import { UserContext } from "../../context/UserProvider";
import { APIBaseUrl } from "../../config";

import "./style.css";
import axios from "axios";

export default function LikeCard({ postId, likes }) {
  const [usersLikes, setUserLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [animation, setAnimation] = useState("");
  const [toglle, setToglle] = useState(false);

  const fetchLikesUsers = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${APIBaseUrl}likes/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.data;
    setUserLikes(data);
  };
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

  useEffect(() => {
    fetchLikesUsers();
  }, []);

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
      {toglle
        ? usersLikes?.map((like) => {
            return <p key={like._id}>{like?.user.name}</p>;
          })
        : ""}
    </div>
  );
}
