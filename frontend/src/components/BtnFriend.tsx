import React from "react";

import { blockFriend, getOneUser, unfriend } from "../api/API";
import Dropdown from "./Dropdown/Dropdown";
import { ActiveProfileUser } from "../pages/ProfileUser/ProfileUser";
import { globalSocket } from "../utilities/socket";
import { UpdateDataProfileUser } from "../pages/ProfileUser/ProfileUser";
import useToggle from "../hooks/use-toggle";
import FriendButton from "./buttons/FriendButton/FriendButton";

interface TypeProps {
  id: string;
  setTypeUser: React.Dispatch<React.SetStateAction<string>>;
}

function BtnFriend({ id, setTypeUser }: TypeProps) {
  const [isDropdownOpen, toggleIsDropdownOpen] = useToggle(false);
  const dataUserLogged = React.useContext(ActiveProfileUser);
  const update = React.useContext(UpdateDataProfileUser);

  async function handleUnfriend() {
    setTypeUser("notFriend");
    await unfriend(id);

    getOneUser((res: any) => {
      update.setDataUser(res);
    }, id);
  }

  function handleInviteToPlay() {
    globalSocket.emit("inviteToPlay", {
      sender: dataUserLogged.settings,
      receiverId: id,
    });
  }

  async function handleBlock() {
    setTypeUser("blocked");
    await blockFriend(id);

    getOneUser((res: any) => {
      update.setDataUser(res);
    }, id);
  }

  return (
    <Dropdown
      isOpen={isDropdownOpen}
      toggleIsOpen={toggleIsDropdownOpen}
      options={[
        { label: "unfriend" },
        { label: "invite to play" },
        { label: "block" },
      ]}
      handleSelect={(option) => {
        if (option === "unfriend") handleUnfriend();
        if (option === "invite to play") handleInviteToPlay();
        if (option === "block") handleBlock();
      }}
      className="right-0 top-full w-full translate-y-[10px]"
    >
      <FriendButton
        isOpen={isDropdownOpen}
        toggleIsOpen={toggleIsDropdownOpen}
      />
    </Dropdown>
  );
}

export default BtnFriend;
