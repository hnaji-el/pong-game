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
import ListFriendOnline from "../ListFriendOnline";

interface TypeProps {
  openSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  openSettings: boolean;
  setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PhoneNav({
  openSearch,
  setOpenSearch,
  openSettings,
  setOpenSettings,
}: TypeProps) {
  const home = useContext(ActiveHome);
  const messages = useContext(StateMssages);
  const profile = useContext(ActiveProfile);

  return (
    <>
      <section
        className={`fixed bottom-0 w-full px-3 pb-3 lg:hidden ${
          !openSearch ? "bg-body" : ""
        } z-[999] flex-col`}
      >
        <nav className="rounded-lg bg-sideBackground p-2 px-3 shadow-lg">
          <ul className="flex items-center justify-between">
            <li>
              <Link
                to="/home"
                className="flex flex-col items-center justify-center gap-1.5"
                onClick={() => {
                  setOpenSearch(false);
                  setOpenSettings(false);
                  document.body.style.overflow = "auto";
                }}
              >
                <HomeIcon
                  edit={`w-6 h-6 ${
                    home.value && !openSearch && !openSettings
                      ? "fill-primary"
                      : "fill-secondaryText"
                  }`}
                />
                <span
                  className={`text-xs ${
                    home.value && !openSearch && !openSettings
                      ? "text-primary"
                      : "text-secondaryText"
                  }`}
                >
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/messages"
                className="flex flex-col items-center justify-center gap-1.5"
                onClick={() => {
                  setOpenSearch(false);
                  setOpenSettings(false);
                  document.body.style.overflow = "auto";
                }}
              >
                <MessagesIcon
                  edit={`w-6 h-6 ${
                    messages.active && !openSearch && !openSettings
                      ? "fill-primary"
                      : "fill-secondaryText"
                  }`}
                />
                <span
                  className={`text-xs ${
                    messages.active && !openSearch && !openSettings
                      ? "text-primary"
                      : "text-secondaryText"
                  }`}
                >
                  Messages
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex flex-col items-center justify-center gap-1.5"
                onClick={() => {
                  setOpenSearch(false);
                  setOpenSettings(false);
                  document.body.style.overflow = "auto";
                }}
              >
                <UserIcon
                  edit={`w-6 h-6 ${
                    profile.value && !openSearch && !openSettings
                      ? "fill-primary"
                      : "fill-secondaryText"
                  }`}
                />
                <span
                  className={`text-xs ${
                    profile.value && !openSearch && !openSettings
                      ? "text-primary"
                      : "text-secondaryText"
                  }`}
                >
                  Profile
                </span>
              </Link>
            </li>
            <li>
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
            <li>
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
                  src={messages.settings.pictureURL}
                  alt="User profile"
                />
              </button>
            </li>
          </ul>
        </nav>
        <ListFriendOnline />
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
