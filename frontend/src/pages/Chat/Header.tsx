import React from "react";

import { useNavigate } from "react-router-dom";

import PlayNowLink from "../../components/links/PlayNowLink";
import UserCard from "../../components/UserCard";
import ChannelEditCard from "../../components/ChannelEditCard";
import Dropdown from "../../components/Dropdown/Dropdown";
import { logout } from "../../api/API";
import { UserType } from "../../api/types";
import useToggle from "../../hooks/use-toggle";
import SettingsButton from "../../components/buttons/SettingsButton/SettingsButton";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import { LuLogOut as LogoutIcon } from "react-icons/lu";
import Modal from "../../components/Modal/Modal";
import SettingsModal from "../../components/modals/SettingsModal";

interface PropsType {
  isDm: boolean;
  chatDataBox: any;
  loggedUserData: UserType;
  setLoggedUserData: React.Dispatch<React.SetStateAction<UserType>>;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({
  isDm,
  chatDataBox,
  loggedUserData,
  setLoggedUserData,
  setClick,
}: PropsType) {
  const [isDropdownOpen, toggleIsDropdownOpen] = useToggle(false);
  const [isSettingsModalOpen, toggleIsSettingsModalOpen] = useToggle(false);

  const navigate = useNavigate();

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

      {!chatDataBox ? (
        <div className="flex grow"></div>
      ) : isDm ? (
        <UserCard
          id={chatDataBox.id}
          nickname={chatDataBox.nickname}
          avatar={chatDataBox.pictureURL}
          isOnline={chatDataBox.status === "online"}
          handleArrowLeftClick={() => setClick(false)}
        />
      ) : (
        <ChannelEditCard
          chatDataBox={chatDataBox}
          loggedUserData={loggedUserData}
          name={chatDataBox.name}
          type={chatDataBox.type}
          loggedUserRole={chatDataBox.role}
          handleArrowLeftClick={() => setClick(false)}
        />
      )}

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
