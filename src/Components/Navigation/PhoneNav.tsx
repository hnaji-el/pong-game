import React, { useContext } from "react";
import {
  HomeIcon,
  MessagesIcon,
  UserIcon,
  SearchIcon,
  ControllerIcon,
} from "../Icons";
import { Link } from "react-router-dom";
import userPicture from "../../assets/user.jpg";
import { ActiveHome } from "../Routes/Home";
import { ActiveMessages } from "../Routes/Messages";
import { ActiveProfile } from "../Routes/Profile";
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
  const messages = useContext(ActiveMessages);
  const profile = useContext(ActiveProfile);

  return (
    <>
      <section
        className={`fixed bottom-0 w-full px-3 pb-3 lg:hidden ${
          !openSearch ? "bg-body" : ""
        } z-[999] flex-col`}
      >
        <nav className="bg-sideBackground shadow-lg p-2 px-3 rounded-lg">
          <ul className="flex justify-between items-center">
            <li>
              <Link
                to="/"
                className="flex flex-col justify-center items-center gap-1.5"
                onClick={() => {
                  setOpenSearch(false);
                  setOpenSettings(false);
                  document.body.style.overflow = "auto";
                }}
              >
                <HomeIcon
                  edit={`w-6 h-6 ${
                    home && !openSearch && !openSettings
                      ? "fill-primary"
                      : "fill-secondaryText"
                  }`}
                />
                <span
                  className={`text-xs ${
                    home && !openSearch && !openSettings
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
                to="/Messages"
                className="flex flex-col justify-center items-center gap-1.5"
                onClick={() => {
                  setOpenSearch(false);
                  setOpenSettings(false);
                  document.body.style.overflow = "auto";
                }}
              >
                <MessagesIcon
                  edit={`w-6 h-6 ${
                    messages && !openSearch && !openSettings
                      ? "fill-primary"
                      : "fill-secondaryText"
                  }`}
                />
                <span
                  className={`text-xs ${
                    messages && !openSearch && !openSettings
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
                to="/Profile"
                className="flex flex-col justify-center items-center gap-1.5"
                onClick={() => {
                  setOpenSearch(false);
                  setOpenSettings(false);
                  document.body.style.overflow = "auto";
                }}
              >
                <UserIcon
                  edit={`w-6 h-6 ${
                    profile && !openSearch && !openSettings
                      ? "fill-primary"
                      : "fill-secondaryText"
                  }`}
                />
                <span
                  className={`text-xs ${
                    profile && !openSearch && !openSettings
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
            <li>
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
                  src={userPicture}
                  alt="User profile"
                />
              </button>
            </li>
          </ul>
        </nav>
        <ListFriendOnline />
      </section>
      <button className="fixed bg-primary bottom-24 right-3 flex justify-center items-center  w-14 h-14 rounded-full lg:hidden z-[999]">
        <ControllerIcon edit="w-8" />
      </button>
    </>
  );
}
