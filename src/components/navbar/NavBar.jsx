import { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import img from "../../assets/icon_2_transparent.png";
import { UserContext } from "../../context/UserProvider";
import "./style.css";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuMessageSquare } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";

import homeImg from "../../assets/wired-flat-63-home.gif";

import logIn from "../../assets/login.png";
import { CiLogout } from "react-icons/ci";

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
      <img className="iconAppNav" src={img} />
      <div className="navBarMiddleIcons">
        <div className="search-box">
          <HiMiniMagnifyingGlass className="search-icon" />
          <input type="text" className="search-input" placeholder="Search..." />
        </div>
        <ul>
          <li>
            <Link to="/">
              <img className="iconHome" src={homeImg} />
            </Link>
          </li>
          <li>
            <img className="iconHome" src={logIn} onClick={handleLogOut} />
          </li>
          <li>
            <Link to="/account">
              <img className="iconHome" src={logedUser?.imageUrl} />
            </Link>
          </li>

          <li className="nameUser">{logedUser.name}</li>

          {toglle ? (
            <CiLogout className="iconLogOut" onClick={handleLogOut} />
          ) : (
            ""
          )}
        </ul>
      </div>
      <div className="iconsContainer">
        <IoMdNotificationsOutline className="iconRignNavBar" />
        <LuMessageSquare className="iconRignNavBar" />
        <CiSettings className="iconSetting" />
      </div>
    </div>
  );
}
