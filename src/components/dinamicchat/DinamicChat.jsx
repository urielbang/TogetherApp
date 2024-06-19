import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APIBaseUrl } from "../../config";

export default function DinamicChat() {
  const { logedUser } = useContext(UserContext);
  const { id } = useParams();
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

  useEffect(() => {
    getUserById(id);
  }, [id]);

  return (
    <div className="chatMessages">
      <h3>{receiverMessage?.name}</h3>
      <h2>{logedUser?.name}</h2>
    </div>
  );
}
