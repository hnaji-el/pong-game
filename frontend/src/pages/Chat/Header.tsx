import React from "react";

import { useNavigate, useParams } from "react-router-dom";

import PlayNowLink from "../../components/links/PlayNowLink/PlayNowLink";
import UserCard from "../../components/UserCard";
import ChannelEditCard from "../../components/ChannelEditCard";
import Dropdown from "../../components/Dropdown/Dropdown";
import { logout } from "../../api/API";
import SettingsButton from "../../components/buttons/SettingsButton/SettingsButton";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import { LuLogOut as LogoutIcon } from "react-icons/lu";
import Modal from "../../components/Modal/Modal";
import SettingsModal from "../../components/modals/SettingsModal";
import useToggle from "../../hooks/use-toggle";
import { UserType } from "../../api/types";
import { Rooms, Status } from "./types";

interface PropsType {
  rooms: Rooms;
  roomsStatus: Status;
  isDm: boolean;
  loggedUserData: UserType;
  setLoggedUserData: React.Dispatch<React.SetStateAction<UserType>>;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({
  rooms,
  roomsStatus,
  isDm,
  loggedUserData,
  setLoggedUserData,
  setClick,
}: PropsType) {
  const [isDropdownOpen, toggleIsDropdownOpen] = useToggle(false);
  const [isSettingsModalOpen, toggleIsSettingsModalOpen] = useToggle(false);

  const { chatId } = useParams();
  const navigate = useNavigate();

  const dm = rooms.dms.find((element) => element.id === chatId);
  const channel = rooms.channels.find((element) => element.id === chatId);

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

      {roomsStatus !== "success" || !chatId ? (
        <div className="flex grow"></div>
      ) : isDm && dm ? (
        <UserCard
          id={dm.userId}
          nickname={dm.nickname}
          avatar={dm.pictureURL}
          isOnline={dm.isOnline}
          handleArrowLeftClick={() => setClick(false)}
        />
      ) : !isDm && channel ? (
        <ChannelEditCard
          channelId={channel.id}
          channelName={channel.name}
          channelType={channel.type}
          loggedUserRole={channel.role}
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

export default Header;
