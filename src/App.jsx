import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../src/components/navbar/NavBar";
import SideBar from "./components/SideBar";
import HomeFeed from "./pages/home/HomeFeed";
import Auth from "./pages/Auth";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Account from "./pages/Account";
import UserProvider from "./context/UserProvider";

function App() {
  return (
    <BrowserRouter>
      <div className="containerApp">
        <UserProvider>
          <NavBar />
          <SideBar />
          <Routes>
            <Route path="/" element={<HomeFeed />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </UserProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
