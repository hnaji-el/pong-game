import React from "react";

import { RiArrowUpSLine as ArrowUpIcon } from "react-icons/ri";
import { RiArrowDownSLine as ArrowDownIcon } from "react-icons/ri";
import VisuallyHidden from "../../VisuallyHidden";

interface PropsType {
  isOpen: boolean;
  toggleIsOpen: () => void;
  imgURL: string;
  title: string;
}

function SettingsButton({ isOpen, toggleIsOpen, imgURL, title }: PropsType) {
  return (
    <button className="flex items-center gap-[8px]" onClick={toggleIsOpen}>
      <img
        alt="avatar"
        src={imgURL}
        className="h-[40px] w-[40px] rounded-full"
      />
      <span className="inline-block max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </span>
      <span
        className="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-shape text-secondaryText"
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

export default SettingsButton;
