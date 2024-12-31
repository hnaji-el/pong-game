import React from "react";

import { Link } from "react-router-dom";

import {
  HomeIcon,
  MessagesIcon,
  UserIcon,
  SearchIcon,
  ControllerIcon,
} from "../../components/Icons";
import { ActiveProfile } from "../Profile/Profile";

import { StateMssages } from "./Chat";
import { ActiveHome } from "../Home/Home";

interface TypeProps {
  isSearchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  isMobileSettingsModalOpen: boolean;
  openMobileSettingsModal: () => void;
  closeMobileSettingsModal: () => void;
}

function FooterBar({
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
    <footer
      className={`${messages.click ? "hidden" : ""} relative z-10 flex flex-col items-end gap-[10px] px-[12px] pt-[12px] lg:hidden`}
    >
      <Link
        to="/game"
        className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-primary"
      >
        <ControllerIcon edit="w-8" />
      </Link>
      <div className={`w-full ${!isSearchModalOpen ? "bg-body" : ""}`}>
        <nav className="rounded-lg bg-sideBackground p-[8px] shadow-lg">
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
                to="/chat"
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
      </div>
    </footer>
  );
}

export default FooterBar;
