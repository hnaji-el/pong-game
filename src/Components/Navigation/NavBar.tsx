import React from "react";
import logo from "../../assets/logo.svg";
import pictureUser from "../../assets/user.jpg";
import { Link } from "react-router-dom";
import {
  ControllerIcon,
  SettingsNavIcon,
  LogoutIcon,
} from "../Icons";
import { Dropdown, DropdownBtn, DropdownList, DropdownItem } from "../Dropdown";
import SearchInput from "../SearchInput";

interface TypeProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavBar({ setOpen }: TypeProps) {
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
        <Dropdown>
          <DropdownBtn
            type="text"
            title="mouassit"
            imgTitle={pictureUser}
            arrow={true}
          />
          <DropdownList edit="top-12">
            <DropdownItem
              onClick={() => {
                if (setOpen) setOpen(true);
              }}
            >
              <SettingsNavIcon edit="w-5 h-5 fill-primaryText" />
              <span>Settings</span>
            </DropdownItem>
            <DropdownItem>
              <LogoutIcon edit="w-5 h-5 fill-primaryText" />
              <span>Logout</span>
            </DropdownItem>
          </DropdownList>
        </Dropdown>
      </div>
    </section>
  );
}
