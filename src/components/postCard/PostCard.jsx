import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserProvider";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { APIBaseUrl } from "../../config/index";
import { SlOptions } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import LikeCard from "../like/LikeCard";
import "./style.css";
import axios from "axios";
import { Link } from "react-router-dom";
import CommentCard from "../comment/CommentCard";

export default function PostCard({ post, setPosts }) {
  const [toglle, seToglle] = useState(false);
  const [toglleComments, setToglleCommnts] = useState(false);
  const [comments, setCommnts] = useState([]);
  const [comment, setComment] = useState({});

  const [commentsLength, setCommenLength] = useState(post.comments.length);

  const { logedUser } = useContext(UserContext);

  const toggleSgowComments = () => {
    setToglleCommnts(!toglleComments);
  };
  const handleToggle = () => {
    seToglle(!toglle);
  };

  //! delete post
  const handleDeletePost = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`${APIBaseUrl}posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("deleted");
      fecthPosts();
    } catch (error) {
      console.log(error);
    }
    seToglle(false);
  };

  //! fetch posts and set the current posts after delete one
  const fecthPosts = async () => {
    try {
      const res = await axios.get(`${APIBaseUrl}posts`);
      const data = await res.data;

      const dataSort = data.reverse();
      setPosts(dataSort);
    } catch (err) {
      console.log(err);
    }
  };

  //! show the time the post on the air
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

  //!set comments from the props to state
  useEffect(() => {
    setCommnts(post.comments);
  }, [post]);

  //! add a new comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const body = { ...comment, user: logedUser._id, post: post._id };
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${APIBaseUrl}comments`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.data;
      setCommnts([...post.comments, { ...data }]);
      setCommenLength(commentsLength + 1);
      e.target[0].value = "";
    } catch (error) {
      console.log(error);
    }
  };

  //! collect the data from the comment
  const handleChange = (e) => {
    setComment({ ...comment, content: e.target.value });
  };

  const handleEditPost = async (id) => {
    // const res = await axios.post(`${APIBaseUrl}posts/${id}`);
  };

  return (
    <div className="cardPost">
      <div className="haederCard">
        <div className="containerHeadPost">
          <Link to={`profile/${post.user?._id}`}>
            {" "}
            <img className="headImg" src={post.user?.imageUrl} />
          </Link>
          <div className="timeAndName">
            <span>{post.user?.name}</span>
            <span className="timeHeader">
              {dateToTimeFromNow(post.createdAt)}
            </span>
          </div>
        </div>
        <div className="toggleContainer">
          <SlOptions
            onClick={
              logedUser?.email == post?.user?.email ||
              logedUser?.role == "admin"
                ? handleToggle
                : null
            }
            className="iconOptions"
          />
          {toglle && (
            <div className="dropDown">
              <p
                onClick={() => {
                  if (
                    logedUser?.email == post.user.email ||
                    logedUser?.role == "admin"
                  ) {
                    handleDeletePost(post._id);
                  }
                }}
              >
                <IoIosRemoveCircleOutline />
                Remove Post
              </p>
              <p
                onClick={() => {
                  if (
                    logedUser?.email == post.user.email ||
                    logedUser?.role == "admin"
                  ) {
                    handleEditPost(post._id);
                  }
                }}
              >
                <MdEdit />
                Edit Post
              </p>
            </div>
          )}
        </div>
      </div>
      <div onClick={() => seToglle(false)} className="postContext">
        <div className="containerStatus">
          {!toglle ? <p className="status">{post.content}</p> : <input />}
        </div>
        {post.imageUrl ? <img className="imgPost" src={post.imageUrl} /> : ""}
        {post.imageUrl?.includes("mp4") ? (
          <video className="imgPost" autoPlay controls>
            <source src={post.imageUrl} type="video/mp4" />
          </video>
        ) : (
          ""
        )}
      </div>
      <div className="containerMessages">
        <div className="formCommentContainer">
          <FaRegUserCircle className="iconUserComment" />
          <form className="form-post" onSubmit={handleSubmitComment}>
            <input
              onChange={handleChange}
              type="text"
              placeholder="write your comment"
              name="comment"
            />
            <button className="post-button" type="submit">
              Comment
            </button>
          </form>
        </div>
        <div className="containerComment">
          <div className="commentIconAndNum">
            <FaRegComment
              onClick={toggleSgowComments}
              className="iconComment"
            />
            <span>{commentsLength} comments</span>
          </div>
          <div className="conainerLikeAndNum">
            <LikeCard postId={post._id} likes={post.likes} />
          </div>
          <div className="shareClass">
            <CiShare2 className="iconComment" />
          </div>
        </div>

        {toglleComments
          ? comments?.map((comment) => {
              return <CommentCard key={comment._id} comment={comment} />;
            })
          : ""}
      </div>
    </div>
  );
}
