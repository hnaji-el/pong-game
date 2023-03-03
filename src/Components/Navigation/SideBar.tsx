import React, { useContext, useState } from "react";
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
import logo from "../../assets/logo.svg";
import ListFriendOnline from "../ListFriendOnline";

interface TypeProps {
  openSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideBar({ openSearch,setOpenSearch }: TypeProps) {
  const home = useContext(ActiveHome);
  const messages = useContext(ActiveMessages);
  const profile = useContext(ActiveProfile);

  return (
    <>
      <section className="fixed bottom-0 w-full px-3 pb-3 bg-body 2xl:left-auto z-[999] lg:flex flex-col lg:w-60 lg:px-0 lg:py-7 lg:gap-12 lg:bg-sideBackground lg:top-0 lg:left-0">
        <Link to="/" className=" hidden lg:flex items-center justify-center">
          <img src={logo} alt="Pong logo" className="w-44" />
        </Link>
        <nav className="bg-sideBackground shadow-lg p-2 px-3 rounded-lg lg:rounded-none lg:shadow-none lg:bg-transparent lg:p-0 lg:px-0">
          <ul className="flex justify-between items-center lg:items-start  lg:flex-col lg:gap-12">
            <li className="lg:w-full">
              <Link
                to="/"
                className={`flex flex-col justify-center items-center gap-1.5 lg:justify-start lg:flex-row lg:gap-4 lg:p-3 lg:pl-8 lg:hover:bg-shape ${
                  home ? "lg:bg-shape lg:border-l-[6px] lg:border-primary" : ""
                }`}
                onClick={() => {
                  setOpenSearch(false);
                  document.body.style.overflow = "auto";
                }}
              >
                <HomeIcon
                  edit={`w-6 h-6  lg:fill-primary lg:w-7 lg:h-7  ${
                    home && !openSearch ? "fill-primary" : "fill-secondaryText"
                  }`}
                />
                <span
                  className={`text-xs lg:text-primaryText lg:text-sm ${
                    home && !openSearch ? "text-primary" : "text-secondaryText"
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
                  messages
                    ? "lg:bg-shape lg:border-l-[6px] lg:border-primary"
                    : ""
                }`}
                onClick={() => {
                  setOpenSearch(false);
                  document.body.style.overflow = "auto";
                }}
              >
                <MessagesIcon
                  edit={`w-6 h-6  lg:fill-primary lg:w-7 lg:h-7  ${
                    messages && !openSearch
                      ? "fill-primary"
                      : "fill-secondaryText"
                  }`}
                />
                <span
                  className={`text-xs lg:text-primaryText lg:text-sm ${
                    messages && !openSearch
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
                  profile
                    ? "lg:bg-shape lg:border-l-[6px] lg:border-primary"
                    : ""
                }`}
                onClick={() => {
                  setOpenSearch(false);
                  document.body.style.overflow = "auto";
                }}
              >
                <UserIcon
                  edit={`w-6 h-6  lg:fill-primary lg:w-7 lg:h-7 ${
                    profile && !openSearch
                      ? "fill-primary"
                      : "fill-secondaryText"
                  }`}
                />
                <span
                  className={`text-xs lg:text-primaryText lg:text-sm ${
                    profile && !openSearch
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
              <Link
                to="/"
                className="flex flex-col justify-center items-center gap-1.5"
              >
                <img
                  className="w-10 h-10 rounded-3xl"
                  src={userPicture}
                  alt="User profile"
                />
              </Link>
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
