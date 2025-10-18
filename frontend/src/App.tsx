import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Edit from "./pages/Edit/Edit";
import Home from "./pages/Home/Home";
import ChatLayout from "./pages/Chat/ChatLayout";
import Profile from "./pages/Profile/Profile";
import ProfileUser from "./pages/ProfileUser/ProfileUser";
import Game from "./pages/Game/Game";
import Tfa from "./pages/Tfa/Tfa";
import NotFound from "./pages/NotFound/NotFound";
import Chat from "./pages/Chat/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/tfa" element={<Tfa />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<ChatLayout />}>
          <Route path=":chatId" element={<Chat />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-user" element={<ProfileUser />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
