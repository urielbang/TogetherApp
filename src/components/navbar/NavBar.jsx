import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import img from "../../assets/icon_2_transparent.png";
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

export default function NavBar() {
  const [usersName, setUsersName] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const { logedUser, setLogedUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setLogedUser({});
  };
  const handleChange = (e) => {
    setSelectedUser(e.target.value);
  };
  const fetchUSers = async () => {
    const res = axios.get(`${APIBaseUrl}users`);
    const data = (await res).data;

    setUsers(data);

    const names = data.map((user) => {
      return user.name;
    });
    setUsersName(names);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const findId = users.filter((user) => {
      return user.name == selectedUser;
    });

    navigate(`/profile/${findId[0]._id}`);

    e.target[0].value = "";
  };

  useEffect(() => {
    fetchUSers();
  }, []);
  return (
    <div className="navBar">
      <img className="iconAppNav" src={img} />
      <div className="navBarMiddleIcons">
        <div className="search-box">
          <HiMiniMagnifyingGlass className="search-icon" />
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              type="text"
              className="search-input"
              placeholder="Search profile..."
              list="data"
            />
            <datalist id="data">
              <select>
                {usersName.map((name, i) => {
                  return <option key={i}>{name}</option>;
                })}
              </select>
            </datalist>
          </form>
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
        </ul>
      </div>
      <div className="iconsContainer">
        <IoMdNotificationsOutline className="iconRignNavBar" />
        <Link to="/chat">
          {" "}
          <LuMessageSquare className="iconRignNavBar" />
        </Link>

        <CiSettings className="iconSetting" />
      </div>
    </div>
  );
}
