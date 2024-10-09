import React, { useEffect } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";

import { globalSocket } from "./utilities/socket";
import { popOutFunc } from "./components/routes/eventListener";

import Login from "./components/routes/Login";
import Edit from "./components/routes/Edit";
import Home from "./components/routes/Home";
import Messages from "./components/routes/Messages";
import Profile from "./components/routes/Profile";
import ProfileUser from "./components/routes/ProfileUser";
import Game from "./components/routes/Game";
import Tfa from "./components/routes/Tfa";
import NotFound from "./components/routes/NotFound";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    globalSocket.on("connect", () => {});
    globalSocket.on("disconnect", () => {});

    // has listener
    if (!globalSocket.hasListeners("invitePlayer")) {
      globalSocket.on("invitePlayer", popOutFunc);
    }

    // has listener
    if (!globalSocket.hasListeners("navigateToGame")) {
      globalSocket.on("navigateToGame", () => {
        navigate("/game", { state: { privateQueue: true } });
      });
    }

    return () => {
      globalSocket.off("connect");
      globalSocket.off("disconnect");
      globalSocket.off("invitePlayer");
      globalSocket.off("navigateToGame");
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Login" element={<Login />} caseSensitive />
      <Route path="/Edit" element={<Edit />} caseSensitive />
      <Route path="/Tfa" element={<Tfa />} caseSensitive />
      <Route path="/Home" element={<Home />} caseSensitive />
      <Route path="/Messages" element={<Messages />} caseSensitive />
      <Route path="/Profile" element={<Profile />} caseSensitive />
      <Route path="/ProfileUser" element={<ProfileUser />} caseSensitive />
      <Route path="/Game" element={<Game />} caseSensitive />
      <Route path="*" element={<NotFound />} caseSensitive />
    </Routes>
  );
}

export default App;
