import React, { useContext } from "react";
import { blockFriend, getOneUser, unfriend } from "../api/API";
import { Dropdown, DropdownBtn, DropdownItem, DropdownList } from "./Dropdown";
import { ActiveProfileUser } from "../pages/ProfileUser/ProfileUser";
import { globalSocket } from "../utilities/socket";
import { UpdateDataProfileUser } from "../pages/ProfileUser/ProfileUser";
import useToggle from "../hooks/use-toggle";

interface TypeProps {
  id: string;
  setTypeUser: React.Dispatch<React.SetStateAction<string>>;
}

export default function BtnFriend({ id, setTypeUser }: TypeProps) {
  const [isDropdownOpen, toggleIsDropdownOpen] = useToggle(false);

  const dataUserLogged = useContext(ActiveProfileUser);
  const update = useContext(UpdateDataProfileUser);

  return (
    <Dropdown isOpen={isDropdownOpen} handleClose={toggleIsDropdownOpen}>
      <DropdownBtn
        isOpen={isDropdownOpen}
        toggleIsOpen={toggleIsDropdownOpen}
        type="button"
        title="Friend"
      />

      {isDropdownOpen && (
        <DropdownList className="top-12 w-full">
          <DropdownItem
            handleClose={toggleIsDropdownOpen}
            className="items-center px-3 py-2 capitalize"
            onClick={async () => {
              setTypeUser("notFriend");
              await unfriend(id);
              getOneUser((res: any) => {
                update.setDataUser(res);
              }, id);
            }}
          >
            <span className="font-light">unfriend</span>
          </DropdownItem>
          <DropdownItem
            handleClose={toggleIsDropdownOpen}
            className="items-center px-3 py-2"
            onClick={() => {
              globalSocket.emit("inviteToPlay", {
                sender: dataUserLogged.settings,
                receiverId: id,
              });
            }}
          >
            <span className="font-light">Invite to play</span>
          </DropdownItem>
          <DropdownItem
            handleClose={toggleIsDropdownOpen}
            className="items-center px-3 py-2 capitalize"
            onClick={async () => {
              setTypeUser("blocked");
              await blockFriend(id);
              getOneUser((res: any) => {
                update.setDataUser(res);
              }, id);
            }}
          >
            <span className="font-light">Block</span>
          </DropdownItem>
        </DropdownList>
      )}
    </Dropdown>
  );
}
