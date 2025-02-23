import React from "react";

import { Link } from "react-router-dom";

import {
  HomeIcon,
  MessagesIcon,
  UserIcon,
  SearchIcon,
  ControllerIcon,
} from "../../components/Icons";
import useToggle from "../../hooks/use-toggle";
import VisuallyHidden from "../../components/VisuallyHidden";
import SearchModal from "../../components/modals/SearchModal";
import SearchInput from "../../components/SearchInput";

interface TypeProps {
  click: boolean;
  loggedUserAvatar: string;
  isMobileSettingsModalOpen: boolean;
  toggleIsMobileSettingsModalOpen: () => void;
}

function Footer({
  click,
  loggedUserAvatar,
  isMobileSettingsModalOpen,
  toggleIsMobileSettingsModalOpen,
}: TypeProps) {
  const [isSearchModalOpen, toggleIsSearchModalOpen] = useToggle(false);

  return (
    <footer
      className={`${click ? "hidden" : ""} relative z-10 flex flex-col items-end gap-[10px] px-[12px] pt-[12px] lg:hidden`}
    >
      {isSearchModalOpen && (
        <SearchModal closeModal={toggleIsSearchModalOpen}>
          <SearchInput modal={true} />
        </SearchModal>
      )}

      <Link
        to="/game"
        className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-primary"
      >
        <ControllerIcon edit="w-8" />
        <VisuallyHidden>Play now</VisuallyHidden>
      </Link>

      <div className={`w-full ${!isSearchModalOpen ? "bg-body" : ""}`}>
        <nav className="rounded-lg bg-sideBackground p-[8px] shadow-lg">
          <ul className="flex items-center justify-between">
            <li>
              <Link
                to="/home"
                className="flex flex-col items-center justify-center gap-1.5"
              >
                <HomeIcon edit="w-6 h-6 fill-secondaryText" />
                <span className="text-xs text-secondaryText">Home</span>
              </Link>
            </li>

            <li>
              <Link
                to="/chat"
                className="flex flex-col items-center justify-center gap-1.5"
              >
                <MessagesIcon
                  edit={`w-6 h-6 ${
                    !isSearchModalOpen && !isMobileSettingsModalOpen
                      ? "fill-primary"
                      : "fill-secondaryText"
                  }`}
                />
                <span
                  className={`text-xs ${
                    !isSearchModalOpen && !isMobileSettingsModalOpen
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
              >
                <UserIcon edit="w-6 h-6 fill-secondaryText" />
                <span className="text-xs text-secondaryText">Profile</span>
              </Link>
            </li>

            <li>
              <button
                className="flex flex-col items-center justify-center gap-1.5"
                onClick={toggleIsSearchModalOpen}
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
                onClick={toggleIsMobileSettingsModalOpen}
              >
                <img
                  src={loggedUserAvatar}
                  alt="avatar"
                  className="h-10 w-10 rounded-3xl"
                />
                <VisuallyHidden>Open settings popup</VisuallyHidden>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
