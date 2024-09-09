import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import DeleteButton from "../components/delete-profile/DeleteButton";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Account() {
  const { logedUser } = useContext(UserContext);
  return (
    <div className="main">
      <div className="profile-container">
        <div className="back-button">
          <Link to="/" className="back-link">
            <IoMdArrowRoundBack /> Back
          </Link>
        </div>
        <div className="profile-details">
          <img
            className="profile-image"
            src={logedUser.imageUrl ? logedUser.imageUrl : imgProfile}
            alt="Profile"
          />
          <h1 className="profile-name">Name: {logedUser.name}</h1>
          <h4 className="profile-email">Email: {logedUser.email}</h4>
          <DeleteButton userId={logedUser?._id} className="delete-btn" />
        </div>
      </div>
    </div>
  );
}
