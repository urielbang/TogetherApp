import { useContext, useEffect, useState } from "react";
import { AiTwotoneLike } from "react-icons/ai";
import { UserContext } from "../../context/UserProvider";
import { APIBaseUrl } from "../../config";
import { Oval } from "react-loader-spinner";

import "./style.css";
import axios from "axios";

export default function LikeCard({ postId, likes }) {
  const [liked, setLiked] = useState(false);
  const [animation, setAnimation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allLikesFetch, setAllLikesFecth] = useState([]);

  const { logedUser } = useContext(UserContext);

  //! click on like
  const handleClickLike = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      //! if the like was not clicked and make animation click
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
        setIsLoading(false);
      } else {
        //! if was clicked then delete the like
        setIsLoading(true);
        const token = localStorage.getItem("token");

        const likesOfPost = await axios.get(`${APIBaseUrl}likes/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await likesOfPost.data;

        const foundLike = data.filter((like) => {
          return like.user._id === logedUser._id;
        });

        await axios.delete(`${APIBaseUrl}likes/${foundLike[0]._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsLoading(false);
        setLiked(false);
      }
    } catch (error) {
      console.log(error);

      // alert("you already liked this post!");
      console.log(error);
    }
  };

  //! check if current like is liked or not
  useEffect(() => {
    const fetchIsLiked = async () => {
      const token = localStorage.getItem("token");

      const resIsLiked = await axios.get(`${APIBaseUrl}likes/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const isLiked = await resIsLiked.data;
      setAllLikesFecth(isLiked);

      //! return only the id of users that make likes on post
      const renderUsersLikes = isLiked.map((like) => {
        if (like.user) {
          return like.user._id;
        } else {
          return null;
        }
      });

      //! check if the ids is includes with current user log in
      if (renderUsersLikes.includes(logedUser._id)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    };

    fetchIsLiked();
  }, [logedUser._id, postId, liked]);

  return (
    <div className="containerLikeCard">
      <div className="like-button" onClick={handleClickLike}>
        {isLoading ? (
          <Oval
            height="2rem"
            width="2rem"
            color="blue"
            ariaLabel="loading"
            secondaryColor="lightgreen"
            strokeWidth={2}
            strokeWidthSecondary={2}
            wrapperStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        ) : (
          <AiTwotoneLike
            className={`icon ${liked ? "liked" : ""} ${animation}`}
          />
        )}
        <p>likes {allLikesFetch ? allLikesFetch.length : likes.length}</p>
      </div>
    </div>
  );
}
