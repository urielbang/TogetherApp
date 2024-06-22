import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APIBaseUrl } from "../../config";
import "./style.css";

export default function DinamicChat() {
  const { logedUser } = useContext(UserContext);
  const { id } = useParams();

  const [messages, setMessages] = useState([]);
  const [receiverMessage, setReceiverMessage] = useState(null);

  const getUserById = async (id) => {
    try {
      const res = await axios.get(`${APIBaseUrl}users/${id}`);
      const data = await res.data;
      setReceiverMessage(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMessagesCurrentChatUsers = async () => {
    if (!logedUser || !receiverMessage) return;
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        `${APIBaseUrl}messages?sender=${logedUser?._id}&receiver=${receiverMessage?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.data;
      setMessages(data);

      if (data.length <= 0) {
        try {
          const res = await axios.get(
            `${APIBaseUrl}messages?sender=${receiverMessage?._id}&receiver=${logedUser?._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await res.data;
          setMessages(data);
        } catch (error) {}
      }
    } catch (error) {
      setMessages([]);
      console.log(error);
    }
  };

  useEffect(() => {
    getUserById(id);
  }, [id]);

  useEffect(() => {
    getMessagesCurrentChatUsers();
  }, [logedUser, receiverMessage]);

  return (
    <div className="chatMessages">
      {/* <h3>{receiverMessage?.name}</h3>
      <h2>{logedUser?.name}</h2> */}

      {messages?.length > 0 ? (
        messages?.map((message) => {
          if (message?.sender == logedUser?._id) {
            return (
              <p className="message sender" key={message?._id}>
                {message?.content}
              </p>
            );
          }
          return (
            <p className="message receiver" key={message?._id}>
              {message?.content}
            </p>
          );
        })
      ) : (
        <p>No messages</p>
      )}
    </div>
  );
}
