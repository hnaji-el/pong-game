import React from "react";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import Header from "./Header";
import SideNavBar from "./SideNavBar";
import Footer from "./Footer";
import Spinner from "../../components/Spinner";
import { DmType, ChannelType, Rooms, Status } from "./types";
import { UserType } from "../../api/types";
import { useVerifyUserAuthenticity, getDataUserLogged } from "../../api/API";

const DOMAIN = import.meta.env.VITE_BACKEND_CHAT_ORIGIN;
const SOCKET_CHAT_PATH = import.meta.env.VITE_SOCKET_CHAT_PATH;

const socket = io(DOMAIN, {
  path: SOCKET_CHAT_PATH,
  withCredentials: true,
});

function ChatLayout() {
  const status = useVerifyUserAuthenticity();
  const [loggedUserData, setLoggedUserData] = React.useState<UserType>({
    id: "",
    email: "",
    nickname: "",
    pictureURL: "",
    status: "",
    isTwoFactorAuthEnabled: false,
  });
  const [click, setClick] = React.useState(false);

  // API: GET /chat/rooms?type=dm (?type=channel)
  // payload: {
  //   dms:               { id: string, nickname: string, pictureURL: string, isOnline: boolean }[],
  //   joinedChannels:    { id: string, name: string, type: string, role: string, isJoined: boolean }[],
  //   notJoinedChannels: { id: string, name: string, type: string, role: string, isJoined: boolean }[],
  // }
  // success: 200 Ok
  // error: 4xx, 5xx [ 401 Unauthorized, 500 Internal Server Error ]

  const [isDm, setIsDm] = React.useState(true);
  const [rooms, setRooms] = React.useState<Rooms>({
    dms: [],
    joinedChannels: [],
    notJoinedChannels: [],
  });
  const [roomsStatus, setRoomsStatus] = React.useState<Status>("idle");

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const fetcher = async () => {
      try {
        setRoomsStatus("loading");

        const res = await fetch(
          `http://localhost:5000/chat/rooms?type=${isDm ? "dm" : "channel"}`,
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

          if (location.pathname === "/chat" && initialChatId) {
            navigate(`/chat/${initialChatId}`, {
              replace: true,
            });
          }
        } else {
          setRoomsStatus("error");
          if (res.status === 401) navigate("/login");
        }
      } catch {
        setRoomsStatus("error");
      }
    };

    fetcher();
  }, [isDm, location.pathname, navigate]);

  React.useEffect(() => {
    document.title = "Pong - Messages";

    getDataUserLogged((userData) => {
      setLoggedUserData(userData);
    });
  }, []);

  React.useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    // TODO: check this because it's changed the chat main section directly even if they don't the person that you are talking with them.
    const handleServerMessage = (data: DmType | ChannelType) => {
      data.type === "DM" ? setIsDm(true) : setIsDm(false);
      // setChatDataBox(data);
    };

    socket.on("msgFromServer", handleServerMessage);

    return () => {
      socket.off("msgFromServer", handleServerMessage);
    };
  }, []);

  if (status === "error") {
    navigate("/login");
  }

  if (status === "pending" || !loggedUserData.nickname.length) {
    return (
      <div className="mx-3 flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

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

export default ChatLayout;
