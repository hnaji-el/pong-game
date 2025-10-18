import React from "react";

import { Outlet } from "react-router-dom";
import { io, Socket } from "socket.io-client";

import ChatHeader from "./ChatHeader";
import ChatSideBar from "./ChatSideBar";
import ChatFooter from "./ChatFooter";

import { getDataUserLogged } from "../../api/API";
import { UserType } from "../../api/types";

const DOMAIN_CHAT = import.meta.env.VITE_BACKEND_CHAT_ORIGIN;
const SOCKET_CHAT_PATH = import.meta.env.VITE_SOCKET_CHAT_PATH;

function ChatLayout() {
  const [loggedUserData, setLoggedUserData] = React.useState<UserType>({
    id: "",
    email: "",
    nickname: "",
    pictureURL: "",
    status: "",
    isTwoFactorAuthEnabled: false,
  });
  const [click, setClick] = React.useState(false);
  const [socket, setSocket] = React.useState<Socket | null>(null);

  React.useEffect(() => {
    document.title = "Pong - Messages";

    getDataUserLogged((userData) => {
      setLoggedUserData(userData);
    });
  }, []);

  React.useEffect(() => {
    const newSocket = io(DOMAIN_CHAT, {
      path: SOCKET_CHAT_PATH,
      withCredentials: true,
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <>
      <div
        className={`mx-[12px] h-full w-auto flex-col pb-[12px] pt-[28px] lg:ml-[252px] ${click ? "flex" : "hidden"} lg:flex`}
      >
        <ChatHeader
          loggedUserData={loggedUserData}
          setLoggedUserData={setLoggedUserData}
          setClick={setClick}
        />

        <Outlet
          context={{
            loggedUserData: loggedUserData,
            socket: socket,
          }}
        />
      </div>
      <div
        className={`h-full w-full flex-col pb-[12px] pt-[28px] lg:fixed lg:left-0 lg:top-0 lg:flex lg:w-[240px] lg:bg-sideBackground 2xl:left-auto ${
          click ? "hidden" : "flex"
        } `}
      >
        <ChatSideBar
          loggedUserData={loggedUserData}
          setClick={setClick}
        />

        <ChatFooter
          loggedUserData={loggedUserData}
          setLoggedUserData={setLoggedUserData}
        />
      </div>
    </>
  );
}

export default ChatLayout;
