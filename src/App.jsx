import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../src/components/navbar/NavBar";
import SideBar from "./components/SideBar";
import HomeFeed from "./pages/home/HomeFeed";
import Auth from "./pages/Auth";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Account from "./pages/Account";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "./context/UserProvider";

function App() {
  const { logedUser } = useContext(UserContext);
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(logedUser);
  }, []);
  console.log(user);
  return (
    <BrowserRouter>
      {user.email ? (
        <div className="containerApp">
          <NavBar />
          <SideBar />
          <Routes>
            <Route path="/" element={<HomeFeed />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
