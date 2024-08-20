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
    try {
      setToglle(!toglle);

      const token = localStorage.getItem("token");

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
        setLiked(true);
        setAnimation("bounce");
        setTimeout(() => setAnimation(""), 700);
      } else {
        const resRemoveLike = await axios.delete(
          `${APIBaseUrl}likes/${isLiked._id}`
        );
        const likesRemove = await resRemoveLike.data;
        console.log(likesRemove);
        setLiked(!liked);
      }
    } catch (error) {
      console.log(error);
      alert("you already liked this post!");
    }
  };

  useEffect(() => {
    const fetchIsLiked = async () => {
      const token = localStorage.getItem("token");

      const resIsLiked = await axios.get(`${APIBaseUrl}likes/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const isLiked = await resIsLiked.data;
      console.log(isLiked);

      if (isLiked.length != 0) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    };

    fetchIsLiked();
  }, []);

  return (
    <div className="containerLikeCard">
      <div className="like-button" onClick={toggleLike}>
        <AiTwotoneLike
          className={`icon ${liked ? "liked" : ""} ${animation}`}
        />
        <p>likes {likes.length}</p>
      </div>
    </div>
  );
}
