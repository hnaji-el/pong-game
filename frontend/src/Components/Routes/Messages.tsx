import React, { useEffect, createContext, useState } from "react";
import NavigationChat from "../Navigation/NavigationChat";
import ChatBox from "../ChatBox";
import { SendIcon } from "../Icons";
import { getAllChannels, getDataUserLogged, getDmUsers } from "../../API";
import { dataChat } from "../../API";
import Spinner from "../Spinner";
import { io } from "socket.io-client";

interface TypeData {
  id: string;
  pictureURL: string;
  nickname: string;
}

interface TypeContext {
  active: boolean;
  click: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
  firstClick: boolean;
  setFirstClick: React.Dispatch<React.SetStateAction<boolean>>;
  settings: TypeData;
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
const socket = io("http://localhost:1337", {
  //autoConnect : false,
  withCredentials: true,
});
export default function Messages() {
  const [click, setClick] = useState(false);
  const [firstClick, setFirstClick] = useState(true);

  const [dataDm, setDataDm] = useState<any>([]);
  const [channelDm, setChannelDm] = useState<any>([]);
  const [indexDm, setIndexDm] = useState<number>(0);
  const [indexChannel, setIndexChannel] = useState<number>(0);
  const [dataChatBox, setDataChatBox] = useState<any>([]);
  const [typeDm, setTypeDm] = useState<string>("chat");
  const [message, setMessage] = useState<string>("");

  const [settings, setSettings] = useState<TypeData>({
    id: "",
    pictureURL: "",
    nickname: "",
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
    typeDm === "chat"
      ? socket.emit("msgServer", dataChat)
      : socket.emit("msgServer", dataChannel);
  };

  useEffect(() => {
    getAllChannels((res: any) => {
      setChannelDm(res);
      getDmUsers((res: any) => {
        setDataDm(res);
      });
    });
  }, []);

  useEffect(() => {
    if (!socket.connected) socket.connect();
    socket.on("msgFromServer", (data) => {
      console.log(data);
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
    setDataChatBox(dataDm[indexDm]);
  }, [dataDm]);

  if (settings.nickname.length && dataDm.length && dataDm.length)
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
          }}
        >
          <NavigationChat />
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
        </MessagesContext.Provider>
      </StateMssages.Provider>
    );
  return (
    <div className="mx-3 flex justify-center items-center h-full">
      <Spinner />
    </div>
  );
}
