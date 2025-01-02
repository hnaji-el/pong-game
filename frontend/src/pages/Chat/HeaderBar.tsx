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

import { StateMssages, MessagesContext } from "./Chat";

interface PropsType {
  openSettingsModal: () => void;
  openMembersModal: () => void;
  openAddMemberModal: () => void;
}

function HeaderBar({
  openSettingsModal,
  openMembersModal,
  openAddMemberModal,
}: PropsType) {
  const { setClick, settings } = React.useContext(StateMssages);
  const { chatDataBox, isDm } = React.useContext(MessagesContext);

  const navigate = useNavigate();

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
          onClick={() => setClick(false)}
        />
      ) : (
        <ChannelEditCard
          name={chatDataBox.name}
          type={chatDataBox.type}
          userRole={chatDataBox.role}
          onClick={() => setClick(false)}
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
            title={settings.nickname}
            imgTitle={settings.pictureURL}
            arrow={true}
          />
          <DropdownList edit="top-12">
            <DropdownItem edit="justify-center p-2" onClick={openSettingsModal}>
              <SettingsNavIcon edit="w-5 h-5 fill-primaryText" />
              <span>Settings</span>
            </DropdownItem>
            <DropdownItem
              edit="justify-center p-2"
              onClick={async () => {
                await logout();
                navigate("/login");
              }}
            >
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
