import React, { useContext } from "react";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";

import SearchInput from "../SearchInput";
import Dropdown from "../Dropdown/Dropdown";
import { ActiveHome } from "../../pages/Home/Home";
import { ActiveProfile } from "../../pages/Profile/Profile";
import { ActiveProfileUser } from "../../pages/ProfileUser/ProfileUser";
import { GameContext } from "../../pages/Game/Game";
import { logout } from "../../api/API";
import PlayNowLink from "../links/PlayNowLink";
import useToggle from "../../hooks/use-toggle";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import { LuLogOut as LogoutIcon } from "react-icons/lu";
import SettingsButton from "../buttons/SettingsButton/SettingsButton";
import Modal from "../Modal/Modal";
import SettingsModal from "../modals/SettingsModal";
import VisuallyHidden from "../VisuallyHidden";

export default function NavBar() {
  const [isSettingsModalOpen, toggleIsSettingsModalOpen] = useToggle(false);
  const [isDropdownOpen, toggleIsDropdownOpen] = useToggle(false);

  let dataUserLogged = useContext(ActiveHome);
  let dataUserLoggedProfile = useContext(ActiveProfile);
  let dataUserLoggedProfileUser = useContext(ActiveProfileUser);
  let dataGame = useContext(GameContext);
  const navigate = useNavigate();

  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedProfile;
  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedProfileUser;
  if (!dataUserLogged.value) dataUserLogged = dataGame;

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <section className="flex items-center justify-center pt-7 lg:ml-64 lg:mr-4 lg:items-start lg:justify-between lg:gap-5 lg:pt-7">
      {isSettingsModalOpen && (
        <Modal title="settings" handleDismiss={toggleIsSettingsModalOpen}>
          <SettingsModal
            loggedUserData={dataUserLogged.settings}
            setLoggedUserData={dataUserLogged.updateSettings}
            handleDismiss={toggleIsSettingsModalOpen}
          />
        </Modal>
      )}

      <Link to="/home" className="lg:hidden">
        <img src={logo} alt="Pong logo" className="w-48" />
        <VisuallyHidden>Go to the home page</VisuallyHidden>
      </Link>

      <SearchInput />

      <div className="hidden items-center gap-5 lg:flex">
        <PlayNowLink />

        <Dropdown
          isOpen={isDropdownOpen}
          toggleIsOpen={toggleIsDropdownOpen}
          options={[
            { label: "settings", icon: <SettingsIcon size={20} /> },
            { label: "logout", icon: <LogoutIcon size={20} /> },
          ]}
          handleSelect={(option) => {
            if (option === "settings") toggleIsSettingsModalOpen();
            if (option === "logout") handleLogout();
          }}
          className="right-0 top-full translate-y-[10px]"
        >
          <SettingsButton
            isOpen={isDropdownOpen}
            toggleIsOpen={toggleIsDropdownOpen}
            title={dataUserLogged.settings.nickname}
            imgURL={dataUserLogged.settings.pictureURL}
          />
        </Dropdown>
      </div>
    </section>
  );
}
