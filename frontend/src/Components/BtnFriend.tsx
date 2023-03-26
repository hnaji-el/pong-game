import React, { useContext } from "react";
import { blockFriend, unfriend } from "../API";
import { Dropdown, DropdownBtn, DropdownItem, DropdownList } from "./Dropdown";
import { ActiveProfileUser } from "./Routes/ProfileUser";
import { globalSocket } from "../socket";
interface TypeProps {
  id: string;
  setTypeUser: React.Dispatch<React.SetStateAction<string>>;
}

export default function BtnFriend({ id, setTypeUser }: TypeProps) {
  const dataUserLogged = useContext(ActiveProfileUser);
  return (
    <Dropdown>
      <DropdownBtn type="button" title="Friends" arrow={true} />
      <DropdownList edit="top-12 w-full">
        <DropdownItem
          edit="items-center py-2 px-3 capitalize"
          onClick={() => {
            setTypeUser("notFriend");
            unfriend(id);
          }}
        >
          <span className="font-light">unfriend</span>
        </DropdownItem>
        <DropdownItem edit="items-center py-2 px-3" onClick={()=>{
          console.log('BTN INVITE TO PLAY', dataUserLogged.settings.id, id);
          console.log('SENDER SOCKET ID', globalSocket.id);
          // sender id  rec id
          // request invite to play for rec
          globalSocket.emit("inviteToPlay",  {sender: dataUserLogged.settings, receiverId:id} );
        }}>
          <span className="font-light">Invite to play</span>
        </DropdownItem>
        <DropdownItem
          edit="items-center py-2 px-3 capitalize"
          onClick={() => {
            setTypeUser("blocked");
            blockFriend(id);
          }}
        >
          <span className="font-light">Block</span>
        </DropdownItem>
      </DropdownList>
    </Dropdown>
  );
}
