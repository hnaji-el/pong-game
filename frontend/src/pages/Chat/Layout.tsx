import React from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";

import Header from "./Header";
import SideNavBar from "./SideNavBar";
import Footer from "./Footer";
import { getDataUserLogged } from "../../api/API";
import { Rooms, Status } from "./types";
import { UserType } from "../../api/types";

const DOMAIN = import.meta.env.VITE_BACKEND_ORIGIN;
const DOMAIN_CHAT = import.meta.env.VITE_BACKEND_CHAT_ORIGIN;
const SOCKET_CHAT_PATH = import.meta.env.VITE_SOCKET_CHAT_PATH;

function Layout() {
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

  const [isDm, setIsDm] = React.useState(true);
  const [rooms, setRooms] = React.useState<Rooms>({
    dms: [],
    joinedChannels: [],
    notJoinedChannels: [],
  });
  const [roomsStatus, setRoomsStatus] = React.useState<Status>("idle");

  const navigate = useNavigate();

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

  React.useEffect(() => {
    const fetcher = async () => {
      try {
        setRoomsStatus("loading");

        const res = await fetch(
          `${DOMAIN}/chat/rooms?type=${isDm ? "dm" : "channel"}`,
          { credentials: "include" },
        );

        const body: Rooms = await res.json();

        if (res.ok) {
          let initialChatId = "";
          if (isDm && body.dms.length) initialChatId = body.dms[0].id;
          if (!isDm && body.joinedChannels.length)
            initialChatId = body.joinedChannels[0].id;

          setRoomsStatus("success");
          setRooms(body);

          if (initialChatId) {
            navigate(`/chat/${initialChatId}`, {
              replace: true,
            });
          }
        } else {
          setRoomsStatus("error");
          if (res.status === 401) {
            navigate("/login");
          }
        }
      } catch {
        setRoomsStatus("error");
      }
    };

    fetcher();
  }, [isDm]);

  React.useEffect(() => {
    document.title = "Pong - Messages";

    getDataUserLogged((userData) => {
      setLoggedUserData(userData);
    });
  }, []);

  return (
    <>
      <div
        className={`mx-[12px] h-full w-auto flex-col pb-[12px] pt-[28px] lg:ml-[252px] ${click ? "flex" : "hidden"} lg:flex`}
      >
        <Header
          rooms={rooms}
          isDm={isDm}
          loggedUserData={loggedUserData}
          setLoggedUserData={setLoggedUserData}
          setClick={setClick}
        />

        <Outlet
          context={{
            isDm: isDm,
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
        <SideNavBar
          rooms={rooms}
          roomsStatus={roomsStatus}
          isDm={isDm}
          setIsDm={setIsDm}
          loggedUserData={loggedUserData}
          setClick={setClick}
        />

        <Footer
          loggedUserData={loggedUserData}
          setLoggedUserData={setLoggedUserData}
        />
      </div>
    </>
  );
}

export default Layout;
