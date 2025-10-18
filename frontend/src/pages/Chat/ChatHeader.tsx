import React from "react";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import useToggle from "../../hooks/use-toggle";
import PlayNowLink from "../../components/links/PlayNowLink/PlayNowLink";
import UserCard from "../../components/UserCard";
import ChannelEditCard from "../../components/ChannelEditCard";
import Dropdown from "../../components/Dropdown/Dropdown";
import SettingsButton from "../../components/buttons/SettingsButton/SettingsButton";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import { LuLogOut as LogoutIcon } from "react-icons/lu";
import Modal from "../../components/Modal/Modal";
import SettingsModal from "../../components/modals/SettingsModal";

import { logout } from "../../api/API";
import { UserType } from "../../api/types";
import { RoomData } from "./types";

const DOMAIN = import.meta.env.VITE_BACKEND_ORIGIN;

interface PropsType {
  loggedUserData: UserType;
  setLoggedUserData: React.Dispatch<React.SetStateAction<UserType>>;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChatHeader({
  loggedUserData,
  setLoggedUserData,
  setClick,
}: PropsType) {
  const [isDropdownOpen, toggleIsDropdownOpen] = useToggle(false);
  const [isSettingsModalOpen, toggleIsSettingsModalOpen] = useToggle(false);

  const [roomData, setRoomData] = React.useState<RoomData>({
    dm: null,
    channel: null,
  });

  const { chatId } = useParams();

  const [searchParams] = useSearchParams();
  const roomType = searchParams.get("type");
  const isDm = roomType === "dm";

  const navigate = useNavigate();

  // GET /chat/rooms/:id?type=dm | channel => Dm | Channel
  React.useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(
          `${DOMAIN}/chat/rooms/${chatId}?type=${roomType}`,
          { credentials: "include" },
        );

        const body: RoomData = await res.json();

        if (res.ok) {
          setRoomData(body);
        } else {
          res.status === 401
            ? navigate("/login")
            : window.alert("Something Went Wrong");
        }
      } catch (err) {
        const error = err as Error;
        window.alert(error.message);
      }
    };

    if (chatId && roomType) {
      fetcher();
    }
  }, [chatId, roomType, isDm, navigate]);

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="lg:flex lg:items-start lg:justify-between lg:gap-5">
      {isSettingsModalOpen && (
        <Modal title="settings" handleDismiss={toggleIsSettingsModalOpen}>
          <SettingsModal
            loggedUserData={loggedUserData}
            setLoggedUserData={setLoggedUserData}
            handleDismiss={toggleIsSettingsModalOpen}
          />
        </Modal>
      )}

      {!chatId || !roomType || (!roomData.dm && !roomData.channel) ? (
        <div className="flex grow"></div>
      ) : isDm && roomData.dm ? (
        <UserCard
          id={roomData.dm.userId}
          nickname={roomData.dm.nickname}
          avatar={roomData.dm.pictureURL}
          isOnline={roomData.dm.isOnline}
          handleArrowLeftClick={() => setClick(false)}
        />
      ) : !isDm && roomData.channel ? (
        <ChannelEditCard
          channelId={roomData.channel.id}
          channelName={roomData.channel.name}
          channelType={roomData.channel.type}
          loggedUserRole={roomData.channel.role}
          loggedUserData={loggedUserData}
          handleArrowLeftClick={() => setClick(false)}
        />
      ) : null}

      <div className="hidden lg:flex lg:items-center lg:gap-5">
        <PlayNowLink />

        <Dropdown
          isOpen={isDropdownOpen}
          toggleIsOpen={toggleIsDropdownOpen}
          options={[
            { label: "settings", icon: <SettingsIcon size={20} /> },
            { label: "logout", icon: <LogoutIcon size={20} /> },
          ]}
          handleSelect={(option) => {
            if (option === "settings") toggleIsSettingsModalOpen();
            if (option === "logout") handleLogout();
          }}
          className="right-0 top-full translate-y-[10px]"
        >
          <SettingsButton
            isOpen={isDropdownOpen}
            toggleIsOpen={toggleIsDropdownOpen}
            title={loggedUserData.nickname}
            imgURL={loggedUserData.pictureURL}
          />
        </Dropdown>
      </div>
    </header>
  );
}

export default ChatHeader;
