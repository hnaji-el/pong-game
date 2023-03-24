import React from "react"
import "./App.css"
import Home from "./Components/Routes/Home"
import Messages from "./Components/Routes/Messages"
import Profile from "./Components/Routes/Profile"
import ProfileUser from "./Components/Routes/ProfileUser"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Components/Routes/Login"
import Tfa from "./Components/Routes/Tfa"
import Edit from "./Components/Routes/Edit"
import Game from "./Components/Routes/Game";
import NotFound from "./Components/Routes/NotFound"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Edit" element={<Edit />} />
        <Route path="/Tfa" element={<Tfa />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Messages" element={<Messages />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/ProfileUser" element={<ProfileUser />} />
        <Route path="/Game" element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
