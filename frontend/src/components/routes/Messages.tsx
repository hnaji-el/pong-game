import React, { useEffect, createContext, useState } from "react";

import { io } from "socket.io-client";

import NavigationChat from "../navigation/NavigationChat";
import ChatBox from "../ChatBox";
import { SendIcon } from "../Icons";
import {
  CheckToken,
  getAllChannels,
  getDataUserLogged,
  getDmUsers,
} from "../../api/API";
import Spinner from "../Spinner";

const DOMAIN = import.meta.env.VITE_BACKEND_CHAT_ORIGIN;
const SOCKET_CHAT_PATH = import.meta.env.VITE_SOCKET_CHAT_PATH;

interface TypeData {
  id: string;
  pictureURL: string;
  nickname: string;
  isTwoFactorAuthEnabled: boolean;
  status: string;
}

interface TypeContext {
  active: boolean;
  click: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
  firstClick: boolean;
  setFirstClick: React.Dispatch<React.SetStateAction<boolean>>;
  settings: any;
  updateSettings: React.Dispatch<React.SetStateAction<TypeData>>;
}

export const StateMssages = createContext<TypeContext>({
  active: false,
  click: false,
  setClick: () => {},
  firstClick: false,
  setFirstClick: () => {},
  settings: { id: "", pictureURL: "", nickname: "" },
  updateSettings: () => {},
});
export const Click = createContext<boolean>(false);
export const MessagesContext = createContext<any>({});

const socket = io(DOMAIN, {
  path: SOCKET_CHAT_PATH,
  withCredentials: true,
});

export default function Messages() {
  CheckToken();
  const [click, setClick] = useState(false);
  const [firstClick, setFirstClick] = useState(true);

  const [dataDm, setDataDm] = useState<any>([]);
  const [channelDm, setChannelDm] = useState<any>([]);
  const [indexDm, setIndexDm] = useState<number>(0);
  const [indexChannel, setIndexChannel] = useState<number>(0);
  const [dataChatBox, setDataChatBox] = useState<any>([]);
  const [typeDm, setTypeDm] = useState<string>("chat");
  const [message, setMessage] = useState<string>("");
  const [passwordProtected, setpasswordProtected] = useState<boolean>(false);

  const [settings, setSettings] = useState<TypeData>({
    id: "",
    pictureURL: "",
    nickname: "",
    isTwoFactorAuthEnabled: false,
    status: "",
  });

  const dataChat = {
    type: "DM",
    data: message,
    name: dataChatBox?.username,
  };

  const dataChannel = {
    type: "RM",
    data: message,
    name: dataChatBox?.name,
  };

  const sendMessage = () => {
    if (typeDm === "chat") {
      socket.emit("msgServer", dataChat);
      getDmUsers((res: any) => {
        setDataDm(res);
      });
    } else {
      socket.emit("msgServer", dataChannel);
      getAllChannels((res: any) => {
        setChannelDm(res);
      });
    }
  };

  useEffect(() => {
    getAllChannels((res: any) => {
      setChannelDm(res);
    });
    getDmUsers((res: any) => {
      setDataDm(res);
      setDataChatBox(res[indexDm]);
    });
  }, []);

  useEffect(() => {
    if (!socket.connected) socket.connect();
    socket.on("msgFromServer", (data) => {
      if (data.members) setTypeDm("channel");
      else setTypeDm("chat");
      setDataChatBox(data);
    });
    return () => {
      socket.off("msgToClients");
    };
  }, []);

  useEffect(() => {
    document.title = "Pong - Messages";
    getDataUserLogged((res: TypeData) => {
      setSettings(res);
    });
  }, []);

  if (settings.nickname.length)
    return (
      <StateMssages.Provider
        value={{
          active: true,
          click: click,
          firstClick: firstClick,
          setFirstClick: setFirstClick,
          setClick: setClick,
          settings: settings,
          updateSettings: setSettings,
        }}
      >
        <MessagesContext.Provider
          value={{
            dataDm: dataDm,
            setDataDm: setDataDm,
            channelDm: channelDm,
            setChannelDm: setChannelDm,
            dataChatBox: dataChatBox,
            setDataChatBox: setDataChatBox,
            sesetDataDm: setDataDm,
            indexDm: indexDm,
            setIndexDm: setIndexDm,
            indexChannel: indexChannel,
            setIndexChannel: setIndexChannel,
            typeDm: typeDm,
            setTypeDm: setTypeDm,
            passwordProtected: passwordProtected,
            setpasswordProtected: setpasswordProtected,
          }}
        >
          <NavigationChat />
          {dataChatBox ? (
            <>
              <main
                className={`${
                  click ? "" : "absolute w-0 h-0"
                } lg:block lg:relative lg:w-auto lg:h-auto mx-3 lg:pb-1 pt-7 lg:ml-64 lg:mr-4 overflow-hidden mb-[4.85rem]`}
              >
                <ChatBox data={dataChatBox?.conversation} />
              </main>
              <div className="absolute w-full bottom-[0.9rem] px-3 lg:pl-64 lg:pr-4">
                <form className="flex items-center rounded-md bg-shape pr-2">
                  <input
                    type="text"
                    placeholder="Type a message"
                    value={message}
                    className="placeholder-secondary-text flex-1 bg-transparent p-4 pl-3 pr-2 text-sm font-light text-primaryText placeholder:text-sm placeholder:font-light focus:outline-none"
                    onChange={(e) => {
                      setMessage(e.currentTarget.value);
                    }}
                  />
                  <button
                    type="submit"
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setMessage("");
                      sendMessage();
                    }}
                  >
                    <SendIcon edit="w-4 fill-white" />
                  </button>
                </form>
              </div>
            </>
          ) : null}
        </MessagesContext.Provider>
      </StateMssages.Provider>
    );
  return (
    <div className="mx-3 flex justify-center items-center h-full">
      <Spinner />
    </div>
  );
}
