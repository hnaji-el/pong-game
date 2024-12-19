import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../api/API";
import { CardChatChannel, CardChatFriend } from "../Cards";
import { Dropdown, DropdownItem, DropdownBtn, DropdownList } from "../Dropdown";
import { ControllerIcon, SettingsNavIcon, LogoutIcon } from "../Icons";
import { StateMssages } from "../../pages/Messages/Messages";
import { MessagesContext } from "../../pages/Messages/Messages";

interface TypeProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAddMember: React.Dispatch<React.SetStateAction<boolean>>;
  setMembers: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavBarChat({
  setOpen,
  setAddMember,
  setMembers,
}: TypeProps) {
  const stateMessage = useContext(StateMssages);
  const messageData = useContext(MessagesContext);
  const navigate = useNavigate();
  return (
    <section
      className={`${
        !stateMessage.click ? "hidden" : ""
      } z-[999] mx-3 items-center justify-center pt-7 lg:ml-64 lg:mr-4 lg:flex lg:items-start lg:justify-between lg:gap-5 lg:pt-7`}
    >
      {messageData.isDmOrChannel === "DM" ? (
        <CardChatFriend data={messageData.dataChatBox} />
      ) : (
        <CardChatChannel
          data={messageData.dataChatBox}
          setAddMember={setAddMember}
          setMembers={setMembers}
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
            <DropdownItem
              edit="justify-center p-2"
              onClick={() => {
                if (setOpen) setOpen(true);
              }}
            >
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
    </section>
  );
}
