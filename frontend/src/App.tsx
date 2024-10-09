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
      <Route path="/login" element={<Login />} caseSensitive />
      <Route path="/edit" element={<Edit />} caseSensitive />
      <Route path="/tfa" element={<Tfa />} caseSensitive />
      <Route path="/home" element={<Home />} caseSensitive />
      <Route path="/messages" element={<Messages />} caseSensitive />
      <Route path="/profile" element={<Profile />} caseSensitive />
      <Route path="/profile-user" element={<ProfileUser />} caseSensitive />
      <Route path="/game" element={<Game />} caseSensitive />
      <Route path="*" element={<NotFound />} caseSensitive />
    </Routes>
  );
}

export default App;
