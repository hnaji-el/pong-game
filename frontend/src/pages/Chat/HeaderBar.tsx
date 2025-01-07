import React from "react";

import { Link, useNavigate } from "react-router-dom";

import UserCard from "../../components/UserCard";
import ChannelEditCard from "../../components/ChannelEditCard";
import {
  Dropdown,
  DropdownItem,
  DropdownBtn,
  DropdownList,
} from "../../components/Dropdown";
import {
  ControllerIcon,
  SettingsNavIcon,
  LogoutIcon,
} from "../../components/Icons";
import { logout } from "../../api/API";

import { UserType } from "../../api/types";

interface PropsType {
  isDm: boolean;
  chatDataBox: any;
  userData: UserType;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
  openSettingsModal: () => void;
  openMembersModal: () => void;
  openAddMemberModal: () => void;
}

function HeaderBar({
  isDm,
  chatDataBox,
  userData,
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
          userRole={chatDataBox.role}
          handleArrowLeftClick={() => setClick(false)}
          openMembersModal={openMembersModal}
          openAddMemberModal={openAddMemberModal}
        />
      )}

      <div className="hidden lg:flex lg:items-center lg:gap-5">
        <Link
          to="/game"
          className="flex w-36 items-center justify-center gap-2.5 rounded-md bg-primary p-3 text-sm text-primaryText"
        >
          <ControllerIcon edit="w-7" />
          <span>Play now</span>
        </Link>
        <Dropdown>
          <DropdownBtn
            type="text"
            title={userData.nickname}
            imgTitle={userData.pictureURL}
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
