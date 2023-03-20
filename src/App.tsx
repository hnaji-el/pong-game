import React from "react"
import "./App.css"
import Home from "./Components/Routes/Home"
import Messages from "./Components/Routes/Messages"
import Profile from "./Components/Routes/Profile"
import ProfileUser from "./Components/Routes/ProfileUser"
import Redirection from "./Components/Routes/Redirection"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Components/Routes/Login"
import Tfa from "./Components/Routes/Tfa"
import Edit from "./Components/Routes/Edit"
import NotFound from "./Components/Routes/NotFound"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="/Redirection" element={<Redirection />} />
        <Route path="/Edit" element={<Edit />} />
        <Route path="/Tfa" element={<Tfa />} />
        <Route path="/Messages" element={<Messages />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/ProfileUser" element={<ProfileUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
