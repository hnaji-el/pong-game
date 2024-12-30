import React from "react";

import { Link, useNavigate } from "react-router-dom";

import { CardChatChannel, CardChatFriend } from "../../components/Cards";
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

import { StateMssages } from "./Chat";
import { MessagesContext } from "./Chat";

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
  const stateMessage = React.useContext(StateMssages);
  const messageData = React.useContext(MessagesContext);
  const navigate = useNavigate();

  return (
    <header className="lg:flex lg:items-start lg:justify-between lg:gap-5">
      {messageData.isDm ? (
        <CardChatFriend data={messageData.chatDataBox} />
      ) : (
        <CardChatChannel
          data={messageData.chatDataBox}
          openMembersModal={openMembersModal}
          openAddMemberModal={openAddMemberModal}
        />
      )}
      <div className="hidden items-center gap-5 lg:flex">
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
            title={stateMessage.settings.nickname}
            imgTitle={stateMessage.settings.pictureURL}
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
