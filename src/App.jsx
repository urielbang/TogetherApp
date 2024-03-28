import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../src/components/navbar/NavBar";
import SideBar from "../src/components/sidebar/SideBar";
import HomeFeed from "./pages/home/HomeFeed";
import Auth from "./pages/Auth";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Account from "./pages/Account";
import { useContext, useState } from "react";
import { UserContext } from "./context/UserProvider";
import Profile from "./components/profile/Profile";

import Message from "./pages/messagesPage/Message";

function App() {
  const { logedUser } = useContext(UserContext);
  const [toggle, setToglle] = useState(false);

  return (
    <BrowserRouter>
      {logedUser?.email ? (
        <div className="containerApp">
          <NavBar toggle={toggle} setToglle={setToglle} />
          <SideBar />
          <Message />
          <Routes>
            <Route
              path="/"
              element={<HomeFeed setToglle={setToglle} toggle={toggle} />}
            />
            <Route path="/auth" element={<Auth />} />

            <Route path="/account" element={<Account />} />
            <Route
              path="/profile/:id"
              element={<Profile setToglle={setToglle} toggle={toggle} />}
            />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
      {/* <div className="containerApp">
        <NavBar toggle={toggle} setToglle={setToglle} />
        <SideBar />

        <Routes>
          <Route
            path="/"
            element={<HomeFeed setToglle={setToglle} toggle={toggle} />}
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route
            path="/profile/:id"
            element={<Profile setToglle={setToglle} toggle={toggle} />}
          />
        </Routes>
      </div> */}
    </BrowserRouter>
  );
}

export default App;
