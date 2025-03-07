import React from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  HomeIcon,
  MessagesIcon,
  UserIcon,
  SearchIcon,
  ControllerIcon,
} from "../Icons";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import { LuLogOut as LogoutIcon } from "react-icons/lu";
import { ActiveHome } from "../../pages/Home/Home";
import { ActiveProfile } from "../../pages/Profile/Profile";
import { ActiveProfileUser } from "../../pages/ProfileUser/ProfileUser";
import { GameContext } from "../../pages/Game/Game";
import logo from "../../assets/logo.svg";
import VisuallyHidden from "../VisuallyHidden";
import useToggle from "../../hooks/use-toggle";
import Dropdown from "../Dropdown/Dropdown";
import Modal from "../Modal/Modal";
import SettingsModal from "../modals/SettingsModal";
import SearchModal from "../modals/SearchModal";
import SearchInput from "../SearchInput";
import { logout } from "../../api/API";

export default function SideBar() {
  const [isDropdownOpen, toggleIsDropdownOpen] = useToggle(false);
  const [isSettingsModalOpen, toggleIsSettingsModalOpen] = useToggle(false);
  const [isSearchModalOpen, toggleIsSearchModalOpen] = useToggle(false);

  const home = React.useContext(ActiveHome);
  const profile = React.useContext(ActiveProfile);

  let dataUserLogged = React.useContext(ActiveHome);
  let dataUserLoggedProfile = React.useContext(ActiveProfile);
  let dataUserLoggedProfileUser = React.useContext(ActiveProfileUser);
  let game = React.useContext(GameContext);

  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedProfile;
  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedProfileUser;
  if (!dataUserLogged.value) dataUserLogged = game;

  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <>
      <section
        className={`fixed bottom-0 w-full px-3 pb-3 ${
          !isSearchModalOpen ? "bg-body" : ""
        } z-[998] flex-col lg:left-0 lg:top-0 lg:flex lg:w-60 lg:gap-12 lg:bg-sideBackground lg:px-0 lg:py-7 2xl:left-auto`}
      >
        {isSettingsModalOpen && (
          <Modal title="settings" handleDismiss={toggleIsSettingsModalOpen}>
            <SettingsModal
              loggedUserData={dataUserLogged.settings}
              setLoggedUserData={dataUserLogged.updateSettings}
              handleDismiss={toggleIsSettingsModalOpen}
            />
          </Modal>
        )}

        {isSearchModalOpen && (
          <SearchModal closeModal={toggleIsSearchModalOpen}>
            <SearchInput setOpenSearch={toggleIsSearchModalOpen} modal={true} />
          </SearchModal>
        )}

        <Link to="/home" className="hidden items-center justify-center lg:flex">
          <img src={logo} alt="Pong logo" className="w-48 lg:w-44" />
          <VisuallyHidden>Go to the home page</VisuallyHidden>
        </Link>

        <nav className="rounded-lg bg-sideBackground p-2 px-3 shadow-lg lg:rounded-none lg:bg-transparent lg:p-0 lg:px-0 lg:shadow-none">
          <ul className="flex items-center justify-between lg:flex-col lg:items-start lg:gap-12">
            <li className="lg:w-full">
              <Link
                to="/home"
                className={`flex flex-col items-center justify-center gap-1.5 lg:flex-row lg:justify-start lg:gap-4 lg:p-3 lg:pl-8 lg:hover:bg-shape ${
                  home.value
                    ? "lg:border-l-[6px] lg:border-primary lg:bg-shape"
                    : ""
                }`}
              >
                <HomeIcon
                  edit={`w-6 h-6  lg:fill-primary lg:w-7 lg:h-7  ${
                    home.value ? "fill-primary" : "fill-secondaryText"
                  }`}
                />
                <span
                  className={`text-xs lg:relative lg:top-[.1rem] lg:text-sm lg:text-primaryText ${
                    home.value ? "text-primary" : "text-secondaryText"
                  }`}
                >
                  Home
                </span>
              </Link>
            </li>
            <li className="lg:w-full">
              <Link
                to="/chat"
                className="flex flex-col items-center justify-center gap-1.5 lg:flex-row lg:justify-start lg:gap-4 lg:p-3 lg:pl-8 lg:hover:bg-shape"
              >
                <MessagesIcon edit="w-6 h-6  lg:fill-primary lg:w-7 lg:h-7 fill-secondaryText" />
                <span className="text-xs text-secondaryText lg:text-sm lg:text-primaryText">
                  Messages
                </span>
              </Link>
            </li>
            <li className="lg:w-full">
              <Link
                to="/profile"
                className={`flex flex-col items-center justify-center gap-1.5 lg:flex-row lg:justify-start lg:gap-4 lg:p-3 lg:pl-8 lg:hover:bg-shape ${
                  profile.value
                    ? "lg:border-l-[6px] lg:border-primary lg:bg-shape"
                    : ""
                }`}
              >
                <UserIcon
                  edit={`w-6 h-6  lg:fill-primary lg:w-7 lg:h-7 ${
                    profile.value ? "fill-primary" : "fill-secondaryText"
                  }`}
                />
                <span
                  className={`text-xs lg:relative lg:top-[.1rem] lg:text-sm lg:text-primaryText ${
                    profile.value ? "text-primary" : "text-secondaryText"
                  }`}
                >
                  Profile
                </span>
              </Link>
            </li>

            <li className="lg:hidden">
              <button
                className="flex flex-col items-center justify-center gap-1.5"
                onClick={toggleIsSearchModalOpen}
              >
                <SearchIcon edit="w-5 h-6 fill-secondaryText" />
                <span className="text-xs text-secondaryText">Search</span>
              </button>
            </li>

            <li className="lg:hidden">
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
                className="right-0 top-0 -translate-y-[calc(100%+10px)]"
              >
                <button
                  className="flex items-center justify-center gap-1.5"
                  onClick={toggleIsDropdownOpen}
                >
                  <img
                    src={dataUserLogged.settings.pictureURL}
                    alt="avatar"
                    className="h-10 w-10 rounded-3xl"
                  />
                  <VisuallyHidden>
                    {isDropdownOpen
                      ? "Close dropdown menu"
                      : "Open dropdown menu"}
                  </VisuallyHidden>
                </button>
              </Dropdown>
            </li>
          </ul>
        </nav>
      </section>

      <Link
        to="/game"
        className="fixed bottom-24 right-3 z-[997] flex h-14 w-14 items-center justify-center rounded-full bg-primary lg:hidden"
      >
        <ControllerIcon edit="w-8" />
        <VisuallyHidden>Play now</VisuallyHidden>
      </Link>
    </>
  );
}
