import React, { useContext } from "react";
import {
  HomeIcon,
  MessagesIcon,
  UserIcon,
  SearchIcon,
  ControllerIcon,
} from "../Icons";
import { Link } from "react-router-dom";
import { ActiveHome } from "../../pages/Home/Home";
import { StateMssages } from "../../pages/Messages/Messages";
import { ActiveProfile } from "../../pages/Profile/Profile";
import { ActiveProfileUser } from "../../pages/ProfileUser/ProfileUser";
import { GameContext } from "../../pages/Game/Game";
import logo from "../../assets/logo.svg";

interface TypeProps {
  openSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  openSettings: boolean;
  setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideBar({
  openSearch,
  setOpenSearch,
  openSettings,
  setOpenSettings,
}: TypeProps) {
  const home = useContext(ActiveHome);
  const messages = useContext(StateMssages);
  const profile = useContext(ActiveProfile);

  let dataUserLogged = useContext(ActiveHome);
  let dataUserLoggedProfile = useContext(ActiveProfile);
  let dataUserLoggedProfileUser = useContext(ActiveProfileUser);
  let game = useContext(GameContext);

  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedProfile;
  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedProfileUser;
  if (!dataUserLogged.value) dataUserLogged = game;

  return (
    <>
      <section
        className={`fixed bottom-0 w-full px-3 pb-3 ${
          !openSearch ? "bg-body" : ""
        } z-[999] flex-col lg:left-0 lg:top-0 lg:flex lg:w-60 lg:gap-12 lg:bg-sideBackground lg:px-0 lg:py-7 2xl:left-auto`}
      >
        <div className="hidden items-center justify-center lg:flex">
          <Link
            to="/home"
            onClick={() => {
              setOpenSearch(false);
              setOpenSettings(false);
              document.body.style.overflow = "auto";
            }}
          >
            <img src={logo} alt="Pong logo" className="w-48 lg:w-44" />
          </Link>
        </div>
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
                onClick={() => {
                  setOpenSearch(false);
                  setOpenSettings(false);
                  document.body.style.overflow = "auto";
                }}
              >
                <HomeIcon
                  edit={`w-6 h-6  lg:fill-primary lg:w-7 lg:h-7  ${
                    home.value && !openSearch && !openSettings
                      ? "fill-primary"
                      : "fill-secondaryText"
                  }`}
                />
                <span
                  className={`text-xs lg:relative lg:top-[.1rem] lg:text-sm lg:text-primaryText ${
                    home.value && !openSearch && !openSettings
                      ? "text-primary"
                      : "text-secondaryText"
                  }`}
                >
                  Home
                </span>
              </Link>
            </li>
            <li className="lg:w-full">
              <Link
                to="/messages"
                className={`flex flex-col items-center justify-center gap-1.5 lg:flex-row lg:justify-start lg:gap-4 lg:p-3 lg:pl-8 lg:hover:bg-shape ${
                  messages.active
                    ? "lg:border-l-[6px] lg:border-primary lg:bg-shape"
                    : ""
                }`}
                onClick={() => {
                  setOpenSearch(false);
                  setOpenSettings(false);
                  document.body.style.overflow = "auto";
                }}
              >
                <MessagesIcon
                  edit={`w-6 h-6  lg:fill-primary lg:w-7 lg:h-7  ${
                    messages.active && !openSearch && !openSettings
                      ? "fill-primary"
                      : "fill-secondaryText"
                  }`}
                />
                <span
                  className={`text-xs lg:text-sm lg:text-primaryText ${
                    messages.active && !openSearch && !openSettings
                      ? "text-primary"
                      : "text-secondaryText"
                  }`}
                >
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
                onClick={() => {
                  setOpenSearch(false);
                  setOpenSettings(false);
                  document.body.style.overflow = "auto";
                }}
              >
                <UserIcon
                  edit={`w-6 h-6  lg:fill-primary lg:w-7 lg:h-7 ${
                    profile.value && !openSearch && !openSettings
                      ? "fill-primary"
                      : "fill-secondaryText"
                  }`}
                />
                <span
                  className={`text-xs lg:relative lg:top-[.1rem] lg:text-sm lg:text-primaryText ${
                    profile.value && !openSearch && !openSettings
                      ? "text-primary"
                      : "text-secondaryText"
                  }`}
                >
                  Profile
                </span>
              </Link>
            </li>
            <li className="lg:hidden">
              <button
                className="flex flex-col items-center justify-center gap-1.5"
                onClick={() => {
                  setOpenSearch(true);
                }}
              >
                <SearchIcon
                  edit={`w-5 h-6 ${
                    openSearch ? "fill-primary" : "fill-secondaryText"
                  }`}
                />
                <span
                  className={`text-xs ${
                    openSearch ? "text-primary" : "text-secondaryText"
                  }`}
                >
                  Search
                </span>
              </button>
            </li>
            <li className="lg:hidden">
              <button
                className={`flex flex-col items-center justify-center gap-1.5 ${
                  openSettings ? "rounded-full border-[2px] border-primary" : ""
                }`}
                onClick={() => {
                  setOpenSettings(true);
                }}
              >
                <img
                  className="h-10 w-10 rounded-3xl"
                  src={dataUserLogged.settings.pictureURL}
                  alt="User profile"
                />
              </button>
            </li>
          </ul>
        </nav>
      </section>
      <Link
        to="/game"
        className="fixed bottom-24 right-3 z-[999] flex h-14 w-14 items-center justify-center rounded-full bg-primary lg:hidden"
      >
        <ControllerIcon edit="w-8" />
      </Link>
    </>
  );
}
