import React, { useContext } from "react";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { ControllerIcon, SettingsNavIcon, LogoutIcon } from "../Icons";

import SearchInput from "../SearchInput";
import { Dropdown, DropdownBtn, DropdownItem, DropdownList } from "../Dropdown";
import { ActiveHome } from "../../pages/Home";
import { ActiveProfile } from "../../pages/Profile";
import { ActiveProfileUser } from "../../pages/ProfileUser";
import { GameContext } from "../../pages/Game";
import { logout } from "../../api/API";

interface TypeProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavBar({ setOpen }: TypeProps) {
  let dataUserLogged = useContext(ActiveHome);
  let dataUserLoggedProfile = useContext(ActiveProfile);
  let dataUserLoggedProfileUser = useContext(ActiveProfileUser);
  let dataGame = useContext(GameContext);
  const navigate = useNavigate();

  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedProfile;
  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedProfileUser;
  if (!dataUserLogged.value) dataUserLogged = dataGame;

  return (
    <section className="flex justify-center items-center pt-7 lg:justify-between lg:items-start lg:mr-4 lg:ml-64 lg:pt-7 lg:gap-5">
      <Link to="/home" className="lg:hidden">
        <img src={logo} alt="Pong logo" className="w-48" />
      </Link>
      <SearchInput />
      <div className="hidden lg:flex items-center gap-5">
        <Link
          to="/game"
          className="bg-primary text-primaryText text-sm flex items-center justify-center gap-2.5 w-36 rounded-md p-3"
        >
          <ControllerIcon edit="w-7" />
          <span>Play Now</span>
        </Link>
        <Dropdown>
          <DropdownBtn
            type="text"
            title={dataUserLogged.settings.nickname}
            imgTitle={dataUserLogged.settings.pictureURL}
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
