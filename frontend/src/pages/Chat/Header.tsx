import React from "react";

import { useNavigate } from "react-router-dom";

import PlayNowLink from "../../components/links/PlayNowLink";
import UserCard from "../../components/UserCard";
import ChannelEditCard from "../../components/ChannelEditCard";
import { SettingsNavIcon, LogoutIcon } from "../../components/Icons";
import {
  Dropdown,
  DropdownItem,
  DropdownList,
} from "../../components/Dropdown";
import { logout } from "../../api/API";

import { UserType } from "../../api/types";
import useToggle from "../../hooks/use-toggle";
import SettingsButton from "../../components/buttons/SettingsButton/SettingsButton";

interface PropsType {
  isDm: boolean;
  chatDataBox: any;
  loggedUserData: UserType;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
  openSettingsModal: () => void;
}

function Header({
  isDm,
  chatDataBox,
  loggedUserData,
  setClick,
  openSettingsModal,
}: PropsType) {
  const [isDropdownOpen, toggleIsDropdownOpen] = useToggle(false);
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="lg:flex lg:items-start lg:justify-between lg:gap-5">
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

        <Dropdown isOpen={isDropdownOpen} handleClose={toggleIsDropdownOpen}>
          <SettingsButton
            isOpen={isDropdownOpen}
            toggleIsOpen={toggleIsDropdownOpen}
            title={loggedUserData.nickname}
            imgURL={loggedUserData.pictureURL}
          />

          {isDropdownOpen && (
            <DropdownList className="top-12">
              <DropdownItem
                handleClose={toggleIsDropdownOpen}
                className="justify-center p-2"
                onClick={openSettingsModal}
              >
                <SettingsNavIcon edit="w-5 h-5 fill-primaryText" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem
                handleClose={toggleIsDropdownOpen}
                className="justify-center p-2"
                onClick={handleLogout}
              >
                <LogoutIcon edit="w-5 h-5 fill-primaryText" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownList>
          )}
        </Dropdown>
      </div>
    </header>
  );
}

export default Header;
