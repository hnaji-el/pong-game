import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import pictureUser from "../../assets/user.jpg";
import { Link } from "react-router-dom";
import {
  ControllerIcon,
  SettingsNavIcon,
  LogoutIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "../Icons";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import SearchInput from "../SearchInput";

interface TypeProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavBar({ setOpen }: TypeProps) {
  const [dropdown, setDropdown] = useState<boolean>(false);
  return (
    <section className="flex justify-center items-center pt-7 lg:justify-between lg:items-start lg:mr-4 lg:ml-64 lg:pt-7 lg:gap-5">
      <Link to="/" className="lg:hidden">
        <img src={logo} alt="Pong logo" className="w-48" />
      </Link>
      <SearchInput />
      <div className="hidden lg:flex items-center gap-5">
        <button className="bg-primary text-primaryText text-sm flex items-center justify-center gap-2.5 w-36 rounded-md p-3">
          <ControllerIcon edit="w-7" />
          <span>Play now</span>
        </button>

        <Menu>
          <MenuButton
            onClick={() => {
              dropdown ? setDropdown(false) : setDropdown(true);
            }}
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <img
                  src={pictureUser}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <span className="max-w-[9.6rem] overflow-hidden text-ellipsis	whitespace-nowrap capitalize text-primaryText text-sm">
                  mouassit
                </span>
              </div>
              <span className="bg-shape w-4 h-4 rounded-full flex justify-center items-center">
                {dropdown ? (
                  <ArrowUpIcon edit="w-1.5 h-1.5 fill-secondaryText" />
                ) : (
                  <ArrowDownIcon edit="w-1.5 h-1.5 fill-secondaryText" />
                )}
              </span>
            </div>
          </MenuButton>
          <MenuList className="bg-body rounded-md shadow right-0 w-36 flex flex-col py-5 gap-2 list-dropdown cursor-default text-primaryText text-sm">
            <MenuItem
              className="flex gap-2 hover:bg-backgroundHover items-center p-2 capitalize justify-center"
              onClick={() => {
                setOpen(true);
              }}
            >
              <SettingsNavIcon edit="w-5 h-5 fill-primaryText" />
              <span>Settings</span>
            </MenuItem>
            <MenuItem className="flex gap-2 hover:bg-backgroundHover items-center py-2 px-3 capitalize justify-center">
              <LogoutIcon edit="w-5 h-5 fill-primaryText" />
              <span>Logout</span>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </section>
  );
}
