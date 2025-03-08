import React from "react";

import { PointsIcon } from "./Icons";
import VisuallyHidden from "./VisuallyHidden";
import useToggle from "../hooks/use-toggle";
import Dropdown from "./Dropdown/Dropdown";

interface PropsType {
  avatar: string;
  title: string;
  isHovered: boolean;
  handleCardClick: () => void;
  handleInviteToPlayClick: () => void;
  handleBlockClick: () => void;
}

function DmCard({
  avatar,
  title,
  isHovered,
  handleCardClick,
  handleInviteToPlayClick,
  handleBlockClick,
}: PropsType) {
  const [isDropdownOpen, toggleIsDropdownOpen] = useToggle(false);

  const options = [{ label: "invite to play" }, { label: "block" }];

  function handleSelect(option: string) {
    if (option === "invite to play") handleInviteToPlayClick();
    if (option === "block") handleBlockClick();
  }

  return (
    <div
      className={`flex border-b-[1px] border-b-backgroundHover px-3 last:border-b-0 hover:bg-backgroundHover lg:px-2 ${
        isHovered ? "bg-backgroundHover" : ""
      }`}
    >
      <button
        className="flex flex-1 justify-between py-4"
        onClick={handleCardClick}
      >
        <div className="flex items-center gap-2">
          <img src={avatar} alt="avatar" className="h-10 w-10 rounded-full" />
          <div className="flex items-center gap-1.5">
            <span className="max-w-[9.6rem] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-primaryText">
              {title}
            </span>
          </div>
        </div>
        <VisuallyHidden>Open the conversation</VisuallyHidden>
      </button>

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
    </div>
  );
}

export default DmCard;
