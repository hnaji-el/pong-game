import React from "react";

import { NavLink } from "react-router-dom";

import { LockIcon, PointsIcon } from "./Icons";
import VisuallyHidden from "./VisuallyHidden";
import Dropdown from "./Dropdown/Dropdown";
import useToggle from "../hooks/use-toggle";

interface PropsType {
  id: string;
  title: string;
  isLabeled: boolean;
  isJoined: boolean;
  isOwner: boolean;
  isProtected: boolean;
  handleCardClick: () => void;
  handleDeleteClick: () => void;
  handleLeaveClick: () => void;
}

function ChannelCard({
  id,
  title,
  isLabeled,
  isJoined,
  isOwner,
  isProtected,
  handleCardClick,
  handleDeleteClick,
  handleLeaveClick,
}: PropsType) {
  const [isDropdownOpen, toggleIsDropdownOpen] = useToggle(false);

  const options = [];
  if (isOwner) options.push({ label: "delete" });
  if (!isOwner) options.push({ label: "leave" });

  function handleSelect(option: string) {
    if (option === "delete") handleDeleteClick();
    if (option === "leave") handleLeaveClick();
  }

  return (
    <NavLink
      to={`/chat/${id}?type=channel`}
      end
      onClick={handleCardClick}
      className={({ isActive }) =>
        `flex border-b-[1px] border-b-backgroundHover px-3 hover:bg-backgroundHover lg:px-2 ${
          isActive ? "bg-backgroundHover" : ""
        }`
      }
    >
      <div className="flex flex-1 items-start justify-between py-4">
        <div className="flex items-center gap-2">
          <span className="max-w-[9.6rem] overflow-hidden text-ellipsis whitespace-nowrap text-sm capitalize text-primaryText">
            {title}
          </span>
        </div>
        {isLabeled && (
          <div className="relative right-2 top-[.2rem] z-[-1] w-12 rounded-full bg-primary text-center text-[.6rem] font-light capitalize text-primaryText">
            private
          </div>
        )}
        <VisuallyHidden>Open the conversation</VisuallyHidden>
      </div>

      {isJoined && (
        <Dropdown
          className="right-0 top-[80%]"
          isOpen={isDropdownOpen}
          toggleIsOpen={toggleIsDropdownOpen}
          options={options}
          handleSelect={handleSelect}
        >
          <button
            className="flex h-full items-center justify-center rounded-full"
            onClick={toggleIsDropdownOpen}
          >
            <PointsIcon edit="w-3 h-3 fill-secondaryText" />
            <VisuallyHidden>Show more actions</VisuallyHidden>
          </button>
        </Dropdown>
      )}

      {!isJoined && isProtected && (
        <div className="flex items-center justify-center">
          <LockIcon edit="w-4 h-4 fill-secondaryText" />
          <VisuallyHidden>Locked Icon</VisuallyHidden>
        </div>
      )}
    </NavLink>
  );
}

export default ChannelCard;
