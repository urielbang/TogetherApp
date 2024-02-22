import { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import img from "../../assets/share.png";
import { UserContext } from "../../context/UserProvider";
import "./style.css";
import homeImg from "../../assets/wired-flat-63-home.gif";

export default function NavBar() {
  const { logedUser, setLogedUser } = useContext(UserContext);
  const [toglle, setToglle] = useState(false);

  const handleToggle = () => {
    setToglle(!toglle);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setLogedUser({});
    setToglle(false);
  };
  return (
    <div className="navBar">
      <img src={img} />
      <ul>
        <li>
          <Link to="/">
            <img className="iconHome" src={homeImg} />
          </Link>
        </li>
        <li>
          <Link to="/auth">Login</Link>
        </li>
        <li>
          <Link to="/account">account</Link>
        </li>
        {logedUser?.name ? (
          <li onClick={handleToggle}>{logedUser.name}</li>
        ) : (
          ""
        )}

        {toglle ? <button onClick={handleLogOut}>log out</button> : ""}
      </ul>
    </div>
  );
}
