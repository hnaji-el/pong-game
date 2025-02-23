import React, { useContext } from "react";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { SettingsNavIcon, LogoutIcon } from "../Icons";

import SearchInput from "../SearchInput";
import { Dropdown, DropdownBtn, DropdownItem, DropdownList } from "../Dropdown";
import { ActiveHome } from "../../pages/Home/Home";
import { ActiveProfile } from "../../pages/Profile/Profile";
import { ActiveProfileUser } from "../../pages/ProfileUser/ProfileUser";
import { GameContext } from "../../pages/Game/Game";
import { logout } from "../../api/API";
import PlayNowLink from "../links/PlayNowLink";
import useToggle from "../../hooks/use-toggle";

interface TypeProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavBar({ setOpen }: TypeProps) {
  const [isDropdownOpen, toggleIsDropdownOpen] = useToggle(false);

  let dataUserLogged = useContext(ActiveHome);
  let dataUserLoggedProfile = useContext(ActiveProfile);
  let dataUserLoggedProfileUser = useContext(ActiveProfileUser);
  let dataGame = useContext(GameContext);
  const navigate = useNavigate();

  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedProfile;
  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedProfileUser;
  if (!dataUserLogged.value) dataUserLogged = dataGame;

  return (
    <section className="flex items-center justify-center pt-7 lg:ml-64 lg:mr-4 lg:items-start lg:justify-between lg:gap-5 lg:pt-7">
      <Link to="/home" className="lg:hidden">
        <img src={logo} alt="Pong logo" className="w-48" />
      </Link>
      <SearchInput />
      <div className="hidden items-center gap-5 lg:flex">
        <PlayNowLink />

        <Dropdown isOpen={isDropdownOpen} handleClose={toggleIsDropdownOpen}>
          <DropdownBtn
            isOpen={isDropdownOpen}
            toggleIsOpen={toggleIsDropdownOpen}
            type="text"
            title={dataUserLogged.settings.nickname}
            imgTitle={dataUserLogged.settings.pictureURL}
          />

          {isDropdownOpen && (
            <DropdownList className="top-12">
              <DropdownItem
                handleClose={toggleIsDropdownOpen}
                className="justify-center p-2"
                onClick={() => {
                  if (setOpen) setOpen(true);
                }}
              >
                <SettingsNavIcon edit="w-5 h-5 fill-primaryText" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem
                handleClose={toggleIsDropdownOpen}
                className="justify-center p-2"
                onClick={async () => {
                  await logout();
                  navigate("/login");
                }}
              >
                <LogoutIcon edit="w-5 h-5 fill-primaryText" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownList>
          )}
        </Dropdown>
      </div>
    </section>
  );
}
