import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../src/components/navbar/NavBar";
import SideBar from "../src/components/sidebar/SideBar";
import HomeFeed from "./pages/home/HomeFeed";
import Auth from "./pages/Auth";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Account from "./pages/Account";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";
import Profile from "./components/profile/Profile";

function App() {
  const { logedUser } = useContext(UserContext);

  return (
    <BrowserRouter>
      {logedUser?.email ? (
        <div className="containerApp">
          <NavBar />
          <SideBar />
          <Routes>
            <Route path="/" element={<HomeFeed />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
