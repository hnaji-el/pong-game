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
  );
}

export default App;
