import React from "react";

import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import Header from "./Header";
import MainContent from "./MainContent";
import SideNavBar from "./SideNavBar";
import Footer from "./Footer";
import Modal from "../../components/Modal/Modal";
import SettingsModal from "../../components/modals/SettingsModal";
import MobileSettingsModal from "../../components/modals/MobileSettingsModal";
import ViewSettings from "../../components/ViewSettings";
import Spinner from "../../components/Spinner";
import {
  useVerifyUserAuthenticity,
  getDataUserLogged,
  getAllChannels,
  getAllDms,
} from "../../api/API";

import { DmType, ChannelType } from "./types";
import { UserType } from "../../api/types";
import useToggle from "../../hooks/use-toggle";

const DOMAIN = import.meta.env.VITE_BACKEND_CHAT_ORIGIN;
const SOCKET_CHAT_PATH = import.meta.env.VITE_SOCKET_CHAT_PATH;

const userData = {
  id: "",
  email: "",
  nickname: "",
  pictureURL: "",
  status: "",
  isTwoFactorAuthEnabled: false,
};

const socket = io(DOMAIN, {
  path: SOCKET_CHAT_PATH,
  withCredentials: true,
});

function Chat() {
  const status = useVerifyUserAuthenticity();
  const [loggedUserData, setLoggedUserData] =
    React.useState<UserType>(userData);
  const [isDm, setIsDm] = React.useState(true);
  const [dms, setDms] = React.useState<DmType[]>([]);
  const [channels, setChannels] = React.useState<ChannelType[]>([]);
  const [chatDataBox, setChatDataBox] = React.useState<any>();
  const [dmIndex, setDmIndex] = React.useState(0);
  const [channelIndex, setChannelIndex] = React.useState(0);
  const [click, setClick] = React.useState(false);

  // state variables for modals
  const [isSettingsModalOpen, toggleIsSettingsModalOpen] = useToggle(false);
  const [isMobileSettingsModalOpen, toggleIsMobileSettingsModalOpen] =
    useToggle(false);

  const navigate = useNavigate();

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
          setClick={setClick}
          openSettingsModal={toggleIsSettingsModalOpen}
        />

        {chatDataBox && (
          <MainContent
            chatDataBox={chatDataBox}
            loggedUserData={loggedUserData}
            isDm={isDm}
            setDms={setDms}
            setChannels={setChannels}
            socket={socket}
          />
        )}
      </div>

      <div
        className={`h-full w-full flex-col pb-[12px] pt-[28px] lg:fixed lg:left-0 lg:top-0 lg:flex lg:w-[240px] lg:bg-sideBackground 2xl:left-auto ${
          click ? "hidden" : "flex"
        } `}
      >
        <SideNavBar
          loggedUserData={loggedUserData}
          setChatDataBox={setChatDataBox}
          isDm={isDm}
          setIsDm={setIsDm}
          dmIndex={dmIndex}
          setDmIndex={setDmIndex}
          channelIndex={channelIndex}
          setChannelIndex={setChannelIndex}
          dms={dms}
          setDms={setDms}
          channels={channels}
          setChannels={setChannels}
          setClick={setClick}
        />

        <Footer
          click={click}
          loggedUserAvatar={loggedUserData.pictureURL}
          isMobileSettingsModalOpen={isMobileSettingsModalOpen}
          toggleIsMobileSettingsModalOpen={toggleIsMobileSettingsModalOpen}
        />
      </div>

      {isSettingsModalOpen && (
        <Modal title="Settings" handleDismiss={toggleIsSettingsModalOpen}>
          <SettingsModal
            loggedUserData={loggedUserData}
            setLoggedUserData={setLoggedUserData}
            closeModal={toggleIsSettingsModalOpen}
          />
        </Modal>
      )}

      {isMobileSettingsModalOpen && (
        <MobileSettingsModal closeModal={toggleIsMobileSettingsModalOpen}>
          <ViewSettings openModal={toggleIsSettingsModalOpen} />
        </MobileSettingsModal>
      )}
    </>
  );
}

export default Chat;
