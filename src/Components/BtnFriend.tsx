import React from "react";
import { Dropdown, DropdownBtn, DropdownItem, DropdownList } from "./Dropdown";

export default function BtnFriend() {
  return (
    <Dropdown>
      <DropdownBtn type="button" title="mouassit" arrow={true} />
      <DropdownList edit="top-12 w-full">
        <DropdownItem edit="items-center py-2 px-3 capitalize">
          <span>Settings</span>
        </DropdownItem>
        <DropdownItem edit="items-center py-2 px-3 capitalize">
          <span>Logout</span>
        </DropdownItem>
      </DropdownList>
    </Dropdown>
  );
}
