import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { globalSocket } from "./helpers/socket";
import Home from "./Components/Routes/Home";
import Messages from "./Components/Routes/Messages";
import Profile from "./Components/Routes/Profile";
import ProfileUser from "./Components/Routes/ProfileUser";
import Login from "./Components/Routes/Login";
import Tfa from "./Components/Routes/Tfa";
import Edit from "./Components/Routes/Edit";
import Game from "./Components/Routes/Game";
import NotFound from "./Components/Routes/NotFound";
import { popOutFunc } from "./Components/Routes/eventListener";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    globalSocket.on("connect", () => {
      console.log("Connected to server", globalSocket.id);
    });
    globalSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    // has listener
    if (!globalSocket.hasListeners("invitePlayer")) {
      console.log("does not have listener", globalSocket.id);
      globalSocket.on("invitePlayer", popOutFunc);
    } else {
      console.log("already has listener", globalSocket.id);
    }
    // has listener
    if (!globalSocket.hasListeners("navigateToGame")) {
      globalSocket.on("navigateToGame", () => {
        console.log("navigateToGame", globalSocket.id);
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
