import React, { useContext } from "react";
import {
  HomeIcon,
  MessagesIcon,
  UserIcon,
  SearchIcon,
  ControllerIcon,
} from "../Icons";
import { Link } from "react-router-dom";
import { ActiveHome } from "../routes/Home";
import { StateMssages } from "../routes/Messages";
import { ActiveProfile } from "../routes/Profile";
import { ActiveProfileUser } from "../routes/ProfileUser";
import { GameContext } from "../routes/Game";
import logo from "../../assets/logo.svg";
import ListFriendOnline from "../ListFriendOnline";

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
        } 2xl:left-auto z-[999] lg:flex flex-col lg:w-60 lg:px-0 lg:py-7 lg:gap-12 lg:bg-sideBackground lg:top-0 lg:left-0`}
      >
        <div className=" hidden lg:flex items-center justify-center">
          <Link
            to="/Home"
            onClick={() => {
              setOpenSearch(false);
              setOpenSettings(false);
              document.body.style.overflow = "auto";
            }}
          >
            <img src={logo} alt="Pong logo" className="w-48 lg:w-44" />
          </Link>
        </div>
        <nav className="bg-sideBackground shadow-lg p-2 px-3 rounded-lg lg:rounded-none lg:shadow-none lg:bg-transparent lg:p-0 lg:px-0">
          <ul className="flex justify-between items-center lg:items-start  lg:flex-col lg:gap-12">
            <li className="lg:w-full">
              <Link
                to="/Home"
                className={`flex flex-col justify-center items-center gap-1.5 lg:justify-start lg:flex-row lg:gap-4 lg:p-3 lg:pl-8 lg:hover:bg-shape ${
                  home.value
                    ? "lg:bg-shape lg:border-l-[6px] lg:border-primary"
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
                  className={`text-xs lg:text-primaryText lg:text-sm lg:relative lg:top-[.1rem] ${
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
                to="/Messages"
                className={`flex flex-col justify-center items-center gap-1.5 lg:justify-start lg:flex-row lg:gap-4 lg:p-3 lg:pl-8 lg:hover:bg-shape ${
                  messages.active
                    ? "lg:bg-shape lg:border-l-[6px] lg:border-primary"
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
                  className={`text-xs lg:text-primaryText lg:text-sm ${
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
                to="/Profile"
                className={`flex flex-col justify-center items-center gap-1.5 lg:justify-start lg:flex-row lg:gap-4 lg:p-3 lg:pl-8 lg:hover:bg-shape ${
                  profile.value
                    ? "lg:bg-shape lg:border-l-[6px] lg:border-primary"
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
                  className={`text-xs lg:text-primaryText lg:text-sm lg:relative lg:top-[.1rem] ${
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
                className="flex flex-col justify-center items-center gap-1.5"
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
                className={`flex flex-col justify-center items-center gap-1.5 ${
                  openSettings ? "border-[2px] border-primary rounded-full" : ""
                }`}
                onClick={() => {
                  setOpenSettings(true);
                }}
              >
                <img
                  className="w-10 h-10 rounded-3xl"
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
        className="fixed bg-primary bottom-24 right-3 flex justify-center items-center  w-14 h-14 rounded-full lg:hidden z-[999]"
      >
        <ControllerIcon edit="w-8" />
      </Link>
    </>
  );
}
