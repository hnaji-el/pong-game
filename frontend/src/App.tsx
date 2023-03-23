import React from "react";
import "./App.css";
import Home from "./Components/Routes/Home";
import Messages from "./Components/Routes/Messages";
import Profile from "./Components/Routes/Profile";
import ProfileUser from "./Components/Routes/ProfileUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./Components/Routes/Game";
function App() {
  // const socket = io("http://localhost:3000");
  // socket.on()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Messages" element={<Messages />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/ProfileUser" element={<ProfileUser />} />
        <Route path="/Game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
