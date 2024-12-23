import React from "react";

import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import NavigationChat from "../../components/navigation/NavigationChat";
import ChatBox from "../../components/ChatBox";
import Spinner from "../../components/Spinner";
import { SendIcon } from "../../components/Icons";

import {
  useVerifyUserAuthenticity,
  getDataUserLogged,
  getAllChannels,
  getAllDms,
} from "../../api/API";

import { DmType, ChannelType } from "./types";
import { UserType } from "../../api/types";

const DOMAIN = import.meta.env.VITE_BACKEND_CHAT_ORIGIN;
const SOCKET_CHAT_PATH = import.meta.env.VITE_SOCKET_CHAT_PATH;

interface TypeContext {
  active: boolean;
  click: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
  firstClick: boolean;
  setFirstClick: React.Dispatch<React.SetStateAction<boolean>>;
  settings: UserType;
  updateSettings: React.Dispatch<React.SetStateAction<UserType>>;
}

const userData = {
  id: "",
  email: "",
  nickname: "",
  pictureURL: "",
  status: "",
  isTwoFactorAuthEnabled: false,
};

export const MessagesContext = React.createContext<any>({});
export const StateMssages = React.createContext<TypeContext>({
  active: false,
  click: false,
  setClick: () => {},
  firstClick: false,
  setFirstClick: () => {},
  settings: userData,
  updateSettings: () => {},
});

const socket = io(DOMAIN, {
  path: SOCKET_CHAT_PATH,
  withCredentials: true,
});

function Messages() {
  const status = useVerifyUserAuthenticity();
  const [message, setMessage] = React.useState("");
  // [ used, getDataUserLogged(/users/logged-user), passed, passed ]
  const [settings, setSettings] = React.useState<UserType>(userData);

  // [ used, socket, passed, passed ]
  const [isDmOrChannel, setIsDmOrChannel] = React.useState("DM"); // "DM" | "CHANNEL"
  // [     , getAllDms(/chat/dms/dms-messages) handleMsg, passed, passed ]
  const [dms, setDms] = React.useState<DmType[]>([]);
  // [     , getAllChannels(/chat/channels/channels-messages) handleMsg, passed, passed ]
  const [channels, setChannels] = React.useState<ChannelType[]>([]);

  // [ used, getAllDms(/chat/dms/dms-messages) socket, passed, passed ]
  // chatDataBox: DmType | ChannelType | undefined
  const [chatDataBox, setChatDataBox] = React.useState<any>();
  const [dmIndex, setDmIndex] = React.useState(0); // used,    , passed, passed
  const [channelIndex, setChannelIndex] = React.useState(0); //   ,    , passed, passed

  const [click, setClick] = React.useState(false); // used, , passed, passed
  const [firstClick, setFirstClick] = React.useState(true); //  ,   , passed, passed
  const [passwordProtected, setpasswordProtected] = React.useState(false); //   ,   , passed, passed

  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = "Pong - Messages";
  }, []);

  React.useEffect(() => {
    getDataUserLogged((res: UserType) => {
      setSettings(res);
    });
  }, []);

  React.useEffect(() => {
    getAllDms((res: DmType[]) => {
      setDms(res);
      setChatDataBox(res[dmIndex]);
    });

    getAllChannels((res: ChannelType[]) => {
      setChannels(res);
    });
  }, [dmIndex]);

  React.useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handleServerMessage = (data: DmType | ChannelType) => {
      data.type === "DM" ? setIsDmOrChannel("DM") : setIsDmOrChannel("CHANNEL");
      setChatDataBox(data);
    };

    socket.on("msgFromServer", handleServerMessage);

    return () => {
      socket.off("msgFromServer", handleServerMessage);
    };
  }, []);

  function sendMessage() {
    if (isDmOrChannel === "DM") {
      socket.emit("msgFromClient", {
        type: "DM",
        receiverUserId: chatDataBox.id,
        message: message,
      });

      getAllDms((res: DmType[]) => {
        setDms(res);
      });
    } else {
      socket.emit("msgFromClient", {
        type: "CHANNEL",
        channelId: chatDataBox.id,
        message: message,
      });

      getAllChannels((res: ChannelType[]) => {
        setChannels(res);
      });
    }
  }

  if (status === "error") {
    navigate("/login");
  }

  if (status === "pending" || !settings.nickname.length) {
    return (
      <div className="mx-3 flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

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
          dms: dms,
          setDms: setDms,
          channels: channels,
          setChannels: setChannels,
          isDmOrChannel: isDmOrChannel,
          setIsDmOrChannel: setIsDmOrChannel,
          chatDataBox: chatDataBox,
          setChatDataBox: setChatDataBox,
          dmIndex: dmIndex,
          setDmIndex: setDmIndex,
          channelIndex: channelIndex,
          setChannelIndex: setChannelIndex,
          passwordProtected: passwordProtected,
          setpasswordProtected: setpasswordProtected,
        }}
      >
        <NavigationChat />
        {chatDataBox ? (
          <>
            <main
              className={`${
                click ? "" : "absolute h-0 w-0"
              } mx-3 mb-[4.85rem] overflow-hidden pt-7 lg:relative lg:ml-64 lg:mr-4 lg:block lg:h-auto lg:w-auto lg:pb-1`}
            >
              <ChatBox data={chatDataBox?.conversation} />
            </main>
            <div className="absolute bottom-[0.9rem] w-full px-3 lg:pl-64 lg:pr-4">
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
}

export default Messages;
