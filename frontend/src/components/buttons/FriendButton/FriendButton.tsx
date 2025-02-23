import React from "react";

import { RiArrowUpSLine as ArrowUpIcon } from "react-icons/ri";
import { RiArrowDownSLine as ArrowDownIcon } from "react-icons/ri";
import { LuUserCheck } from "react-icons/lu";
import VisuallyHidden from "../../VisuallyHidden";

interface PropsType {
  isOpen: boolean;
  toggleIsOpen: () => void;
  title: string;
}

function FriendButton({ isOpen, toggleIsOpen, title }: PropsType) {
  return (
    <button
      className="flex items-center gap-[12px] rounded-md bg-shape px-[12px] py-[8px] text-sm text-primaryText"
      onClick={toggleIsOpen}
    >
      <LuUserCheck size={20} />
      <span>{title}</span>
      <span
        className="rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          e.currentTarget.closest("button")?.click(); // Manually trigger button click
        }}
      >
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </span>

      <VisuallyHidden>
        {isOpen ? "Close dropdown menu" : "Open dropdown menu"}
      </VisuallyHidden>
    </button>
  );
}

export default FriendButton;
