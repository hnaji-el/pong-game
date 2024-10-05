import React, { useContext } from "react";
import { blockFriend, getOneUser, unfriend } from "../API/API";
import { Dropdown, DropdownBtn, DropdownItem, DropdownList } from "./Dropdown";
import { ActiveProfileUser } from "./Routes/ProfileUser";
import { globalSocket } from "../helpers/socket";
import { UpdateDataProfileUser } from "./Routes/ProfileUser";

interface TypeProps {
  id: string;
  setTypeUser: React.Dispatch<React.SetStateAction<string>>;
}

export default function BtnFriend({ id, setTypeUser }: TypeProps) {
  const dataUserLogged = useContext(ActiveProfileUser);
  const update = useContext(UpdateDataProfileUser);
  return (
    <Dropdown>
      <DropdownBtn type="button" title="Friends" arrow={true} />
      <DropdownList edit="top-12 w-full">
        <DropdownItem
          edit="items-center py-2 px-3 capitalize"
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
          edit="items-center py-2 px-3"
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
          edit="items-center py-2 px-3 capitalize"
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
    </Dropdown>
  );
}
