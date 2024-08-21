import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APIBaseUrl } from "../../config";
import "./style.css";

export default function DinamicChat({ dataDepend }) {
  const { logedUser } = useContext(UserContext);
  const { id } = useParams();

  const [messages, setMessages] = useState([]);
  const [receiverMessage, setReceiverMessage] = useState(null);
  const [messagesUser, setMessagesUser] = useState([]);

  const getUserById = async (id) => {
    try {
      const res = await axios.get(`${APIBaseUrl}users/${id}`);
      const data = await res.data;
      setReceiverMessage(data);
    } catch (error) {
      console.log(error);
    }
  };

  const mergeAndAlternate = (arr1, arr2) => {
    let mergedArray = [];
    let maxLength = Math.max(arr1.length, arr2.length);

    for (let i = 0; i < maxLength; i++) {
      if (i < arr2.length) {
        mergedArray.push(arr2[i]);
      }
      if (i < arr1.length) {
        mergedArray.push(arr1[i]);
      }
    }

    return mergedArray;
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

      const res2 = await axios.get(
        `${APIBaseUrl}messages?sender=${receiverMessage?._id}&receiver=${logedUser?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.data;
      const data2 = await res2.data;
      setMessagesUser(data2);
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserById(id);
  }, [id]);

  useEffect(() => {
    getMessagesCurrentChatUsers();
  }, [logedUser, receiverMessage, dataDepend]);

  return (
    <div className="chatMessages">
      {mergeAndAlternate(messages, messagesUser).length > 0 ? (
        mergeAndAlternate(messages, messagesUser).map((message) => {
          console.log(message?.sender === logedUser?._id);

          if (message?.sender === logedUser?._id) {
            return (
              <p className="message sender" key={message?._id}>
                {message?.content}
              </p>
            );
          } else if (message?.receiver === logedUser?._id) {
            return (
              <p className="message receiver" key={message?._id}>
                {message?.content}
              </p>
            );
          }
        })
      ) : (
        <p>No messages</p>
      )}
    </div>
  );
}
