import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserProvider";
import { useParams } from "react-router-dom";

export default function DinamicChat() {
  const { logedUser } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    console.log(logedUser);
  }, []);
  return <div className="chatMessages"></div>;
}
