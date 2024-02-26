import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

export default function Account() {
  const { logedUser } = useContext(UserContext);
  return (
    <div className="main">
      <div className="containerAcount">
        <h1> Name:{logedUser.name}</h1>
        <h4>email {logedUser.email}</h4>
        <img src={logedUser.imageUrl} />
      </div>
    </div>
  );
}
