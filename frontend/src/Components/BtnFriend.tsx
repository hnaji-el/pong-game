import React from "react";
import { blockFriend, unfriend } from "../API";
import { Dropdown, DropdownBtn, DropdownItem, DropdownList } from "./Dropdown";

interface TypeProps {
  id: string;
  setTypeUser: React.Dispatch<React.SetStateAction<string>>;
}

export default function BtnFriend({ id, setTypeUser }: TypeProps) {
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
        <DropdownItem edit="items-center py-2 px-3">
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
