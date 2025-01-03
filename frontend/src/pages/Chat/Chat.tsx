import React from "react";

import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import HeaderBar from "./HeaderBar";
import ChatMainSection from "./ChatMainSection";
import SideNavBar from "./SideNavBar";
import FooterBar from "./FooterBar";
import { Modal, ModalBody, ModalHeader } from "../../components/modals/Modals";
import SettingsModal from "../../components/modals/SettingsModal";
import SearchModal from "../../components/modals/SearchModal";
import SearchInput from "../../components/SearchInput";
import MobileSettingsModal from "../../components/modals/MobileSettingsModal";
import ViewSettings from "../../components/ViewSettings";
import CreateChannelModal from "../../components/modals/CreateChannelModal";
import AddMemberModal from "../../components/modals/AddMemberModal";
import MembersModal from "../../components/modals/MembersModal";
import FormProtected from "../../components/FormProtected";
import Spinner from "../../components/Spinner";
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
  settings: userData,
  updateSettings: () => {},
});

const socket = io(DOMAIN, {
  path: SOCKET_CHAT_PATH,
  withCredentials: true,
});

/*
 |— Chat
     |— SideNavBar
         |— ChannelCardList
             |— ChannelCard
         |— DmCardList
             |— DmCard
     |— HeaderBar
        |— UserCard
        |— ChannelEditCard
 */

function Chat() {
  const status = useVerifyUserAuthenticity();
  const [settings, setSettings] = React.useState<UserType>(userData);
  const [isDm, setIsDm] = React.useState(true);
  const [dms, setDms] = React.useState<DmType[]>([]);
  const [channels, setChannels] = React.useState<ChannelType[]>([]);
  const [chatDataBox, setChatDataBox] = React.useState<any>();
  const [dmIndex, setDmIndex] = React.useState(0);
  const [channelIndex, setChannelIndex] = React.useState(0);
  const [click, setClick] = React.useState(false);

  // state variables for modals
  const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);
  const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] =
    React.useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = React.useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = React.useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState(false);
  const [isMobileSettingsModalOpen, setIsMobileSettingsModalOpen] =
    React.useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = "Pong - Messages";

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
          isDm: isDm,
          setIsDm: setIsDm,
          chatDataBox: chatDataBox,
          setChatDataBox: setChatDataBox,
          dmIndex: dmIndex,
          setDmIndex: setDmIndex,
          channelIndex: channelIndex,
          setChannelIndex: setChannelIndex,
        }}
      >
        <div
          className={`mx-[12px] h-full w-auto flex-col pb-[12px] pt-[28px] lg:ml-[252px] ${click ? "flex" : "hidden"} lg:flex`}
        >
          <HeaderBar
            isDm={isDm}
            chatDataBox={chatDataBox}
            userData={settings}
            setClick={setClick}
            openSettingsModal={() => setIsSettingsModalOpen(true)}
            openMembersModal={() => setIsMembersModalOpen(true)}
            openAddMemberModal={() => setIsAddMemberModalOpen(true)}
          />

          {chatDataBox && <ChatMainSection socket={socket} />}
        </div>

        <div
          className={`h-full w-full flex-col pb-[12px] pt-[28px] lg:fixed lg:left-0 lg:top-0 lg:flex lg:w-[240px] lg:bg-sideBackground 2xl:left-auto ${
            click ? "hidden" : "flex"
          } `}
        >
          <SideNavBar
            openPasswordModal={() => setIsPasswordModalOpen(true)}
            openCreateChannelModal={() => setIsCreateChannelModalOpen(true)}
            closeSearchModal={() => setIsSearchModalOpen(false)}
            closeMobileSettingsModal={() => setIsMobileSettingsModalOpen(false)}
          />

          <FooterBar
            isSearchModalOpen={isSearchModalOpen}
            openSearchModal={() => setIsSearchModalOpen(true)}
            closeSearchModal={() => setIsSearchModalOpen(false)}
            isMobileSettingsModalOpen={isMobileSettingsModalOpen}
            openMobileSettingsModal={() => setIsMobileSettingsModalOpen(true)}
            closeMobileSettingsModal={() => setIsMobileSettingsModalOpen(false)}
          />
        </div>

        {isSettingsModalOpen && (
          <Modal className="h-[34rem] w-[90%] lg:h-[21.5rem] lg:w-[40rem]">
            <ModalHeader closeModal={() => setIsSettingsModalOpen(false)}>
              Settings
            </ModalHeader>
            <ModalBody className="justify-center">
              <SettingsModal closeModal={() => setIsSettingsModalOpen(false)} />
            </ModalBody>
          </Modal>
        )}

        {isSearchModalOpen && (
          <SearchModal closeModal={() => setIsSearchModalOpen(false)}>
            <SearchInput modal={true} />
          </SearchModal>
        )}

        {isMobileSettingsModalOpen && (
          <MobileSettingsModal
            closeModal={() => setIsMobileSettingsModalOpen(false)}
          >
            <ViewSettings openModal={() => setIsSettingsModalOpen(true)} />
          </MobileSettingsModal>
        )}

        {isCreateChannelModalOpen && (
          <Modal className="h-[40rem] w-[90%] lg:h-[21.5rem] lg:w-[40rem]">
            <ModalHeader closeModal={() => setIsCreateChannelModalOpen(false)}>
              Create channel
            </ModalHeader>
            <ModalBody className="justify-center">
              <CreateChannelModal
                closeModal={() => setIsCreateChannelModalOpen(false)}
              />
            </ModalBody>
          </Modal>
        )}

        {isAddMemberModalOpen && (
          <Modal className="h-auto w-[90%] px-0 lg:w-[40rem]">
            <ModalHeader
              closeModal={() => setIsAddMemberModalOpen(false)}
              className="px-4"
            >
              Add member
            </ModalHeader>
            <ModalBody className="justify-center">
              <AddMemberModal />
            </ModalBody>
          </Modal>
        )}

        {isMembersModalOpen && (
          <Modal className="h-auto w-[90%] px-0 lg:w-[40rem]">
            <ModalHeader
              closeModal={() => setIsMembersModalOpen(false)}
              className="px-4"
            >
              Members
            </ModalHeader>
            <ModalBody className="justify-center">
              <MembersModal chatDataBox={chatDataBox} userData={settings} />
            </ModalBody>
          </Modal>
        )}

        {isPasswordModalOpen && (
          <Modal className="h-[15rem] w-[90%] lg:h-[15rem] lg:w-[40rem]">
            <ModalHeader closeModal={() => setIsPasswordModalOpen(false)}>
              Password
            </ModalHeader>
            <ModalBody className="justify-center">
              <FormProtected closeModal={() => setIsPasswordModalOpen(false)} />
            </ModalBody>
          </Modal>
        )}
      </MessagesContext.Provider>
    </StateMssages.Provider>
  );
}

export default Chat;
