import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./style.css";
import { APIBaseUrl } from "../../config";
import axios from "axios";
import DinamicChat from "../../components/dinamicchat/DinamicChat";
import imgProfile from "../../assets/profile.png";
import { UserContext } from "../../context/UserProvider";

export default function Message({ toggleSideChat }) {
  const [users, setUsers] = useState([]);
  const [currentID, setCurrentUserId] = useState("");
  const [inputData, setInputData] = useState("");
  const { logedUser } = useContext(UserContext);

  //! current user id to speak
  const handleClick = (id) => {
    setCurrentUserId(id);
  };

  //! fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${APIBaseUrl}users`);
      const data = res.data;
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  //! input collect to the chat
  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  //! click send message
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${APIBaseUrl}messages`,
        {
          sender: logedUser?._id,
          receiver: currentID,
          content: inputData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.data;

      console.log(data);
      setInputData("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={toggleSideChat ? "sass" : "active"}>
      <div className="header">
        <p>Chat Together</p>
      </div>
      <div className="containerChat">
        <div className="usersChat">
          <div className="containerCardUsersChats">
            {users.map((user) => (
              <div
                className="userCardMessanger"
                onClick={() => handleClick(user._id)}
                key={user._id}
              >
                <Link to={`/chatUsers/${user._id}`}>
                  <img
                    src={user.imageUrl ? user.imageUrl : imgProfile}
                    alt={user.name}
                  />
                  <span>{user.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="chatApp">
          <Routes>
            <Route
              path="/chatUsers/:id"
              element={<DinamicChat dataDepend={handleSubmit} />}
            />
          </Routes>
          <div className="inputContainer">
            <input
              className="inputChat"
              type="text"
              placeholder="Type a message..."
              onChange={handleChange}
              value={inputData}
            />
            <button onClick={handleSubmit} className="sendButton">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
