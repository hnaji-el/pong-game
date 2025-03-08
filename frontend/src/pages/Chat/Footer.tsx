import React from "react";

import { Link, useNavigate } from "react-router-dom";

import useToggle from "../../hooks/use-toggle";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import { LuLogOut as LogoutIcon } from "react-icons/lu";
import VisuallyHidden from "../../components/VisuallyHidden";
import SearchModal from "../../components/modals/SearchModal";
import SearchInput from "../../components/SearchInput";
import Dropdown from "../../components/Dropdown/Dropdown";
import { logout } from "../../api/API";
import Modal from "../../components/Modal/Modal";
import SettingsModal from "../../components/modals/SettingsModal";
import { UserType } from "../../api/types";
import {
  HomeIcon,
  MessagesIcon,
  UserIcon,
  SearchIcon,
  ControllerIcon,
} from "../../components/Icons";

interface PropsType {
  loggedUserData: UserType;
  setLoggedUserData: React.Dispatch<React.SetStateAction<UserType>>;
}

function Footer({ loggedUserData, setLoggedUserData }: PropsType) {
  const [isDropdownOpen, toggleIsDropdownOpen] = useToggle(false);
  const [isSettingsModalOpen, toggleIsSettingsModalOpen] = useToggle(false);
  const [isSearchModalOpen, toggleIsSearchModalOpen] = useToggle(false);

  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <footer className="relative z-10 flex flex-col items-end gap-[10px] px-[12px] pt-[12px] lg:hidden">
      {isSettingsModalOpen && (
        <Modal title="settings" handleDismiss={toggleIsSettingsModalOpen}>
          <SettingsModal
            loggedUserData={loggedUserData}
            setLoggedUserData={setLoggedUserData}
            handleDismiss={toggleIsSettingsModalOpen}
          />
        </Modal>
      )}

      {isSearchModalOpen && (
        <SearchModal closeModal={toggleIsSearchModalOpen}>
          <SearchInput closeModal={toggleIsSearchModalOpen} modal={true} />
        </SearchModal>
      )}

      <Link
        to="/game"
        className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-primary"
      >
        <ControllerIcon edit="w-8" />
        <VisuallyHidden>Play now</VisuallyHidden>
      </Link>

      <nav className="w-full rounded-lg bg-sideBackground p-[8px] shadow-lg">
        <ul className="flex items-center justify-between">
          <li>
            <Link
              to="/home"
              className="flex flex-col items-center justify-center gap-1.5"
            >
              <HomeIcon edit="w-6 h-6 fill-secondaryText" />
              <span className="text-xs capitalize text-secondaryText">
                home
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/chat"
              className="flex flex-col items-center justify-center gap-1.5"
            >
              <MessagesIcon edit="w-6 h-6 fill-primary" />
              <span className="text-xs capitalize text-primary">messages</span>
            </Link>
          </li>

          <li>
            <Link
              to="/profile"
              className="flex flex-col items-center justify-center gap-1.5"
            >
              <UserIcon edit="w-6 h-6 fill-secondaryText" />
              <span className="text-xs capitalize text-secondaryText">
                profile
              </span>
            </Link>
          </li>

          <li>
            <button
              className="flex flex-col items-center justify-center gap-1.5"
              onClick={toggleIsSearchModalOpen}
            >
              <SearchIcon edit="w-5 h-6 fill-secondaryText" />
              <span className="text-xs capitalize text-secondaryText">
                search
              </span>
            </button>
          </li>

          <li>
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
                  src={loggedUserData.pictureURL}
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
    </footer>
  );
}

export default Footer;
