import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/together2.png";
import imgProfile from "../../assets/profile.png";
import { UserContext } from "../../context/UserProvider";
import "./style.css";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuMessageSquare } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { APIBaseUrl } from "../../config";
import homeImg from "../../assets/wired-flat-63-home.gif";
import logIn from "../../assets/login.png";
import axios from "axios";
import Message from "../../pages/messagesPage/Message";
import { Spin as Hamburger } from "hamburger-react";

export default function NavBar({ toggle, setToglle }) {
  const [userNames, setUsersName] = useState(null);
  const [isOpen, setOpen] = useState(false); // Hamburger state

  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState({});
  const [toggleSideChat, setToglleChat] = useState(false);

  const { logedUser, setLogedUser } = useContext(UserContext);

  const toglleChatMessages = () => {
    setToglleChat(!toggleSideChat);
  };

  const handleToggleSearch = () => {
    setToglle(true);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setLogedUser({});
    navigate("/");
  };

  const handleChange = async (e) => {
    setSelectedUser(e.target.value);

    if (e.target.value.length) {
      const names = await axios.get(
        `${APIBaseUrl}users/search/${e.target.value}`
      );
      const data = await names.data;
      setUsersName(data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target[0].value = "";
  };

  return (
    <div className={`navBar ${isOpen ? "toggled" : ""}`}>
      <img className="iconAppNav" src={img} alt="App Logo" />
      <div className="search-box">
        <HiMiniMagnifyingGlass className="search-icon" />
        <form className="formSearchUsers" onSubmit={handleSubmit}>
          <input
            onClick={handleToggleSearch}
            onChange={handleChange}
            type="text"
            className="search-input"
            placeholder="Search profile..."
            list="data"
          />
          <div className={toggle ? "dataUsers" : "data"}>
            {userNames
              ? userNames.map((user, i) => (
                  <Link
                    className="selectProfile"
                    key={i}
                    to={`/profile/${user._id}`}
                  >
                    {user.name}
                    <img
                      src={user.imageUrl ? user.imageUrl : imgProfile}
                      alt="Profile"
                    />
                  </Link>
                ))
              : ""}
          </div>
        </form>
      </div>
      <div className="navBarMiddleIcons">
        <ul>
          <li>
            <Link to="/">
              <img className="iconHome" src={homeImg} alt="Home" />
            </Link>
          </li>
          <li>
            <img
              className="iconHome"
              src={logIn}
              onClick={handleLogOut}
              alt="Logout"
            />
          </li>
          <li>
            <Link to="/account">
              <img
                className="iconHome"
                src={logedUser?.imageUrl ? logedUser?.imageUrl : imgProfile}
                alt="Account"
              />
            </Link>
          </li>
          <li className="nameUser">{logedUser.name}</li>
        </ul>
      </div>
      <div className="iconsContainer">
        <div className="innerContainerIcons">
          <IoMdNotificationsOutline className="iconRignNavBar" />
          <LuMessageSquare
            className="iconRignNavBar"
            onClick={toglleChatMessages}
          />
          <CiSettings className="iconSetting" />
        </div>
      </div>
      <Message toggleSideChat={toggleSideChat} />
      <Hamburger toggled={isOpen} toggle={setOpen} />
    </div>
  );
}
