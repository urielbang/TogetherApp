import axios from "axios";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { UserContext } from "../../context/UserProvider";
import "./style.css";
import { APIBaseUrl } from "../../config/index";
import PostCard from "../../components/postCard/PostCard";

export default function HomeFeed() {
  const [posts, setPosts] = useState([]);
  const [centent, setContent] = useState({});
  const [image, setImage] = useState({});
  const { logedUser } = useContext(UserContext);

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
  const handleChange = (e) => {
    setContent({
      ...centent,
      content: e.target.value,
      user: logedUser._id,
    });
  };

  const fetcPosts = async () => {
    const res = await axios.get(`${APIBaseUrl}posts`);
    const data = await res.data;

    const dataSort = data.reverse();
    setPosts(dataSort);
  };
  const handleChangeVideo = (e) => {
    setImage(e.target.files[0]);
  };
  useEffect(() => {
    fetcPosts();
  }, [posts]);

  return (
    <div className="main">
      <div className="createPostContainer">
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

        <div className="containerCardsPosts">
          {posts.map((post, i) => {
            return <PostCard key={i} post={post} setPosts={setPosts} />;
          })}
        </div>
      </div>
    </div>
  );
}
