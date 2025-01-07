import React from "react";

import { useNavigate } from "react-router-dom";

import PlayNowButton from "../../components/buttons/PlayNowButton";
import UserCard from "../../components/UserCard";
import ChannelEditCard from "../../components/ChannelEditCard";
import { SettingsNavIcon, LogoutIcon } from "../../components/Icons";
import {
  Dropdown,
  DropdownItem,
  DropdownBtn,
  DropdownList,
} from "../../components/Dropdown";
import { logout } from "../../api/API";

import { UserType } from "../../api/types";

interface PropsType {
  isDm: boolean;
  chatDataBox: any;
  loggedUserData: UserType;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
  openSettingsModal: () => void;
  openMembersModal: () => void;
  openAddMemberModal: () => void;
}

function HeaderBar({
  isDm,
  chatDataBox,
  loggedUserData,
  setClick,
  openSettingsModal,
  openMembersModal,
  openAddMemberModal,
}: PropsType) {
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
          name={chatDataBox.name}
          type={chatDataBox.type}
          loggedUserRole={chatDataBox.role}
          handleArrowLeftClick={() => setClick(false)}
          openMembersModal={openMembersModal}
          openAddMemberModal={openAddMemberModal}
        />
      )}

      <div className="hidden lg:flex lg:items-center lg:gap-5">
        <PlayNowButton />

        <Dropdown>
          <DropdownBtn
            type="text"
            title={loggedUserData.nickname}
            imgTitle={loggedUserData.pictureURL}
            arrow={true}
          />
          <DropdownList edit="top-12">
            <DropdownItem edit="justify-center p-2" onClick={openSettingsModal}>
              <SettingsNavIcon edit="w-5 h-5 fill-primaryText" />
              <span>Settings</span>
            </DropdownItem>
            <DropdownItem edit="justify-center p-2" onClick={handleLogout}>
              <LogoutIcon edit="w-5 h-5 fill-primaryText" />
              <span>Logout</span>
            </DropdownItem>
          </DropdownList>
        </Dropdown>
      </div>
    </header>
  );
}

export default HeaderBar;
