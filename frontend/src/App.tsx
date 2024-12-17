import React from "react";

import { Routes, Route, useNavigate } from "react-router-dom";

import { globalSocket } from "./utilities/socket";
import { popOutFunc } from "./components/eventListener";

import Login from "./pages/Login";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import ProfileUser from "./pages/ProfileUser";
import Game from "./pages/Game";
import Tfa from "./pages/Tfa";
import NotFound from "./pages/NotFound";

function App() {
  const navigate = useNavigate();

  React.useEffect(() => {
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
  }, [navigate]);

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
