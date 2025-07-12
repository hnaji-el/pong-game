import React from "react";

import { Routes, Route, useNavigate } from "react-router-dom";

import { globalSocket } from "./utilities/socket";
import { popOutFunc } from "./components/eventListener";

import Login from "./pages/Login/Login";
import Edit from "./pages/Edit/Edit";
import Home from "./pages/Home/Home";
import Layout from "./pages/Chat/Layout";
import Profile from "./pages/Profile/Profile";
import ProfileUser from "./pages/ProfileUser/ProfileUser";
import Game from "./pages/Game/Game";
import Tfa from "./pages/Tfa/Tfa";
import NotFound from "./pages/NotFound/NotFound";
import Chat from "./pages/Chat/Chat";

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
      <Route path="/login" element={<Login />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/tfa" element={<Tfa />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chat" element={<Layout />}>
        <Route path=":chatId" element={<Chat />} />
      </Route>
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile-user" element={<ProfileUser />} />
      <Route path="/game" element={<Game />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
