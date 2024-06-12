import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./style.css";
import { APIBaseUrl } from "../../config";
import axios from "axios";
import DinamicChat from "../../components/dinamicchat/DinamicChat";
import imgProfile from "../../assets/profile.png";
import { UserContext } from "../../context/UserProvider";

export default function Message({ toggleSideChat }) {
  const [users, setUsers] = useState([]);
  const [currentID, setCurrentUserId] = useState("");
  const { logedUser } = useContext(UserContext);

  const handleClick = (id) => {
    console.log(id);
  };

  const fetchUsers = async () => {
    const res = await axios.get(`${APIBaseUrl}users`);
    const data = res.data;
    console.log(data);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
    console.log(logedUser);
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
            <Route path="/chatUsers/:id" element={<DinamicChat />} />
          </Routes>
          <div className="inputContainer">
            <input
              className="inputChat"
              type="text"
              placeholder="Type a message..."
            />
            <button className="sendButton">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
