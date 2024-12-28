import React from "react";

import { Link } from "react-router-dom";

import {
  HomeIcon,
  MessagesIcon,
  UserIcon,
  SearchIcon,
  ControllerIcon,
} from "../Icons";
import { ActiveProfile } from "../../pages/Profile/Profile";
import ListFriendOnline from "../ListFriendOnline";

import { StateMssages } from "../../pages/Chat/Chat";
import { ActiveHome } from "../../pages/Home/Home";

interface TypeProps {
  isSearchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  isMobileSettingsModalOpen: boolean;
  openMobileSettingsModal: () => void;
  closeMobileSettingsModal: () => void;
}

function BottomBarChat({
  isSearchModalOpen,
  openSearchModal,
  closeSearchModal,
  isMobileSettingsModalOpen,
  openMobileSettingsModal,
  closeMobileSettingsModal,
}: TypeProps) {
  const home = React.useContext(ActiveHome);
  const messages = React.useContext(StateMssages);
  const profile = React.useContext(ActiveProfile);

  return (
    <>
      <section
        className={`fixed bottom-0 z-[999] w-full flex-col px-3 pb-3 lg:hidden ${
          !isSearchModalOpen ? "bg-body" : ""
        }`}
      >
        <nav className="rounded-lg bg-sideBackground p-2 px-3 shadow-lg">
          <ul className="flex items-center justify-between">
            <li>
              <Link
                to="/home"
                className="flex flex-col items-center justify-center gap-1.5"
                onClick={() => {
                  closeSearchModal();
                  closeMobileSettingsModal();
                  document.body.style.overflow = "auto";
                }}
              >
                <HomeIcon
                  edit={`w-6 h-6 ${
                    home.value &&
                    !isSearchModalOpen &&
                    !isMobileSettingsModalOpen
                      ? "fill-primary"
                      : "fill-secondaryText"
                  }`}
                />
                <span
                  className={`text-xs ${
                    home.value &&
                    !isSearchModalOpen &&
                    !isMobileSettingsModalOpen
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
                  closeSearchModal();
                  closeMobileSettingsModal();
                  document.body.style.overflow = "auto";
                }}
              >
                <MessagesIcon
                  edit={`w-6 h-6 ${
                    messages.active &&
                    !isSearchModalOpen &&
                    !isMobileSettingsModalOpen
                      ? "fill-primary"
                      : "fill-secondaryText"
                  }`}
                />
                <span
                  className={`text-xs ${
                    messages.active &&
                    !isSearchModalOpen &&
                    !isMobileSettingsModalOpen
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
                  closeSearchModal();
                  closeMobileSettingsModal();
                  document.body.style.overflow = "auto";
                }}
              >
                <UserIcon
                  edit={`w-6 h-6 ${
                    profile.value &&
                    !isSearchModalOpen &&
                    !isMobileSettingsModalOpen
                      ? "fill-primary"
                      : "fill-secondaryText"
                  }`}
                />
                <span
                  className={`text-xs ${
                    profile.value &&
                    !isSearchModalOpen &&
                    !isMobileSettingsModalOpen
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
                  openSearchModal();
                }}
              >
                <SearchIcon
                  edit={`w-5 h-6 ${
                    isSearchModalOpen ? "fill-primary" : "fill-secondaryText"
                  }`}
                />
                <span
                  className={`text-xs ${
                    isSearchModalOpen ? "text-primary" : "text-secondaryText"
                  }`}
                >
                  Search
                </span>
              </button>
            </li>
            <li>
              <button
                className={`flex flex-col items-center justify-center gap-1.5 ${
                  isMobileSettingsModalOpen
                    ? "rounded-full border-[2px] border-primary"
                    : ""
                }`}
                onClick={() => {
                  openMobileSettingsModal();
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

export default BottomBarChat;
