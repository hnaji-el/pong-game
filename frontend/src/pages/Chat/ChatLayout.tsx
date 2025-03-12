import React from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import Header from "./Header";
import SideNavBar from "./SideNavBar";
import Footer from "./Footer";
import Spinner from "../../components/Spinner";
import { DmType, ChannelType, Rooms } from "./types";
import { UserType } from "../../api/types";
import {
  useVerifyUserAuthenticity,
  getDataUserLogged,
  getAllChannels,
  getAllDms,
} from "../../api/API";

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
  const [dms, setDms] = React.useState<DmType[]>([]);
  const [channels, setChannels] = React.useState<ChannelType[]>([]);
  const [chatDataBox, setChatDataBox] = React.useState<any>();
  const [dmIndex, setDmIndex] = React.useState(0);
  const [channelIndex, setChannelIndex] = React.useState(0);
  const [click, setClick] = React.useState(false);

  const navigate = useNavigate();

  // rooms: dms { DM } + channels { PUBLIC | PRIVATE | PROTECTED }

  // API: GET /chat/rooms?type=dm (?type=channel)
  // payload : {
  //   dms: { id: string, nickname: string, pictureURL: string, isOnline: boolean }[],
  //   channels: { id: string, name: string, type: string, role: string, isJoined: boolean }[],
  // }
  // success: 200 Ok
  // error: 4xx, 5xx [ 401 Unauthorized, 500 Internal Server Error ]

  const [isDm, setIsDm] = React.useState(true);
  const [roomsStatus, setRoomsStatus] = React.useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [rooms, setRooms] = React.useState<Rooms>({ dms: [], channels: [] });

  React.useEffect(() => {
    const fetcher = async () => {
      try {
        setRoomsStatus("loading");
        const res = await fetch(
          `http://localhost:5000/chat/rooms?type=${isDm ? "dm" : "channel"}`,
          { credentials: "include" },
        );

        const body = await res.json();

        if (res.ok) {
          setRoomsStatus("success");
          setRooms(body);
        } else {
          setRoomsStatus("error");
          res.status === 401
            ? navigate("/login")
            : window.alert("Something Went Wrong");
        }
      } catch (err) {
        const error = err as Error;
        setRoomsStatus("error");
        window.alert(error.message);
      }
    };

    fetcher();
  }, [isDm, navigate]);

  React.useEffect(() => {
    document.title = "Pong - Messages";

    getDataUserLogged((userData) => {
      setLoggedUserData(userData);
    });
  }, []);

  React.useEffect(() => {
    getAllDms((dms) => {
      setDms(dms);
      if (isDm) {
        setChatDataBox(dms[dmIndex]);
      }
    });

    getAllChannels((channels) => {
      setChannels(channels);
      if (!isDm) {
        setChatDataBox(channels[channelIndex]);
      }
    });
  }, [dmIndex, channelIndex, isDm]);

  React.useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    // TODO: check this because it's changed the chat main section directly even if they don't the person that you are talking with them.
    const handleServerMessage = (data: DmType | ChannelType) => {
      data.type === "DM" ? setIsDm(true) : setIsDm(false);
      setChatDataBox(data);
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
          isDm={isDm}
          chatDataBox={chatDataBox}
          loggedUserData={loggedUserData}
          setLoggedUserData={setLoggedUserData}
          setClick={setClick}
        />

        <Outlet
          context={{
            chatDataBox: chatDataBox,
            loggedUserData: loggedUserData,
            isDm: isDm,
            setDms: setDms,
            setChannels: setChannels,
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
          isLoading={roomsStatus === "loading"}
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
