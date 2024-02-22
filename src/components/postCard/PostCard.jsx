import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { APIBaseUrl } from "../../config/index";
import { SlOptions } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";
import MessageCard from "../message/MessageCard";

import "./style.css";
import axios from "axios";

export default function PostCard({ post }) {
  const [toglle, seToglle] = useState(false);
  const [comment, setComment] = useState({});

  const { logedUser } = useContext(UserContext);

  const handleToggle = () => {
    seToglle(!toglle);
  };
  const handleDeletePost = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`${APIBaseUrl}posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("deleted");
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const dateToTimeFromNow = (createdAt) => {
    const datetimeString = createdAt;
    const givenDatetime = new Date(datetimeString);

    const nowDatetime = new Date();

    const timeDifference = nowDatetime - givenDatetime;

    const differenceInSeconds = Math.floor(timeDifference / 1000);

    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const minutes = differenceInMinutes % 60;

    return `${minutes} Minutes ago`;
  };
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const body = { ...comment, user: logedUser._id, post: post._id };
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${APIBaseUrl}comments`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setComment({ ...comment, content: e.target.value });
  };
  return (
    <div className="cardPost">
      <div className="haederCard">
        <div>
          <p>{post.user?.name}</p>
          <span>{dateToTimeFromNow(post.createdAt)}</span>
          <span> {post.privacy}</span>
        </div>
        <div className="toggleContainer">
          <SlOptions onClick={handleToggle} className="iconOptions" />
          {toglle && (
            <div className="dropDown">
              <p
                onClick={() => {
                  handleDeletePost(post._id);
                }}
              >
                {" "}
                <IoIosRemoveCircleOutline />
                Remove Post
              </p>
              <p>
                <MdEdit />
                Edit Post
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="statusContext">
        {post.imageUrl ? <img src={post.imageUrl} /> : ""}
        {post.imageUrl?.includes("mp4") ? (
          <video autoPlay controls>
            <source src={post.imageUrl} type="video/mp4" />
          </video>
        ) : (
          ""
        )}
        <span className="status">{post.content}</span>
      </div>
      <div className="containerMessages">
        <div className="formCommentContainer">
          <FaRegUserCircle className="iconUserComment" />
          <form onSubmit={handleSubmitComment}>
            <input
              onChange={handleChange}
              type="text"
              placeholder="write your comment"
              name="comment"
            />
          </form>
        </div>
        <div className="containerComment">
          {post.comments?.map((comment) => {
            return <MessageCard key={comment._id} comment={comment} />;
          })}
        </div>
      </div>
    </div>
  );
}
