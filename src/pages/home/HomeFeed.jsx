import axios from "axios";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { UserContext } from "../../context/UserProvider";
import "./style.css";
import { APIBaseUrl } from "../../config/index";
import PostCard from "../../components/postCard/PostCard";
import { IoMdClose } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { FaEarthAmericas } from "react-icons/fa6";

export default function HomeFeed({ setToglle }) {
  const [posts, setPosts] = useState([]);
  const [centent, setContent] = useState({});
  const [image, setImage] = useState({});
  const { logedUser } = useContext(UserContext);

  const handleToglle = () => {
    setToglle(false);
  };

  //! to post a new Post
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${APIBaseUrl}posts`,
        { ...centent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (image.name) {
        const formData = new FormData();
        formData.append("postImage", image);

        const resImg = await axios.post(
          `${APIBaseUrl}posts/image/${res.data._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        await resImg.data;

        const data = await res.data;
        setPosts([...posts, data].reverse());
      }
      const data = await res.data;
      setPosts([...posts, data].reverse());
      e.target[0].value = "";
      e.target[1].value = "";
    } catch (error) {
      console.log(error);
    }
  };

  //! collect the data input from user
  const handleChange = (e) => {
    setContent({
      ...centent,
      content: e.target.value,
      user: logedUser._id,
    });
  };

  //! fetch all posts exist
  const fetcPosts = async () => {
    const res = await axios.get(`${APIBaseUrl}posts`);
    const data = await res.data;

    const dataSort = data.reverse();
    setPosts(dataSort);
  };

  //! set the image/video file
  const handleChangeVideo = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    fetcPosts();
  }, []);

  return (
    <div className="main" onClick={handleToglle}>
      <div className="createPostContainer">
        <div className="postCreate">
          <div className="headPostCreate">
            <IoMdClose className="iconClose" />
            <SlOptions className="iconEdit" />
          </div>
          <div className="profilePost">
            <div className="profile">
              <img className="prfilePic" src={logedUser.imageUrl} />
              <div className="namePostContainer">
                <p>{logedUser.name}</p>
                <span>{logedUser.email}</span>
              </div>
            </div>
            <div className="containerPublic">
              {" "}
              <FaEarthAmericas />
              <select>
                <option value="public">public</option>
              </select>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="formPost">
            <textarea
              onChange={handleChange}
              name="content"
              className="inputPost"
              type="text"
              placeholder="What's on your mind?"
            />

            <input
              className="file-upload-label"
              onChange={handleChangeVideo}
              type="file"
              name="imageUrl"
              id="video"
              placeholder="video"
            />

            <button className="btn-post" type="submit">
              post!
            </button>
          </form>
        </div>

        <div className="containerCardsPosts">
          {posts.map((post, i) => {
            return <PostCard key={i} post={post} setPosts={setPosts} />;
          })}
        </div>
      </div>
    </div>
  );
}
