import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../api/API";
import { CardChatChannel, CardChatFriend } from "../Cards";
import { Dropdown, DropdownItem, DropdownBtn, DropdownList } from "../Dropdown";
import { ControllerIcon, SettingsNavIcon, LogoutIcon } from "../Icons";
import { StateMssages } from "../routes/Messages";
import { MessagesContext } from "../routes/Messages";

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
      } lg:flex justify-center items-center pt-7 lg:justify-between lg:items-start mx-3 lg:mr-4 lg:ml-64 lg:pt-7 lg:gap-5 z-[999]`}
    >
      {messageData.typeDm === "chat" ? (
        <CardChatFriend data={messageData.dataChatBox} />
      ) : (
        <CardChatChannel
          data={messageData.dataChatBox}
          setAddMember={setAddMember}
          setMembers={setMembers}
        />
      )}
      <div className="hidden lg:flex items-center gap-5">
        <Link
          to="/game"
          className="bg-primary text-primaryText text-sm flex items-center justify-center gap-2.5 w-36 rounded-md p-3"
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
